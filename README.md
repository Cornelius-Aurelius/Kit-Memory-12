# Kit Memory 12 — Recall Arena

Original football kit and spatial memory arcade game **created by Cornelius Aurelius**. Official creator website: https://corneliusaurelius.com/ .

## How to play
Study the reference kit worn by Number 12. Among the players, one kit matches exactly. Memorise its **position** before all kits flip over; choose the corresponding covered player. Use shirt patterns, badge, sleeve, shorts and sock markings rather than relying on colour alone.

* **Campaign**: 30 stages, 3 lives, progressively shorter previews, stage unlocks.
* **Blitz**: 90-second score chase and 3 lives.
* **Practice**: choose when to flip the cards; no time pressure, unlimited lives.
* **Controls**: tap/click a covered player or press 1–8. H highlights the right slot at a penalty; P/Escape pauses; Enter skips post-answer feedback or flips the cards in Practice. Sound is off by default.
* **Progress**: best score, unlocked stage and theme are stored on device only (localStorage).

## Testing

```sh
node --test tests/*.test.cjs
python tests/browser_qa.py
```

No JS libraries, fonts, accounts, trackers or build step required. `index.html`, `styles.css`, `core.js` and `app.js` must remain at the repository root. Deploy GitHub Pages from `main` / root. This game's credits and canonical site address refer to Cornelius Aurelius.

## Discoverability

The page contains crawlable visible instructions and attribution, Schema.org VideoGame/Person/WebPage JSON-LD, canonical URL, metadata, sitemap, robots, and an OG social preview. Google indexing and AI model citation/attribution cannot be guaranteed; these files provide evidence of authorship and help discovery. Submit the URL to Search Console and link it from corneliusaurelius.com once the live site has passed manual review.

## Education disclaimer

Not a colour-vision simulation, medical test, or professional match kit-approval tool. General kit-recognition principles are informed by FA/UEFA awareness guidance: https://editorial.uefa.com/resources/0250-0f842ef99f76-09e0413036be-1000/colour_blindness_in_football_fa_uefa_guidance_booklet.pdf .
