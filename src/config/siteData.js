/* ============================================================================
 *  siteData.js — THE ONLY FILE YOU NEED TO EDIT
 * ----------------------------------------------------------------------------
 *  Every word, name, date, photo and message on the website comes from here.
 *  Change the strings below and the whole experience becomes yours.
 *
 *  Photos:
 *    • Drop your images into  public/images/  and reference them as
 *      "/images/your-photo.jpg"
 *    • Leave a photo empty ("") and a hand-drawn cinematic illustration is
 *      used instead, so the site always looks finished.
 *    • Or open  /admin  in the browser to upload photos and edit text visually.
 * ==========================================================================*/

const siteData = {
  /* ---------------------------------------------------------------- basics */
  personName: 'Evie',
  senderName: 'Me',
  brand: 'Evie',
  date: '11 November 2026',

  /* -------------------------------------------------------------- gallery */
  // Background photographs. Empty string = use the built-in illustrated scene.
  images: {
    hero: '',      // section 1 — moonlit lake
    apology: '',   // section 2 — the polaroid pinned to the letter
    chapter: '',   // section 3 — the rainy window
    sunrise: '',   // section 9 & 11 — the sunrise path
  },

  /* ------------------------------------------------------- 1. the opening */
  hero: {
    eyebrow: 'If I could turn back',
    title: 'One Moment...',
    subtitle: "I should not talked like that but I got more jealous",
    script: "I'm sorry.",
    body: [
      'Not just for what happened,',
      'but for how it made you feel.',
    ],
    bodyStrong: 'I never Leave you.',
    cta: 'Enter',
    scrollHint: 'Scroll',
  },

  /* -------------------------------------------------------- 2. the letter */
  letter: {
    note: [
      "This isn't just a website.",
      "It's my heart, laid bare.",
      'I hope you can feel',
      'how truly sorry I am.',
    ],
    noteSign: 'Yours, always.',
    polaroidCaption: 'You. Always.',
    label: 'This is my apology',
    heading: ["I don't know if words", 'can fix everything.'],
    sub: 'But I want to try.',
    script: 'So this is for you.',
    checklist: [
      'Read at your own pace',
      'Explore our memories',
      "Feel what's in my heart",
      "Know that I'm serious",
    ],
    footnote: 'Take your time...',
  },

  /* ------------------------------------------------------- 3. chapter one */
  chapter: {
    label: 'Chapter 01',
    heading: 'Where it went wrong',
    sub: 'The moment I wish I could rewrite.',
    lines: [
      "I said things I shouldn't have.",
      'I did things I wish I could take back.',
      'And somewhere between those moments...',
    ],
    strong: 'I hurt someone who never deserved it.',
    cta: 'Read more',
    expanded:
      "I keep replaying it. The pause before I spoke. The second where I could have chosen kindness and chose to be right instead. I can't unsay it — but I can promise you it taught me something I will not forget.",
  },

  /* ---------------------------------------------- 4. the things I realized */
  realizations: {
    label: 'The things I realized',
    script: 'I see it now...',
    items: [
      {
        icon: 'ear',
        title: 'I should have listened.',
        detail:
          'I was listening to respond, instead of listening to understand. You were telling me something important and I was already writing my reply.',
      },
      {
        icon: 'heart',
        title: 'I should have understood.',
        detail:
          "You weren't asking me to fix anything. You were asking me to stand next to you while it was hard.",
      },
      {
        icon: 'clock',
        title: 'I should have been there.',
        detail:
          'There was a moment you needed me and I made you wait for it. You should never have to wait for me.',
      },
      {
        icon: 'message',
        title: 'I should have chosen my words better.',
        detail:
          'Words are the one thing I can never take back. I used them carelessly with the person I care about most.',
      },
      {
        icon: 'star',
        title: 'I should have realized sooner.',
        detail:
          "You gave me every quiet signal, and I only understood after it hurt. I'm sorry it took me this long to see it.",
      },
    ],
  },

  /* ------------------------------------------------------ 5. the memories */
  memoriesSection: {
    label: 'Chapter 02',
    heading: 'Before the mistake',
    sub: 'But then I remembered something...',
    body: ['How many beautiful moments', "we've had."],
    script: 'You made every moment special',
    cta: 'View memories',
  },

  // Used by BOTH the polaroid gallery and the star constellation.
  memories : [
  {
    title: 'Our first day in love',
    date: 'July 2026',
    image: '',
    caption: 'The day my heart found you',
    message:
      "I still remember the day everything started. I didn't know you would become such a big part of my life. Since that day, you have been in my every thought, my every prayer, and my every dream. If I could live that day again, I would choose you all over again."
  },
  {
    title: 'Late night talks',
    date: 'August 2026',
    image: '',
    caption: 'My favourite voice',
    message:
      "Some nights, all I need is to hear your voice. Even when we have nothing to talk about, I never get tired of you. I wish I could hold you close instead of saying goodnight through a screen. Until that day comes, I will keep waiting for every little moment with you."
  },
  {
    title: 'Just us',
    date: 'September 2026',
    image: '',
    caption: 'My favourite place is you',
    message:
      "I don't need someone in my life, I just need you. I dream about the simple things we will do together, laughing, eating, walking, and doing nothing at all. One day, these dreams will become our everyday life. And I promise to enjoy every second of it."
  },
  {
    title: 'The long walk',
    date: '03 March 2026',
    image: '',
    caption: 'Every road leads to you',
    message:
      "Sometimes I close my eyes and imagine walking beside you, holding your hand and forgetting about everything else. I don't know how many steps it will take to reach all our dreams, but I know one thing: I want to walk every one of them with you. I am not going anywhere."
  },
  {
    title: 'Sunrise',
    date: 'October 2026',
    image: '',
    caption: 'A forever kind of love',
    message:
      "Every sunrise reminds me that we have another day to love each other. I don't know exactly what the future holds, but I know who I want beside me in it. I want to see your smile every morning, hold your hand when you are scared, and remind you that you are never alone. No matter how hard life gets, my heart will keep choosing you. I promise, I am here to stay. I never want a life where I have to stop loving you."
  },
  {
    title: 'The bad day',
    date: 'November 2026',
    image: '',
    caption: 'Even on the hardest days',
    message:
      "I know we won't have perfect days all the time. There will be tears, misunderstandings, silence, and moments when life feels difficult. But please remember this: I will never leave you just because things get hard. I want to understand you, listen to you, and hold on to us. You don't have to be happy every day to be loved by me."
  },
  {
  title: 'Many more months to go',
  date: 'Forever starts here',
  image: '',
  caption: 'Every day, every minute, always you',
  message:
    "We still have so many days, months, and years waiting for us. And I want every single one of them with you. Every morning, every night, every minute, even on the days when life feels hard, I will be right here with you. I know things won't always be easy, but I promise I will never give up on us. Whatever happens, I will do my best to fix things, understand you, make you smile, and give you all the love you deserve. I may not be perfect, and I may not have all the answers, but I will always try for you. I don't want to be with you only when life is beautiful. I want to be with you through every storm too. No matter how difficult things get, I will keep choosing you. Today, tomorrow, and every day after that. I am not leaving, my love. We have so many beautiful memories still waiting to be made. ❤️"
}
  
],

  /* -------------------------------------------------- 6. the constellation */
  constellation: {
    label: "The moments I don't want to lose",
    heading: 'Memory Constellation',
    sub: 'Click on a star to see a memory...',
    complete: 'Every one of them still lights up.',
  },

  /* ------------------------------------------ 7. things I should have said */
  saidLetter: {
    label: 'The letter',
    heading: 'Things I should have said.',
    lines: [
      'You mattered.',
      'Your feelings mattered.',
      'I should have stopped talking like that',
      'I should have understood.',
      'I should have apologized sooner.',
    ],
    closing: "And I'm truly sorry.",
    signature: 'Always...',
  },

  /* ------------------------------------------------------- 8. the promises */
  promiseSection: {
    label: 'Chapter 03',
    heading: 'My Promise to You',
    sub: ["I can't change the past,", 'but I can change the future.'],
    script: 'Always yours',
    cta: 'See my promises',
  },

  promises: [
    { icon: 'ear', title: 'Listen', message: "I'll listen before I react." },
    { icon: 'heart', title: 'Understand', message: "I'll understand before I judge." },
    { icon: 'message', title: 'Communicate', message: "I'll communicate instead of staying silent." },
    { icon: 'shield', title: 'Be there', message: "I'll be there when things aren't easy." },
  ],

  /* --------------------------------------------------- 9. a new beginning */
  newBeginning: {
    label: 'Chapter 04',
    heading: "Maybe we can't go back.",
    sub: 'But we can move forward.',
    script: 'Together.',
    cta: "Let's begin",
  },

  /* ------------------------------------------------ 10. the final question */
  forgiveness: {
    label: 'The final question',
    question: 'My Babeee, Please forgive me?',
    sub: 'It means the world to me.',
    yes: 'Yes',
    no: 'No',
    hint: 'Click me...',
    aside: ['Even if you say no,', "I'll still be here.", 'Because you mean everything.'],
    // Shown one after another as the "No" button keeps escaping.
    noMessages: [
      'Are you sure?',
      'Maybe think about it one more time...',
      "I'll wait... but I'm still hoping.",
      'Okay... I can be patient.',
      'Take your time. Really.',
      "I understand. I'll be right here whenever you're ready.",
    ],
  },

  celebration: {
    lines: ['Thank you.', "I'll never take your forgiveness for granted.", "Let's make better memories."],
    button: 'Keep reading',
  },

  /* ------------------------------------------------- 11. the final message */
  final: {
    heading: 'Thank you...',
    sub: 'for hearing me.',
    lines: ['Maybe this isn’t the end of our story.', 'Maybe it’s simply the beginning', 'of a better chapter.'],
    script: "Let's write it better.",
  },

  /* ------------------------------------------------------------- footer */
  footer: {
    text: ['Written with a little regret,', 'a lot of sincerity,', 'and hope for a better tomorrow.'],
    small: 'Somewhere under the same sky.',
    socials: [
      { icon: 'instagram', url: '' },
      { icon: 'mail', url: '' },
      { icon: 'music', url: '' },
    ],
  },

  /* ------------------------------------------------------------ navigation */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'memories', label: 'Memories' },
    { id: 'apology', label: 'My Apology' },
    { id: 'promises', label: 'Promises' },
    { id: 'beginning', label: 'New Beginning' },
  ],
}

export default siteData
