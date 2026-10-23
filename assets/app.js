/* EPL Fanatic tools. Reads data/fpl.json (refreshed by the scheduled updater)
   and draws whichever tool the page asks for via <body data-page="...">. */
(function () {
  'use strict';

  var STATUS = { d: 'Doubtful', i: 'Injured', s: 'Suspended', u: 'Unavailable', n: 'Not eligible' };
  var POSITIONS = ['GKP', 'DEF', 'MID', 'FWD'];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function intl(n) { return Number(n).toLocaleString('en-GB'); }
  function signed(n) { return (n > 0 ? '+' : n < 0 ? '−' : '') + intl(Math.abs(n)); }
  function money(n) { return '£' + Number(n).toFixed(1) + 'm'; }
  function pct(n) { return Number(n).toFixed(1) + '%'; }

  function loadData() {
    if (window.FPL_DATA) return Promise.resolve(window.FPL_DATA);
    return fetch('data/fpl.json', { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('The data file answered ' + r.status);
      return r.json();
    });
  }

  function ago(iso) {
    var m = Math.round((Date.now() - new Date(iso)) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + ' min ago';
    var h = Math.round(m / 60);
    if (h < 48) return h + ' hr ago';
    return Math.round(h / 24) + ' days ago';
  }
  function shortDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  }
  function deadlineText(iso) {
    var d = new Date(iso), diff = d - Date.now();
    var when = d.toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    if (diff <= 0) return when;
    var h = Math.floor(diff / 3.6e6), m = Math.floor((diff % 3.6e6) / 6e4);
    return when + ' · ' + (h >= 48 ? Math.floor(h / 24) + ' days' : h + 'h ' + m + 'm') + ' to go';
  }

  function playerCell(p) {
    return '<div class="pc"><span class="pn">' + esc(p.name) + '</span><span class="pm">' +
      esc(p.team) + ' · ' + esc(p.pos) + '</span></div>';
  }
  function oppChips(opp) {
    if (!opp || !opp.length) return '<span class="blank">No game</span>';
    return '<span class="opp">' + opp.map(function (o) {
      return '<span class="f' + o.diff + '">' + esc(o.opp) + ' (' + (o.home ? 'H' : 'A') + ')</span>';
    }).join('') + '</span>';
  }
  function posSelect(id) {
    return '<label for="' + id + '">Position</label><select id="' + id + '"><option value="">All players</option>' +
      POSITIONS.map(function (p) { return '<option value="' + p + '">' + p + '</option>'; }).join('') + '</select>';
  }

  /* ---------- Deadline band ---------- */
  function renderBand(d) {
    $$('.gw-band').forEach(function (el) {
      if (!d.gameweek) { el.innerHTML = '<span>Season data loading</span>'; return; }
      el.innerHTML = '<span><b>' + esc(d.gameweek.name) + '</b> deadline ' + esc(deadlineText(d.gameweek.deadline)) + '</span>' +
        '<span>Data updated ' + esc(ago(d.updated)) + '</span>' +
        (d.sample ? '<span class="sample-tag">Sample data</span>' : '');
    });
  }

  /* ---------- Price changes ---------- */
  function renderPrices(el, d) {
    var P = d.prices;
    el.innerHTML =
      '<div class="toolbar">' + posSelect('price-pos') + '</div>' +
      '<div class="two-col">' +
      '<section class="panel"><h2 class="up-h">Rising</h2><p class="panel-sub">Most net transfers in this gameweek. These players are the most likely to go up in price.</p><div class="tbl-wrap"><table class="tbl" id="tbl-up"></table></div></section>' +
      '<section class="panel"><h2 class="down-h">Falling</h2><p class="panel-sub">Most net transfers out. These players are the most likely to drop in price.</p><div class="tbl-wrap"><table class="tbl" id="tbl-down"></table></div></section>' +
      '</div>' +
      '<section class="panel" style="margin-top:18px"><h2>Already changed this gameweek</h2><p class="panel-sub">Price moves since the last deadline.</p><div class="chips" id="changed"></div></section>' +
      '<p class="method">How to read this: FPL changes prices overnight based on net transfers relative to how many managers own a player. A big number here means pressure, not a guaranteed change.</p>';

    function table(list, dir) {
      var max = Math.max.apply(null, list.map(function (p) { return Math.abs(p.net); }).concat(1));
      return '<thead><tr><th>Player</th><th class="r">Price</th><th class="r">Net transfers</th><th class="r">Owned</th></tr></thead><tbody>' +
        (list.length ? list.map(function (p) {
          return '<tr><td>' + playerCell(p) + '</td><td class="r">' + money(p.price) + '</td>' +
            '<td class="r"><span class="num-' + dir + '">' + signed(p.net) + '</span><div class="bar ' + dir + '"><i style="width:' +
            Math.round(Math.abs(p.net) / max * 100) + '%"></i></div></td><td class="r">' + pct(p.own) + '</td></tr>';
        }).join('') : '<tr><td colspan="4">No players match.</td></tr>') + '</tbody>';
    }
    function draw() {
      var pos = $('#price-pos', el).value;
      var f = function (l) { return l.filter(function (p) { return !pos || p.pos === pos; }).slice(0, 15); };
      $('#tbl-up', el).innerHTML = table(f(P.risers), 'up');
      $('#tbl-down', el).innerHTML = table(f(P.fallers), 'down');
      var ch = P.changed.filter(function (p) { return !pos || p.pos === pos; });
      $('#changed', el).innerHTML = ch.length ? ch.map(function (p) {
        var up = p.change > 0;
        return '<span class="change-chip"><b>' + esc(p.name) + '</b> ' + esc(p.team) + ' ' + money(p.price) +
          ' <span class="num-' + (up ? 'up' : 'down') + '">' + (up ? '▲' : '▼') + ' ' + Math.abs(p.change).toFixed(1) + '</span></span>';
      }).join('') : '<span class="panel-sub">No price changes yet this gameweek.</span>';
    }
    $('#price-pos', el).addEventListener('change', draw);
    draw();
  }

  /* ---------- Fixture difficulty ---------- */
  function ease(team, n) {
    // Higher is easier: each fixture scores (6 - difficulty); blank gameweeks score 0, doubles count twice.
    var s = 0;
    team.cells.slice(0, n).forEach(function (c) { c.forEach(function (o) { s += 6 - o.diff; }); });
    return s;
  }
  function renderFixtures(el, d) {
    var F = d.fdr;
    el.innerHTML =
      '<div class="toolbar"><label for="fdr-len">Show</label><select id="fdr-len">' +
      [3, 4, 5, 6].filter(function (n) { return n <= F.gws.length; }).map(function (n) {
        return '<option value="' + n + '"' + (n === Math.min(6, F.gws.length) ? ' selected' : '') + '>Next ' + n + ' gameweeks</option>';
      }).join('') + '</select>' +
      '<label for="fdr-sort">Sort</label><select id="fdr-sort"><option value="easy">Easiest run first</option><option value="hard">Hardest run first</option><option value="az">Team A–Z</option></select></div>' +
      '<section class="panel"><div class="tbl-wrap"><table class="fdr-tbl" id="fdr"></table></div>' +
      '<div class="legend"><span>Easier</span>' + [1, 2, 3, 4, 5].map(function (n) { return '<span><i class="f' + n + '"></i>' + n + '</span>'; }).join('') +
      '<span>Harder</span><span><i class="blank"></i>No game</span><span>H home · A away</span></div></section>' +
      '<p class="method">The run score adds up how easy each fixture is (difficulty 1 scores 5, difficulty 5 scores 1). Double gameweeks count twice and blank gameweeks score nothing, so teams with more games rank higher.</p>';

    function draw() {
      var n = +$('#fdr-len', el).value, sort = $('#fdr-sort', el).value;
      var teams = F.teams.slice().sort(function (a, b) {
        if (sort === 'az') return a.name.localeCompare(b.name);
        return sort === 'easy' ? ease(b, n) - ease(a, n) : ease(a, n) - ease(b, n);
      });
      $('#fdr', el).innerHTML = '<thead><tr><th style="text-align:left">Team</th>' +
        F.gws.slice(0, n).map(function (g) { return '<th>GW' + g + '</th>'; }).join('') + '<th>Run</th></tr></thead><tbody>' +
        teams.map(function (t) {
          return '<tr><td class="team">' + esc(t.short) + '<small>' + esc(t.name) + '</small></td>' +
            t.cells.slice(0, n).map(function (c) {
              if (!c.length) return '<td class="blank">–</td>';
              return '<td><div class="fx">' + c.map(function (o) {
                return '<span class="f' + o.diff + '">' + esc(o.opp) + '<small>' + (o.home ? 'H' : 'A') + '</small></span>';
              }).join('') + '</div></td>';
            }).join('') + '<td class="ease">' + ease(t, n) + '</td></tr>';
        }).join('') + '</tbody>';
    }
    $('#fdr-len', el).addEventListener('change', draw);
    $('#fdr-sort', el).addEventListener('change', draw);
    draw();
  }

  /* ---------- Captain picks ---------- */
  function renderCaptains(el, d) {
    var C = d.captains;
    if (!C.length) { el.innerHTML = '<p class="loading">Captain picks appear once the next gameweek\'s fixtures are set.</p>'; return; }
    var top = C.slice(0, 3), rest = C.slice(3);
    var max = C[0].score || 1;
    el.innerHTML =
      '<div class="podium">' + top.map(function (p, i) {
        return '<article class="pod' + (i === 0 ? ' first' : '') + '"><span class="pod-rank">' + ['Top pick', 'Second', 'Third'][i] + '</span>' +
          '<span class="pod-name">' + esc(p.name) + '</span><span class="pod-meta">' + esc(p.team) + ' · ' + esc(p.pos) + ' · ' + money(p.price) + '</span>' +
          oppChips(p.opp) +
          '<div class="pod-stats"><div><b>' + p.score.toFixed(1) + '</b><small>Score</small></div><div><b>' + p.ep.toFixed(1) +
          '</b><small>Exp. pts</small></div><div><b>' + p.form.toFixed(1) + '</b><small>Form</small></div><div><b>' + pct(p.own) +
          '</b><small>Owned</small></div></div></article>';
      }).join('') + '</div>' +
      '<section class="panel"><h2>The rest of the shortlist</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>Player</th><th>Next</th><th class="r">Exp. pts</th><th class="r">Form</th><th class="r">Owned</th><th class="r">Score</th></tr></thead><tbody>' +
      rest.map(function (p, i) {
        return '<tr><td>' + (i + 4) + '</td><td>' + playerCell(p) + '</td><td>' + oppChips(p.opp) + '</td><td class="r">' + p.ep.toFixed(1) +
          '</td><td class="r">' + p.form.toFixed(1) + '</td><td class="r">' + pct(p.own) + '</td><td class="r"><b>' + p.score.toFixed(1) +
          '</b><div class="bar acc"><i style="width:' + Math.round(p.score / max * 100) + '%"></i></div></td></tr>';
      }).join('') + '</tbody></table></div></section>' +
      '<p class="method">How the score works: FPL\'s own expected points for the next gameweek, plus a quarter of the player\'s recent form, adjusted for fixture difficulty (easier opponents add points, harder ones take them away). Doubtful players under 75% are left out.</p>';
  }

  /* ---------- Injuries and availability ---------- */
  function renderInjuries(el, d) {
    var L = d.flags;
    var filters = [['all', 'All'], ['i', 'Injured'], ['d', 'Doubtful'], ['s', 'Suspended'], ['u', 'Other']];
    el.innerHTML =
      '<div class="toolbar"><div class="chips" role="group" aria-label="Filter by status">' + filters.map(function (f, i) {
        return '<button type="button" class="chip-btn" id="flag-' + f[0] + '" data-f="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + f[1] + '</button>';
      }).join('') + '</div>' + posSelect('flag-pos') + '</div>' +
      '<section class="panel"><div class="flag-list" id="flags"></div></section>' +
      '<p class="method">Sorted by how many managers own the player, so the news that affects the most teams is at the top.</p>';
    var state = 'all';
    function draw() {
      var pos = $('#flag-pos', el).value;
      var list = L.filter(function (p) {
        var okS = state === 'all' || p.status === state || (state === 'u' && (p.status === 'u' || p.status === 'n'));
        return okS && (!pos || p.pos === pos);
      });
      $('#flags', el).innerHTML = list.length ? list.map(function (p) {
        var label = STATUS[p.status] || 'Flagged';
        if (p.status === 'd' && p.chance != null) label += ' · ' + p.chance + '%';
        return '<div class="flag"><div>' + playerCell(p) + '<span class="pm">' + pct(p.own) + ' owned · ' + money(p.price) +
          (p.added ? ' · news ' + esc(shortDate(p.added)) : '') + '</span></div><span class="pill st-' + esc(p.status) + '">' + esc(label) + '</span>' +
          (p.news ? '<p class="flag-news" style="margin:0">' + esc(p.news) + '</p>' : '') + '</div>';
      }).join('') : '<p class="panel-sub">No flagged players match this filter.</p>';
    }
    $$('.chip-btn', el).forEach(function (b) {
      b.addEventListener('click', function () {
        state = b.getAttribute('data-f');
        $$('.chip-btn', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        draw();
      });
    });
    $('#flag-pos', el).addEventListener('change', draw);
    draw();
  }

  /* ---------- Home teasers ---------- */
  function renderHome(el, d) {
    function set(id, html) { var t = $('#' + id, el); if (t) t.innerHTML = html; }
    var r = d.prices.risers[0], f = d.prices.fallers[0];
    if (r) set('teaser-prices', 'Biggest riser: <b>' + esc(r.name) + '</b> ' + signed(r.net) + (f ? '<br>Biggest faller: <b>' + esc(f.name) + '</b> ' + signed(f.net) : ''));
    var best = d.fdr.teams.slice().sort(function (a, b) { return ease(b, 6) - ease(a, 6); })[0];
    if (best) set('teaser-fixtures', 'Easiest run: <b>' + esc(best.name) + '</b>');
    var c = d.captains[0];
    if (c) set('teaser-captains', 'Top pick: <b>' + esc(c.name) + '</b> ' + esc(c.team) + ' · score ' + c.score.toFixed(1));
    var fl = d.flags[0];
    if (fl) set('teaser-injuries', d.flags.length + ' players flagged · most owned: <b>' + esc(fl.name) + '</b>');
  }

  var RENDER = { prices: renderPrices, fixtures: renderFixtures, captains: renderCaptains, injuries: renderInjuries, home: renderHome };

  function boot() {
    var page = document.body && document.body.getAttribute('data-page');
    if (!page) return;
    var el = $('#tool');
    loadData().then(function (d) {
      renderBand(d);
      if (el && RENDER[page]) RENDER[page](el, d);
    }).catch(function () {
      // Keep the snapshot built into the page; only show an error if there's nothing there.
      if (el && el.querySelector('.loading')) el.innerHTML = '<p class="error">The latest numbers didn\'t load. Refresh the page in a minute.</p>';
    });
  }

  window.EPLF = { load: loadData, band: renderBand, render: RENDER };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
