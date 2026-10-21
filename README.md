# EPL Fanatic

Free Fantasy Premier League tools for eplfanatic.com: price changes, fixture difficulty, captain picks and injuries.
The site is plain HTML hosted free on GitHub Pages. A scheduled job pulls fresh FPL data every hour and the site updates by itself.

## What's in here

| Path | What it is |
| --- | --- |
| `index.html`, `price-changes.html`, `fixture-difficulty.html`, `captain-picks.html`, `injuries.html` | The tool pages |
| `about.html`, `privacy.html` | About/contact and privacy policy (needed for AdSense) |
| `assets/style.css`, `assets/app.js` | Look of the site, and the code that draws the tools |
| `data/fpl.json` | The numbers the tools show. Starts as made-up sample data; replaced on the first update run |
| `scripts/fetch-fpl.mjs` | Pulls live FPL data and writes `data/fpl.json` |
| `.github/workflows/update-data.yml` | Runs the data script every hour |
| `scripts/build.mjs` | Rebuilds the pages if you change page text, the contact email, or add your AdSense ID |
| `CNAME`, `sitemap.xml`, `robots.txt` | Domain and Google settings |

## Going live (start to finish)

1. Create a free account at github.com.
2. Create a new **public** repository called `eplfanatic` (GitHub Pages is free only for public repositories).
3. Upload every file and folder from this project into it, including the hidden `.github` folder. On a computer, unzip and drag the whole folder contents into "Add file → Upload files". (Or connect GitHub to Claude and have Claude push it for you.)
4. In the repository, open **Settings → Actions → General**, set **Workflow permissions** to **Read and write**, and save.
5. Open the **Actions** tab, enable workflows if asked, pick **Update FPL data**, and press **Run workflow**. After about a minute, `data/fpl.json` holds live data.
6. Open **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
7. On the same page, type `eplfanatic.com` under **Custom domain** and save.
8. In GoDaddy, open **My Products → eplfanatic.com → DNS**:
   - Delete any existing `A` record for `@` (GoDaddy's parked page).
   - Add four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Set the `CNAME` record for `www` to `YOUR-GITHUB-USERNAME.github.io`.
9. Wait up to a few hours for DNS, then go back to **Settings → Pages** and tick **Enforce HTTPS**.
10. Set up the contact address: forward `hello@eplfanatic.com` to your inbox in GoDaddy's email forwarding, or change `CONTACT` in `scripts/build.mjs` and run `node scripts/build.mjs`.
11. Submit `https://eplfanatic.com/sitemap.xml` in Google Search Console so Google finds the pages.
12. Once AdSense approves you, paste your publisher ID into `ADSENSE_ID` in `scripts/build.mjs`, run `node scripts/build.mjs`, and upload the changed pages.

## Good to know

- The FPL data feed is public but unofficial. If FPL changes it, the update job fails and the site keeps showing the last good numbers until the script is fixed. GitHub emails you when a run fails.
- GitHub turns off scheduled jobs on repositories with no activity for 60 days. The hourly data commits count as activity during the season; in the summer break, re-enable it from the Actions tab if needed.
- Don't add Premier League or club logos. Keep the "not affiliated" footer.
