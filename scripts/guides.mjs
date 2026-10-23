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
  {
    file: 'fpl-beginners-guide.html',
    title: 'FPL Beginner\'s Guide: How Fantasy Premier League Works | EPL Fanatic',
    desc: 'New to Fantasy Premier League? How the squad, budget, transfers, captain and deadlines work, explained step by step.',
    h1: 'FPL beginner\'s guide',
    lede: 'Fantasy Premier League is free to play and takes a few minutes a week once you know the basics. This guide covers everything you need for your first gameweek.',
    body: `
<h2>The aim of the game</h2>
<p>You pick a squad of real Premier League players. Each week, your players score points based on what they do in their real matches: playing, scoring, assisting, keeping clean sheets and more. Your total over the season decides your rank against millions of other managers and against your friends in private leagues.</p>

<h2>Building your squad</h2>
<ul>
  <li>You pick <strong>15 players</strong>: 2 goalkeepers, 5 defenders, 5 midfielders and 3 forwards.</li>
  <li>You have a budget of <strong>£100.0m</strong>. Each player has a price set by the game.</li>
  <li>You can pick at most <strong>3 players from any one club</strong>.</li>
</ul>

<h2>Your starting 11</h2>
<p>Each gameweek, 11 of your 15 players start and 4 sit on the bench. Only the starters score, unless you use the Bench Boost chip. Your starting 11 must have 1 goalkeeper, at least 3 defenders, at least 2 midfielders and at least 1 forward, so formations such as 3-4-3, 4-4-2 and 3-5-2 are all allowed.</p>
<p>If a starter doesn't play at all, the game automatically brings on a bench player in the order you set. See <a href="fpl-bench-and-auto-subs.html">bench and auto-subs</a> for how that works.</p>

<h2>Captain and vice-captain</h2>
<p>Pick one starter as captain. Their points count double. Your vice-captain takes over the double points if your captain doesn't play. This is the biggest weekly decision, so see <a href="how-to-pick-fpl-captain.html">how to pick your captain</a>.</p>

<h2>Transfers</h2>
<p>You get one free transfer each gameweek to swap a player out. Unused free transfers roll over, up to five. Extra transfers cost 4 points each. Read <a href="fpl-free-transfers-and-hits.html">free transfers and points hits</a> before making several changes.</p>

<h2>Chips</h2>
<p>Chips are one-off boosts: Wildcard, Free Hit, Bench Boost and Triple Captain. This season you get two of each, one set per half of the season. See <a href="fpl-chips-explained.html">FPL chips explained</a>.</p>

<h2>Deadlines</h2>
<p>Every change must be made before the gameweek deadline, which is usually 90 minutes before the first match of that gameweek. Our deadline bar at the top of every page shows the next one. See <a href="fpl-gameweek-deadlines.html">gameweek deadlines</a> for what locks and when.</p>

<h2>Your first-week checklist</h2>
<ul>
  <li>Spend most of your budget on a few reliable attackers and fill the rest with cheap players who start every week.</li>
  <li>Check the <a href="injuries.html">injury list</a> so you don't buy someone who's out.</li>
  <li>Use the <a href="fixture-difficulty.html">fixture grid</a> to favour teams with easier upcoming matches.</li>
  <li>Join a private league with friends. It makes every week more fun.</li>
</ul>`,
  },
  {
    file: 'build-a-balanced-fpl-squad.html',
    title: 'How to Build a Balanced FPL Squad on £100m | EPL Fanatic',
    desc: 'How to split your £100m Fantasy Premier League budget between premiums, mid-priced players and cheap bench fodder.',
    h1: 'How to build a balanced FPL squad',
    lede: 'The best squads don\'t spread money evenly. They put it where points come from and save it where they don\'t.',
    body: `
<h2>Spend where the points are</h2>
<p>Most of the big hauls in FPL come from attacking players: goal-scoring midfielders and forwards who take penalties and play every minute. That's why most strong squads put a large share of the budget into two or three premium attackers.</p>
<p>Goalkeepers and the fourth or fifth defender rarely decide a gameweek. Many managers spend as little as possible there and use the savings up front.</p>

<h2>The three price bands</h2>
<ul>
  <li><strong>Premiums:</strong> the most expensive players in the game. Pick the ones who start every week, take set pieces and have good fixtures. These are your usual captains.</li>
  <li><strong>Mid-priced players:</strong> the engine of a good squad. Look for players who have moved into a more attacking role, or who play for a team on an easy run.</li>
  <li><strong>Budget enablers:</strong> the cheapest players who still start regularly. A cheap defender who plays 90 minutes on a solid team is worth more than an expensive one who is rotated.</li>
</ul>

<h2>Bench: cheap but playing</h2>
<p>Your bench only scores when a starter misses out or you play Bench Boost. That makes it a good place to save money. Choose cheap players who are likely to start, so auto-substitutions actually give you points. A bench full of players who never play is money and points wasted.</p>

<h2>Don't forget defensive points</h2>
<p>Defenders and defensive midfielders can now earn 2 points for defensive contributions (10 or more clearances, blocks, interceptions and tackles for defenders, 12 or more including recoveries for midfielders and forwards). Busy centre-backs on mid-table teams can be good value even without many clean sheets. See <a href="fpl-points-scoring-explained.html">how FPL scoring works</a>.</p>

<h2>Keep a little flexibility</h2>
<ul>
  <li>Leave a small amount in the bank, or pick players you could easily swap for a premium later.</li>
  <li>Avoid three players from one team unless they're all nailed starters with good fixtures. It limits your transfers later.</li>
  <li>Balance teams by fixtures. Use the <a href="fixture-difficulty.html">fixture grid</a> so your players don't all have hard matches in the same week.</li>
</ul>`,
  },
  {
    file: 'fpl-bench-and-auto-subs.html',
    title: 'FPL Bench Order and Automatic Substitutions Explained | EPL Fanatic',
    desc: 'How Fantasy Premier League automatic substitutions work, why bench order matters, and how to set your bench each gameweek.',
    h1: 'Bench order and automatic substitutions',
    lede: 'When one of your starters doesn\'t play, the game can bring on a bench player for you. Getting the order right can quietly win you points every few weeks.',
    body: `
<h2>When an auto-sub happens</h2>
<p>If a player in your starting 11 plays <strong>0 minutes</strong> in the gameweek, the game replaces him with a player from your bench who did play. This happens automatically after the gameweek's matches. A starter who plays even one minute stays in your team, even if he scores very little.</p>

<h2>Bench order matters</h2>
<p>Your bench has a substitute goalkeeper plus three outfield players in order: first, second and third. The game tries them in that order and brings on the first one who played, as long as your formation stays valid.</p>
<ul>
  <li>A goalkeeper can only be replaced by your substitute goalkeeper.</li>
  <li>Your team must still have at least 3 defenders, 2 midfielders and 1 forward after the change. If bringing on your first sub would break that, the game skips to the next one who keeps the formation valid.</li>
</ul>

<h2>Captain and vice-captain</h2>
<p>If your captain plays 0 minutes, your vice-captain's points are doubled instead. The captain himself is also replaced by a bench player like any other starter. This is why your vice-captain should be someone who is very likely to start.</p>

<h2>How to set your bench</h2>
<ul>
  <li>Put the bench player most likely to play and score first.</li>
  <li>If one of your starters is a doubt, put a player from the same position first on the bench, so the formation rules don't get in the way.</li>
  <li>Check the <a href="injuries.html">injury list</a> and team news before the deadline, and move clearly injured players to the bench yourself.</li>
</ul>

<h2>Bench Boost</h2>
<p>When you play the Bench Boost chip, all four bench players score that week, so bench order doesn't matter. See <a href="fpl-chips-explained.html">FPL chips explained</a> for when to use it.</p>`,
  },
  {
    file: 'fpl-gameweek-deadlines.html',
    title: 'FPL Gameweek Deadlines: When They Are and What Locks | EPL Fanatic',
    desc: 'When the Fantasy Premier League deadline is each gameweek, what you can and can\'t change after it, and when points are finalised.',
    h1: 'FPL gameweek deadlines',
    lede: 'Miss the deadline and your changes wait until next week. Here\'s exactly what the deadline locks and how a gameweek runs from start to finish.',
    body: `
<h2>When the deadline is</h2>
<p>The deadline is usually <strong>90 minutes before the first match of the gameweek</strong> kicks off. When the first match is on a Saturday lunchtime, the deadline is late Saturday morning UK time. When a gameweek starts on a Friday night or midweek, the deadline moves earlier. Always check: the bar at the top of every EPL Fanatic page shows the next deadline in your own time zone.</p>

<h2>What the deadline locks</h2>
<ul>
  <li>Transfers in and out</li>
  <li>Your starting 11 and bench order</li>
  <li>Your captain and vice-captain</li>
  <li>Any chip you want to play that week</li>
</ul>
<p>After the deadline, any transfers you make count for the following gameweek.</p>

<h2>During the gameweek</h2>
<p>Points update live as matches are played. This season, projected bonus points, mini-league tables and your overall rank update live from about 20 minutes into each match. Automatic substitutions are applied once the gameweek's matches are finished.</p>

<h2>When points are final</h2>
<p>Scores are confirmed at 9am UK time on the day after the gameweek's last match. Small changes to assists or bonus points can happen until then.</p>

<h2>A simple deadline routine</h2>
<ul>
  <li><strong>Two or three days before:</strong> check the <a href="fixture-difficulty.html">fixture grid</a> and plan any transfer.</li>
  <li><strong>The night before:</strong> check <a href="price-changes.html">price changes</a>, since buying before a rise saves money.</li>
  <li><strong>The day of:</strong> check the <a href="injuries.html">injury list</a> and press conference news, confirm your <a href="captain-picks.html">captain</a>, and set your bench.</li>
</ul>`,
  },
  {
    file: 'fpl-mini-league-strategy.html',
    title: 'How to Win Your FPL Mini-League | EPL Fanatic',
    desc: 'Practical Fantasy Premier League mini-league strategy: when to follow the crowd, when to pick differentials, and how to catch a leader.',
    h1: 'How to win your FPL mini-league',
    lede: 'Beating your friends is a different game from chasing a high overall rank. What matters is how your team differs from theirs.',
    body: `
<h2>Points only matter when they're different</h2>
<p>If you and your rival both own the same player, his goals don't change the gap between you. Only players one of you owns and the other doesn't, and different captain choices, move you up or down the table. Look at your rivals' teams in the game and notice which of your players they don't have.</p>

<h2>Leading? Copy the big picks</h2>
<p>If you're ahead, the safest plan is to own the players your rivals rely on, especially their captains. That way, their big weeks don't cost you ground. Make fewer risky transfers and avoid points hits unless a player is injured long-term.</p>

<h2>Chasing? Pick your moments</h2>
<p>If you're behind, you need players your rivals don't have, called differentials, to score well. Good ways to find them:</p>
<ul>
  <li>Players with a strong run of fixtures but low ownership. The <a href="fixture-difficulty.html">fixture grid</a> helps you spot them early.</li>
  <li>A different captain from the leader, in a week when your pick has a much easier match.</li>
  <li>Timing chips differently. If your rivals have already used their Bench Boost or Triple Captain, using yours in a big double gameweek can swing the table.</li>
</ul>

<h2>Don't overreact</h2>
<p>One bad week isn't a trend. Selling players after one blank and buying last week's top scorer usually costs points over the season. Keep a plan for the next few gameweeks and adjust it only for injuries, suspensions and fixture changes.</p>

<h2>Watch the chip deadline</h2>
<p>This season, first-half chips expire at the Gameweek 19 deadline. Check which chips your rivals have left and plan yours so you don't waste any. See <a href="fpl-chips-explained.html">FPL chips explained</a>.</p>`,
  },
  {
    file: 'expected-goals-xg-for-fpl.html',
    title: 'Expected Goals (xG) Explained for FPL Managers | EPL Fanatic',
    desc: 'What expected goals (xG) and expected assists (xA) mean, and how Fantasy Premier League managers use them to spot players before they score.',
    h1: 'Expected goals (xG) explained',
    lede: 'Goals are rare and luck plays a big part. Expected goals help you see which players keep getting good chances, even before the goals come.',
    body: `
<h2>What xG measures</h2>
<p>Every shot is given a value between 0 and 1: the chance that a typical shot from that position and situation ends up as a goal. A penalty is worth far more than a long-range shot. Add up a player's shots and you get his <strong>expected goals</strong>, or xG.</p>
<p><strong>Expected assists</strong> (xA) work the same way for the passes that lead to shots.</p>

<h2>Why it helps in FPL</h2>
<ul>
  <li><strong>Spotting players before they haul:</strong> a forward with high xG but few goals is getting good chances. If he keeps getting them, the goals often follow.</li>
  <li><strong>Avoiding false form:</strong> a player who scored three long-range screamers from very little xG may struggle to keep it up.</li>
  <li><strong>Judging defences:</strong> teams that concede lots of expected goals are good opponents to target with your attackers.</li>
</ul>

<h2>What xG can't tell you</h2>
<ul>
  <li>It doesn't account for minutes. A player with good xG who gets subbed off early will still score fewer FPL points.</li>
  <li>Small samples mislead. Three or four matches is a short window, so compare over several gameweeks.</li>
  <li>Elite finishers can beat their xG for a long time, and poor finishers can stay below it.</li>
</ul>

<h2>Putting it together</h2>
<p>Use xG alongside fixtures, minutes and set-piece duties, not on its own. A player with strong xG, guaranteed minutes and an easy run on our <a href="fixture-difficulty.html">fixture grid</a> is usually a better buy than one with a big recent haul from very few chances. Our <a href="captain-picks.html">captain picks</a> use FPL's own expected points, which already include this kind of underlying data.</p>`,
  },
];
