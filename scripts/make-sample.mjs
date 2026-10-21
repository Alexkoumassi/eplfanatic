#!/usr/bin/env node
// Builds data/fpl.json from made-up clubs and players, so the pages can be
// previewed without the live feed. The live updater overwrites it on its first run.
// Run with:  node scripts/make-sample.mjs

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { transform } from './fetch-fpl.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let seed = 20261021;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const pick = a => a[Math.floor(rnd() * a.length)];

const clubs = [
  ['Ashford Rovers', 'ASR'], ['Bramley Town', 'BRT'], ['Carrow Athletic', 'CAR'], ['Dunmore City', 'DUN'],
  ['Elmfield United', 'ELM'], ['Fenwick Albion', 'FEN'], ['Glenside FC', 'GLE'], ['Harrowgate County', 'HAR'],
  ['Ironbridge Wanderers', 'IRW'], ['Kingsmead', 'KIN'], ['Larkhill Rangers', 'LAR'], ['Marshgate Villa', 'MAR'],
  ['Northbank City', 'NOR'], ['Oakhurst Forest', 'OAK'], ['Penhale United', 'PEN'], ['Queensway Athletic', 'QUE'],
  ['Redcastle Town', 'RED'], ['Saltmarsh FC', 'SAL'], ['Thornbury Albion', 'THO'], ['Wexley Rovers', 'WEX'],
];
const surnames = ['Adeyemi', 'Barros', 'Caldwell', 'Dossou', 'Ekwueme', 'Ferreira', 'Galloway', 'Haddad', 'Iversen',
  'Jovanić', 'Kariuki', 'Lindqvist', 'Mensah', 'Novak', 'Okafor', 'Pellegrini', 'Quaresma', 'Rasmussen', 'Sato',
  'Thorne', 'Uchenna', 'Vidal', 'Whitlock', 'Yilmaz', 'Zielinski', 'Abara', 'Bekele', 'Castell', 'Dufresne',
  'Esposito', 'Fofana', 'Grieve', 'Holm', 'Ibe', 'Kessler', 'Lomax', 'Moreau', 'Nwosu', 'Osei', 'Pryce',
  'Ruiz', 'Sandoval', 'Tavares', 'Varga', 'Waddell', 'Achterberg', 'Brennan', 'Coutinho', 'Darko', 'Ellery'];
const injuries = ['Hamstring injury', 'Knee injury', 'Ankle injury', 'Groin strain', 'Calf injury', 'Illness', 'Back injury', 'Thigh injury'];

const teams = clubs.map(([name, short], i) => ({ id: i + 1, name, short_name: short, strength: 1 + Math.floor(rnd() * 5) }));

const now = new Date();
const deadline = new Date(now);
deadline.setUTCDate(now.getUTCDate() + ((6 - now.getUTCDay() + 7) % 7 || 7));
deadline.setUTCHours(10, 0, 0, 0);
const events = Array.from({ length: 38 }, (_, i) => ({
  id: i + 1, name: `Gameweek ${i + 1}`, is_current: i + 1 === 8, is_next: i + 1 === 9,
  deadline_time: (i + 1 === 9 ? deadline : new Date(deadline.getTime() + (i - 8) * 7 * 864e5)).toISOString(),
}));

// Round-robin fixtures for gameweeks 9-14, with one blank and one double gameweek
const fixtures = [];
const ids = teams.map(t => t.id);
for (let gw = 9; gw <= 14; gw++) {
  const order = [...ids].sort(() => rnd() - 0.5);
  for (let i = 0; i < order.length; i += 2) {
    const [h, a] = [order[i], order[i + 1]];
    let event = gw;
    if (gw === 11 && i === 0) event = 12; // ASR-style blank in 11, double in 12
    const diff = id => Math.min(5, Math.max(2, teams[id - 1].strength));
    fixtures.push({ event, team_h: h, team_a: a, team_h_difficulty: diff(a), team_a_difficulty: diff(h), finished: false });
  }
}

const statuses = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'd', 'i', 'a', 'a', 's', 'a', 'u'];
let id = 1;
const used = new Set();
const elements = [];
for (const t of teams) {
  for (const [type, count] of [[1, 2], [2, 6], [3, 6], [4, 3]]) {
    for (let k = 0; k < count; k++) {
      let name;
      do { name = pick(surnames) + (rnd() < 0.25 ? ` ${String.fromCharCode(65 + Math.floor(rnd() * 26))}.` : ''); } while (used.has(name));
      used.add(name);
      const star = rnd() < 0.12;
      const base = { 1: 45, 2: 45, 3: 55, 4: 60 }[type];
      const cost = base + Math.floor(rnd() * (star ? 80 : 30));
      const own = star ? 15 + rnd() * 45 : rnd() * 8;
      const status = pick(statuses);
      const chance = status === 'd' ? pick([25, 50, 75]) : status === 'a' ? null : 0;
      const form = round(rnd() * (star ? 9 : 5));
      const net = Math.round((rnd() - 0.5) * (star ? 260000 : 60000));
      elements.push({
        id: id++, web_name: name, team: t.id, element_type: type, now_cost: cost,
        cost_change_event: rnd() < 0.05 ? pick([1, -1]) : 0,
        selected_by_percent: own.toFixed(1), form: form.toFixed(1),
        ep_next: (status === 'a' ? form * 0.8 + rnd() * 2 + (star ? 2 : 0) : 0).toFixed(1),
        total_points: Math.floor(rnd() * (star ? 90 : 40)), minutes: Math.floor(rnd() * 720),
        transfers_in_event: Math.max(0, net), transfers_out_event: Math.max(0, -net),
        status, chance_of_playing_next_round: chance,
        news: status === 'a' ? '' : status === 's' ? 'Suspended until next gameweek' :
          status === 'u' ? 'Has joined another club on loan' : `${pick(injuries)} - ${chance}% chance of playing`,
        news_added: status === 'a' ? null : new Date(now.getTime() - rnd() * 6 * 864e5).toISOString(),
      });
    }
  }
}
function round(n) { return Math.round(n * 10) / 10; }

const data = transform({ teams, events, elements, total_players: 11800000 }, fixtures, now);
data.sample = true;
await mkdir(path.join(ROOT, 'data'), { recursive: true });
await writeFile(path.join(ROOT, 'data', 'fpl.json'), JSON.stringify(data));
console.log(`Sample data: ${elements.length} players, ${data.flags.length} flags, ${data.captains.length} captains.`);
