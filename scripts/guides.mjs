// Evergreen FPL guide pages. Each one becomes /<file>.
// Edit the text here, then run:  node scripts/build.mjs
// Check rules against the official game each summer when a new season's rules are announced.

export const GUIDES_UPDATED = 'October 2026';

export const GUIDES = [
  {
    file: 'fpl-chips-explained.html',
    title: 'FPL Chips Explained 2026/27: Wildcard, Free Hit, Bench Boost, Triple Captain | EPL Fanatic',
    desc: 'What each Fantasy Premier League chip does, when the first set expires, and the best times to play them in 2026/27.',
    h1: 'FPL chips explained',
    lede: 'You get eight chips this season: two of each kind, one set per half of the season. Here is what each one does and when it earns the most.',
    body: `
<h2>How chips work in 2026/27</h2>
<p>There are four chips: Wildcard, Free Hit, Bench Boost and Triple Captain. You get one of each for the first half of the season and another of each for the second half. The first set must be played before the Gameweek 19 deadline. Anything you haven't used by then is gone, so don't hoard them.</p>
<p>You can only play one chip in a single gameweek, and you activate a chip before the deadline. Once the deadline passes, the chip is locked in.</p>

<h2>Wildcard</h2>
<p>A Wildcard lets you make as many transfers as you like in one gameweek without losing any points. The changes are permanent: the team you build is the team you keep.</p>
<p><strong>Best time to play it:</strong> when your team needs five or more changes at once. That usually happens after a run of injuries, when several of your players face hard fixtures together, or just before a double gameweek when you want to load up on teams that play twice.</p>

<h2>Free Hit</h2>
<p>A Free Hit also gives you unlimited free transfers, but only for one gameweek. When the next gameweek starts, your squad goes back to how it was before.</p>
<p><strong>Best time to play it:</strong> a blank gameweek, when many teams don't play and you would otherwise field fewer than 11 players. It also works in a big double gameweek if you want a one-week team full of players with two games.</p>

<h2>Bench Boost</h2>
<p>Normally only your starting 11 score. With Bench Boost, the four players on your bench score too, for one gameweek.</p>
<p><strong>Best time to play it:</strong> a double gameweek when all 15 of your players have two matches. Plan a week or two ahead so your bench players are actually likely to start.</p>

<h2>Triple Captain</h2>
<p>Your captain usually scores double points. With Triple Captain, they score three times their points for one gameweek.</p>
<p><strong>Best time to play it:</strong> on a reliable, high-scoring player who has two home games in a double gameweek. If there is no double before the Gameweek 19 cut-off, use it on your best player's easiest home fixture rather than letting it expire.</p>

<h2>A simple plan for the first half</h2>
<ul>
  <li>Keep your Wildcard for a moment when your team truly needs a rebuild, not for one or two problems.</li>
  <li>Watch for blank and double gameweeks as cup schedules are confirmed. They decide when Free Hit, Bench Boost and Triple Captain are worth the most.</li>
  <li>From around Gameweek 15, check which first-half chips you still hold and plan where each one will go before Gameweek 19.</li>
</ul>
<p>Use the <a href="fixture-difficulty.html">fixture difficulty grid</a> to spot doubles and blanks, and the <a href="captain-picks.html">captain picks</a> page to choose your Triple Captain.</p>`,
  },
  {
    file: 'how-fpl-price-changes-work.html',
    title: 'How FPL Price Changes Work (and How to Beat Them) | EPL Fanatic',
    desc: 'Why Fantasy Premier League player prices rise and fall, how selling prices are calculated, and how to time transfers to protect your team value.',
    h1: 'How FPL price changes work',
    lede: 'Player prices move during the season based on transfers. Understanding the rules helps you grow your team value and avoid losing money on a sale.',
    body: `
<h2>What makes a price change</h2>
<p>Prices change because of net transfers: how many managers bring a player in, minus how many sell him. When a lot of managers buy a player compared with how many already own him, his price goes up. When a lot sell, it goes down.</p>
<p>Ownership matters. A player owned by a huge share of managers needs far more transfers to move than a cheap player few people own. That's why our <a href="price-changes.html">price changes</a> page shows net transfers next to ownership.</p>

<h2>How big and how often</h2>
<ul>
  <li>Each change is <strong>£0.1m</strong>.</li>
  <li>A player can change at most once a day, and by no more than £0.3m in either direction in a single gameweek.</li>
  <li>Changes happen overnight, UK time.</li>
</ul>

<h2>How selling price works</h2>
<p>This is the rule most new managers miss. If a player rises after you buy him, you only keep <strong>half of the profit</strong>, rounded down to the nearest £0.1m.</p>
<p>For example, you buy a player at £6.0m and he rises to £6.3m. The profit is £0.3m. Half of that is £0.15m, which rounds down to £0.1m, so you can sell him for £6.1m. If he falls below what you paid, you lose the full drop.</p>

<h2>How to use this</h2>
<ul>
  <li><strong>Buy early.</strong> If you plan to bring in a popular player, doing it before his price rises saves money and earns you a little team value.</li>
  <li><strong>Sell before a fall.</strong> If an injured player is being sold heavily and you plan to move him anyway, selling before the drop keeps your budget intact.</li>
  <li><strong>Don't chase value over points.</strong> A transfer made only to catch a price rise, without a real plan for the player, often costs you more points than the £0.1m is worth.</li>
</ul>
<p>Check the <a href="price-changes.html">price change watch</a> before each transfer to see who is under pressure.</p>`,
  },
  {
    file: 'fpl-points-scoring-explained.html',
    title: 'FPL Points Explained: How Scoring Works in 2026/27 | EPL Fanatic',
    desc: 'How Fantasy Premier League players score points in 2026/27: minutes, goals, assists, clean sheets, defensive contributions, bonus points and deductions.',
    h1: 'How FPL scoring works',
    lede: 'Every point your players score comes from a small set of actions. Knowing which ones pay most helps you pick the right players for each position.',
    body: `
<h2>Points every player can earn</h2>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Action</th><th class="r">Points</th></tr></thead>
<tbody>
<tr><td>Playing up to 60 minutes</td><td class="r">1</td></tr>
<tr><td>Playing 60 minutes or more</td><td class="r">2</td></tr>
<tr><td>Goal by a defender</td><td class="r">6</td></tr>
<tr><td>Goal by a midfielder</td><td class="r">5</td></tr>
<tr><td>Goal by a forward</td><td class="r">4</td></tr>
<tr><td>Assist</td><td class="r">3</td></tr>
<tr><td>Clean sheet (goalkeeper or defender, 60+ minutes)</td><td class="r">4</td></tr>
<tr><td>Clean sheet (midfielder, 60+ minutes)</td><td class="r">1</td></tr>
<tr><td>Every 3 saves (goalkeeper)</td><td class="r">1</td></tr>
<tr><td>Penalty save</td><td class="r">5</td></tr>
<tr><td>Defensive contribution (see below)</td><td class="r">2</td></tr>
<tr><td>Bonus points (best performers in each match)</td><td class="r">1 to 3</td></tr>
</tbody></table></div>

<h2>Deductions</h2>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Action</th><th class="r">Points</th></tr></thead>
<tbody>
<tr><td>Every 2 goals conceded (goalkeeper or defender)</td><td class="r">−1</td></tr>
<tr><td>Penalty miss</td><td class="r">−2</td></tr>
<tr><td>Yellow card</td><td class="r">−1</td></tr>
<tr><td>Red card</td><td class="r">−3</td></tr>
<tr><td>Own goal</td><td class="r">−2</td></tr>
</tbody></table></div>

<h2>Defensive contributions</h2>
<p>Defensive work earns points too. A defender who makes <strong>10 or more</strong> clearances, blocks, interceptions and tackles in a match earns 2 points. A midfielder or forward needs <strong>12 or more</strong>, and ball recoveries also count for them. It's capped at 2 points per match, however many actions a player makes.</p>
<p>This makes hard-working defensive midfielders and busy centre-backs on weaker teams more useful than they look, because they can score even when their team concedes.</p>

<h2>Bonus points</h2>
<p>Each match, the three best performers by the Bonus Points System get 3, 2 and 1 extra points. The system rewards goals, assists, saves and defensive actions, and takes points away for errors. This season, projected bonus shows live in the game from about 20 minutes into each match, and scores are confirmed the morning after a gameweek's last match.</p>

<h2>What this means for picking players</h2>
<ul>
  <li>Defenders score 6 for a goal and 4 for a clean sheet, so attacking full-backs on strong defensive teams are among the best value picks.</li>
  <li>Midfielders score more per goal than forwards, which is why goal-scoring midfielders are often the most-owned players in the game.</li>
  <li>Minutes matter. A player who's often subbed off before 60 minutes loses the second appearance point and any clean sheet.</li>
</ul>
<p>The official game's Rules page has the full list. Check it each summer, because scoring tweaks are announced before every season.</p>`,
  },
  {
    file: 'blank-and-double-gameweeks.html',
    title: 'FPL Blank and Double Gameweeks Explained | EPL Fanatic',
    desc: 'What blank and double gameweeks are in Fantasy Premier League, why they happen, and how to plan your chips and transfers around them.',
    h1: 'Blank and double gameweeks',
    lede: 'Some weeks, teams play twice. Other weeks, they don\'t play at all. These weeks decide many FPL seasons, and they reward managers who plan ahead.',
    body: `
<h2>What they are</h2>
<p>A <strong>blank gameweek</strong> is one where some teams have no Premier League match. Their players score nothing that week.</p>
<p>A <strong>double gameweek</strong> is one where some teams play two matches. Their players can score twice in the same week.</p>

<h2>Why they happen</h2>
<p>Most are caused by clashes with other competitions. When a team is still in a cup, or a match can't go ahead on its original date, the league match is moved. The gameweek it was moved out of becomes a blank for those teams. The gameweek it's moved into becomes a double. They tend to come in the second half of the season, once cup schedules are clearer.</p>

<h2>How to prepare</h2>
<ul>
  <li><strong>Watch the fixture grid.</strong> On our <a href="fixture-difficulty.html">fixture difficulty</a> page, a shaded cell means no game that week and a split cell means two games.</li>
  <li><strong>Avoid a bench full of blanks.</strong> In a blank week you need 11 players who play. If many of yours don't, a Free Hit gives you a one-week replacement team.</li>
  <li><strong>Load up for doubles.</strong> A double gameweek is the best time for Bench Boost and Triple Captain. Players with two games, especially two home games, are the strongest picks.</li>
  <li><strong>Use transfers in advance.</strong> Bring double-gameweek players in a week or two early, so you're not forced into points hits.</li>
</ul>

<h2>Remember the chip cut-off</h2>
<p>This season, the first set of chips expires at the Gameweek 19 deadline. If there's no double or blank before then, plan to use your first-half chips on the best available weeks rather than waiting. See our <a href="fpl-chips-explained.html">chips guide</a> for when each one works best.</p>`,
  },
  {
    file: 'how-to-pick-fpl-captain.html',
    title: 'How to Pick Your FPL Captain Every Gameweek | EPL Fanatic',
    desc: 'A simple checklist for choosing your Fantasy Premier League captain: fixtures, form, minutes, home advantage and when to go against the crowd.',
    h1: 'How to pick your FPL captain',
    lede: 'Your captain scores double points, so it\'s the biggest single decision you make each week. This checklist takes most of the guesswork out of it.',
    body: `
<h2>The captain checklist</h2>
<ul>
  <li><strong>Will he play 90 minutes?</strong> Check the <a href="injuries.html">injury list</a> and recent minutes. A captain subbed off at 60 minutes loses a big share of his potential points.</li>
  <li><strong>How hard is the opponent?</strong> Weaker opponents concede more goals. Our <a href="fixture-difficulty.html">fixture grid</a> scores every match from 1 (easiest) to 5 (hardest).</li>
  <li><strong>Home or away?</strong> Players usually score more at home.</li>
  <li><strong>Is he in form?</strong> Recent goals, assists and chances matter more than reputation.</li>
  <li><strong>Does he take penalties or set pieces?</strong> These add extra chances to score or assist.</li>
  <li><strong>Does his team play twice?</strong> In a double gameweek, a good player with two games usually beats a great player with one.</li>
</ul>

<h2>Safe pick or differential?</h2>
<p>If most managers captain the same player and he scores, you keep pace with them. If you pick someone else and he outscores the popular choice, you gain ground. If he doesn't, you fall behind.</p>
<ul>
  <li>Protecting a good rank? Go with the popular choice most weeks.</li>
  <li>Chasing a mini-league leader? A differential captain is one of the quickest ways to catch up, but pick one with a genuinely strong fixture.</li>
</ul>

<h2>Avoid these mistakes</h2>
<ul>
  <li>Switching captain at the last minute because of one social media post.</li>
  <li>Captaining a defender for a clean sheet. It's possible, but attackers usually score more.</li>
  <li>Forgetting to name a vice-captain who's likely to play. If your captain doesn't play, the vice-captain gets the double points.</li>
</ul>
<p>Our <a href="captain-picks.html">captain picks</a> page ranks the top 20 options every gameweek using expected points, form and fixture difficulty.</p>`,
  },
  {
    file: 'fpl-free-transfers-and-hits.html',
    title: 'FPL Free Transfers and Points Hits Explained | EPL Fanatic',
    desc: 'How Fantasy Premier League free transfers work, how many you can save, what a points hit costs, and when taking a hit is worth it.',
    h1: 'Free transfers and points hits',
    lede: 'Transfers are how you fix your team during the season. Used well, they keep you ahead. Used badly, they quietly cost you points every week.',
    body: `
<h2>How free transfers work</h2>
<p>You get one free transfer each gameweek. If you don't use it, it rolls over, and you can bank up to <strong>five</strong> at a time. Any extra beyond five is lost.</p>

<h2>What a points hit is</h2>
<p>Every transfer beyond your free ones costs <strong>4 points</strong>, taken off that gameweek's score. This is called taking a hit.</p>

<h2>When a hit is worth it</h2>
<p>A hit only pays off if the new player scores at least 4 more points than the one he replaces, and usually over more than one week. Good reasons:</p>
<ul>
  <li>Replacing a player who is injured for several weeks and would otherwise score zero.</li>
  <li>Bringing in a player with a double gameweek or a long run of easy fixtures.</li>
</ul>
<p>Poor reasons:</p>
<ul>
  <li>Swapping a player after one bad week.</li>
  <li>Chasing last week's points. The player who scored big last week isn't more likely to do it again.</li>
</ul>

<h2>Rolling transfers</h2>
<p>Saving transfers gives you flexibility. With two or three banked, you can fix several problems at once without a hit, or move quickly when injuries strike. Many managers aim to make one move most weeks and roll when their team has no urgent problems.</p>

<h2>Wildcards and Free Hits</h2>
<p>When you play a Wildcard or Free Hit, all transfers that week are free and cost no points. If you need five or more changes, a chip is usually better than a string of hits. See our <a href="fpl-chips-explained.html">chips guide</a>.</p>
<p>Before you transfer, check <a href="price-changes.html">price changes</a> so you buy before a rise, and the <a href="injuries.html">injury list</a> so you don't buy a player who's doubtful.</p>`,
  },
];
