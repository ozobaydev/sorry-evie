# One Moment — a cinematic apology website

> *"If I could turn back one moment..."*

A premium, fully interactive apology / "I'm sorry" website template. It reads as a
single continuous story — regret → realization → memories → apology → promise →
forgiveness → a new beginning — rather than a conventional landing page.

Built with **React + Vite**, plain **CSS** (no Tailwind, no Bootstrap), **Framer Motion**
and hand-drawn **SVG** scenery. Every landscape on the site is drawn in code, so the
template looks finished on a fresh install with **zero image files required**.

---

## Quick start

```bash
npm install
npm run dev
```

Open the address Vite prints (usually <http://localhost:5173>).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Two ways to make it yours

### 1. The visual editor — `/admin`

Go to **<http://localhost:5173/admin>**.

The screen is split: your fields on the left, the **real website running live** on the
right. There are no field labels to decipher —

* **focus any field** and the preview flies to that exact element and pulses it,
* switch on **Point & edit** and click anything in the preview to jump straight to the
  field that controls it,
* toggle **desktop / phone** to check both layouts as you write,
* **upload photos** by dragging them onto a field — they are resized and compressed
  automatically.

Everything saves to your browser as you type. When you are happy, hit **siteData.js**
to download your version and drop it over `src/config/siteData.js` — that bakes your
content into the source code permanently, so it ships with the site.

> The **Download** button saves a `site-content.json` backup, and **Upload** loads one
> back. **Reset** restores the original template.

### 2. The config file — `src/config/siteData.js`

Every word, name, date, photo and message lives in this one file. Open it, change the
strings, done.

```js
const siteData = {
  personName: 'Aria',
  date: '26 April 2026',

  images: {
    hero: '/images/hero.jpg',   // leave '' to use the built-in illustrated scene
    apology: '',
    chapter: '',
    sunrise: '',
  },

  memories: [
    {
      title: 'Our first trip',
      date: '12 Aug 2025',
      image: '/images/memories/memory1.jpg',
      caption: 'Our first trip',
      message: 'You fell asleep on my shoulder...',
    },
    // add or remove freely — the gallery and the star constellation both follow
  ],

  promises: [{ icon: 'ear', title: 'Listen', message: "I'll listen before I react." }],
  // ...
}
```

**Icon names** available for promises, realizations and footer links:
`heart` · `ear` · `clock` · `message` · `star` · `shield` · `sparkles` · `feather` ·
`camera` · `mail` · `music`

---

## Photographs

Drop files into `public/images/` and reference them as `/images/your-photo.jpg`.
See `public/images/README.txt` for the suggested names and sizes.

Leave any image empty and the site draws its own illustrated scene instead — the
moonlit lake, the rainy window, the sunrise valley and the polaroid photographs are all
real SVG, not pictures.

Recommended: landscape 1920×1080 for the four backdrops, roughly square for memories.

---

## The story, section by section

| # | Section | Component |
| --- | --- | --- |
| 01 | Opening — moonlit lake, "One Moment..." | `OpeningSection.jsx` |
| 02 | The apology note on paper | `ApologyLetter.jsx` |
| 03 | Chapter one — where it went wrong (rain) | `StoryChapter.jsx` |
| 04 | The things I realized — five glass cards | `Realizations.jsx` |
| 05 | Memory gallery — polaroids | `MemoryGallery.jsx` + `MemoryModal.jsx` |
| 06 | **Memory constellation** — a heart drawn in stars | `MemoryConstellation.jsx` |
| 07 | Things I should have said | `LetterSection.jsx` |
| 08 | My promise to you | `PromiseSection.jsx` |
| 09 | A new beginning — night turns to sunrise | `NewBeginning.jsx` |
| 10 | The final question + the game | `ForgivenessGame.jsx` |
| — | The celebration | `Celebration.jsx` |
| 11 | The last words | `FinalMessage.jsx` |

### The constellation

Each memory is a star. Click one and it lights, a line traces along the curve to its
neighbour, and the memory opens. Find them all and a heart, built entirely from glowing
stars and SVG paths, completes and beats. Saying *yes* at the end lights it too.

### The "No" button

It steps aside a handful of times with a gentle message each time, then settles down and
stays perfectly clickable — no guilt, no impossible chase. It is measured against its
container on every move, so it can never leave the screen on any device.

---

## Design system

| Token | Value | |
| --- | --- | --- |
| `--navy` | `#071225` | the opening |
| `--deep` | `#101b35` | chapter one |
| `--plum` | `#241b32` | night sections |
| `--lavender` | `#80708f` | atmosphere |
| `--rose` | `#c58f9d` | accents |
| `--cream` | `#f4e8d7` | paper sections |
| `--champagne` | `#d8b477` | highlights |
| `--blush` | `#e8c5c5` | script text |

Type: **Cormorant Garamond** (headings) · **Inter** (body) · **Allura** (handwriting,
used only for short emotional accents). Tokens live in `src/styles/global.css`.

The palette walks from near-black at the top of the page to warm gold at the bottom —
the colour itself is part of the story.

---

## Performance & accessibility

* No animation libraries beyond Framer Motion; starfields, dust, rain and lantern glow
  are pure CSS keyframes, so they run off the main thread.
* The night → sunrise transition writes a single CSS variable from a motion value —
  scrolling triggers **zero React re-renders**.
* Large photographs are lazy-loaded; uploaded photos are downscaled and re-encoded.
* `prefers-reduced-motion` is honoured throughout — reveals become instant and every
  looping animation stops.
* Keyboard accessible: every star, polaroid, card and button is focusable with visible
  focus rings; modals trap escape, lock scroll and return focus.
* No horizontal overflow at any width from 320 px upward.

---

## Project structure

```
src/
  config/siteData.js       ← the only file you need to edit
  context/                 site data + story state
  lib/                     storage, deep merge, heart geometry
  components/
    scenes/                MoonlitLake, RainyNight, SunriseValley (all SVG)
    atmosphere/            StarField, Particles
    ui/                    Reveal, Modal, Polaroid, Florals, Icon, PhotoPlaceholder
    ...one component + one stylesheet per section
  admin/                   the visual editor at /admin
public/
  images/                  your photographs go here
```

---

## Deploying

`npm run build` produces a static `dist/` folder — host it anywhere (Netlify, Vercel,
GitHub Pages, any static host).

The site uses history routing for `/admin`, so add an SPA fallback that serves
`index.html` for unknown paths:

* **Netlify** — `_redirects`: `/*  /index.html  200`
* **Vercel** — `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`

If you host under a subfolder, set `base: '/your-folder/'` in `vite.config.js`.

> Note: content typed into `/admin` is saved in that browser only. To publish your
> version, download `siteData.js` from the editor and replace
> `src/config/siteData.js` before building.

# sorry-evie
