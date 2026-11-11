Drop your photographs in this folder.
========================================

Suggested names (any name works — you just have to match it in the config):

  hero.jpg        the opening moonlit scene
  apology.jpg     the polaroid pinned to the apology note
  chapter.jpg     the rainy "where it went wrong" backdrop
  sunrise.jpg     the sunrise landscape near the end

  memories/memory1.jpg
  memories/memory2.jpg
  memories/memory3.jpg
  memories/memory4.jpg
  memories/memory5.jpg
  memories/memory6.jpg

Then point to them from src/config/siteData.js:

  images: {
    hero: '/images/hero.jpg',
    apology: '/images/apology.jpg',
    chapter: '/images/chapter.jpg',
    sunrise: '/images/sunrise.jpg',
  },

  memories: [
    { title: 'Our first trip', date: '12 Aug 2025', image: '/images/memories/memory1.jpg', ... },
  ]

Or just open  /admin  in the browser and upload them there — no code needed.

Leaving an image empty is completely fine: the site draws its own
illustrated scene instead, and still looks finished.

Tips
----
* Landscape 1920x1080 (or larger) for the four backdrops.
* Roughly square for the memory photos — they are shown as polaroids.
* Compress before uploading (squoosh.app is free) so the page stays fast.
