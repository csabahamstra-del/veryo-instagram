# Veryo Instagram

Ontwerpen voor de Instagram-posts van Veryo, in de Veryo-huisstijl. Deze repo is openbaar zodat Notion de beelden als voorbeeld kan tonen en Instagram ze kan ophalen bij het plaatsen.

## Hoe het werkt
1. De content-agent schrijft een post als `posts/<slug>/post.json`.
2. `studio/render.js` maakt daar JPEG-slides van (1080×1350) met `studio/template.html`.
3. De beelden worden gepusht; hun openbare links gaan in het veld *Beelden* van de Contentkalender in Notion.
4. Csaba keurt goed in Notion; Make plaatst de carrousel op @veryo_automatisatie.

## Renderen
```
cd studio && npm i playwright@1 && node render.js ../posts/<slug>/post.json ../posts/<slug>
```
Slide-types in `post.json`: `cover` (petrol, eerste slide), `point` (zand, met optioneel `num` of `quote`), `cta` (petrol, laatste slide met amber knop).

Lettertypes: Newsreader en Plus Jakarta Sans (SIL Open Font License), via Fontsource.
