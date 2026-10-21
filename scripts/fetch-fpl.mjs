#!/usr/bin/env node
// EPL Fanatic data updater.
// Pulls the public Fantasy Premier League data, works out the numbers each
// tool page needs, and writes them to data/fpl.json.
// Runs on a schedule via .github/workflows/update-data.yml.
// Run by hand with:  node scripts/fetch-fpl.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const BASE = 'https://fantasy.premierleague.com/api';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'fpl.json');
const POS = ['', 'GKP', 'DEF', 'MID', 'FWD'];
const RUN_LENGTH = 6; // gameweeks shown in the fixture grid

async function getJSON(url) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (EPL Fanatic data updater)' } });
      if (!res.ok) throw new Error(`${url} answered ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, 3000 * attempt));
    }
  }
  throw lastErr;
}

const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

export function transform(bootstrap, fixtures, now = new Date()) {
  const teams = new Map(bootstrap.teams.map(t => [t.id, { id: t.id, name: t.name, short: t.short_name }]));
  const events = bootstrap.events || [];
  const current = events.find(e => e.is_current);
  const next = events.find(e => e.is_next) || current || events[0];
  const startGw = next ? next.id : 1;
  const totalPlayers = bootstrap.total_players || 0;

  // ---- Fixture grid: next RUN_LENGTH gameweeks for every team ----
  const gws = [];
  for (let g = startGw; g < startGw + RUN_LENGTH && g <= 38; g++) gws.push(g);
  const cells = new Map([...teams.keys()].map(id => [id, gws.map(() => [])]));
  for (const f of fixtures) {
    if (f.finished || f.event == null) continue;
    const i = gws.indexOf(f.event);
    if (i < 0) continue;
    cells.get(f.team_h)?.[i].push({ opp: teams.get(f.team_a)?.short, home: true, diff: f.team_h_difficulty });
    cells.get(f.team_a)?.[i].push({ opp: teams.get(f.team_h)?.short, home: false, diff: f.team_a_difficulty });
  }
  const fdrTeams = [...teams.values()].map(t => ({ short: t.short, name: t.name, cells: cells.get(t.id) }));

  // ---- Players ----
  const players = bootstrap.elements.map(e => {
    const team = teams.get(e.team);
    return {
      id: e.id,
      name: e.web_name,
      team: team?.short ?? '',
      teamId: e.team,
      pos: POS[e.element_type] ?? '',
      price: e.now_cost / 10,
      change: (e.cost_change_event || 0) / 10,
      own: Number(e.selected_by_percent) || 0,
      form: Number(e.form) || 0,
      ep: Number(e.ep_next) || 0,
      pts: e.total_points || 0,
      minutes: e.minutes || 0,
      net: (e.transfers_in_event || 0) - (e.transfers_out_event || 0),
      status: e.status,
      chance: e.chance_of_playing_next_round,
      news: e.news || '',
      added: e.news_added || null,
    };
  });

  const slim = p => ({ name: p.name, team: p.team, pos: p.pos, price: p.price, own: p.own, net: p.net,
    pressure: totalPlayers && p.own ? round(p.net / (totalPlayers * p.own / 100) * 100, 2) : 0 });

  const prices = {
    risers: players.filter(p => p.net > 0).sort((a, b) => b.net - a.net).slice(0, 40).map(slim),
    fallers: players.filter(p => p.net < 0).sort((a, b) => a.net - b.net).slice(0, 40).map(slim),
    changed: players.filter(p => p.change !== 0).sort((a, b) => b.change - a.change || b.own - a.own)
      .slice(0, 40).map(p => ({ name: p.name, team: p.team, pos: p.pos, price: p.price, change: p.change })),
  };

  // ---- Captain picks ----
  // Score = FPL's expected points for next gameweek, plus a little for form,
  // nudged by how hard the next fixture is (difficulty 3 = neutral).
  const captains = players
    .filter(p => p.minutes > 0 && p.ep > 0 && (p.status === 'a' || (p.chance ?? 0) >= 75))
    .map(p => {
      const opp = cells.get(p.teamId)?.[0] ?? [];
      const diffAdj = opp.reduce((s, o) => s + (3 - o.diff) * 0.4, 0);
      return { name: p.name, team: p.team, pos: p.pos, price: p.price, own: p.own, form: p.form, ep: p.ep,
        opp, score: round(p.ep + p.form * 0.25 + diffAdj, 1) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  // ---- Injury and availability flags ----
  const flags = players
    .filter(p => p.status !== 'a' && (p.own >= 0.3 || p.status === 'd'))
    .sort((a, b) => b.own - a.own)
    .slice(0, 80)
    .map(p => ({ name: p.name, team: p.team, pos: p.pos, own: p.own, price: p.price,
      status: p.status, chance: p.chance, news: p.news, added: p.added }));

  return {
    updated: now.toISOString(),
    gameweek: next ? { id: next.id, name: next.name, deadline: next.deadline_time } : null,
    totalPlayers,
    fdr: { gws, teams: fdrTeams },
    prices,
    captains,
    flags,
  };
}

async function main() {
  const [bootstrap, fixtures] = await Promise.all([
    getJSON(`${BASE}/bootstrap-static/`),
    getJSON(`${BASE}/fixtures/?future=1`),
  ]);
  const data = transform(bootstrap, fixtures);

  // Only rewrite the file when something besides the timestamp changed,
  // so the site isn't redeployed for nothing.
  try {
    const old = JSON.parse(await readFile(OUT, 'utf8'));
    const strip = o => JSON.stringify({ ...o, updated: null, sample: null });
    if (!old.sample && strip(old) === strip(data)) {
      console.log('No changes in FPL data.');
      return;
    }
  } catch { /* no previous file */ }

  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(data));
  console.log(`Wrote ${OUT} for ${data.gameweek?.name ?? 'unknown gameweek'}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch(err => { console.error(err); process.exit(1); });
}
