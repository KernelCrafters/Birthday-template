export interface FriendshipCard {
  emoji: string;
  title: string;
  text: string;
}

export interface StoryChapter {
  id: string;
  badge: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export interface BirthdayConfig {
  // 1. Basic Information
  birthdayPerson: {
    name: string;
    nickname: string;
    age: number;
    birthYear?: number;
  };
  sender: {
    name: string;
    relationship: string;
    signOffMessage: string;
  };

  // 2. Entrance Gate (Screen before opening the gift)
  entrance: {
    badgeText: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };

  // 3. Hero Section (First visible screen after entrance)
  hero: {
    badgeText: string;
    title: string;
    taglineBefore: string;
    highlightText: string;
    taglineAfter: string;
    scrollHint: string;
    heroImage: string;
  };

  // 4. Story Chapters (Timeline & Parallax Sections)
  chapters: StoryChapter[];

  // 5. Interactive Flip Cards (Chapter Two)
  friendshipCardsSection: {
    badge: string;
    title: string;
    subtitle: string;
    cards: FriendshipCard[];
  };

  // 6. Emotional Quotes Section
  quotesSection: {
    quote1: string;
    quote2: string;
    quote3: string;
  };

  // 7. Interactive Birthday Cake Section
  cakeSection: {
    badge: string;
    title: string;
    subtitle: string;
    tapToRevealTitle: string;
    tapToRevealSubtitle: string;
    instructionBannerTitle: string;
    instructionBannerSubtitle: string;
    celebrationTitle: string;
    celebrationSubtitle: string;
    blowAllButtonText: string;
    reLightButtonText: string;
  };

  // 8. Lanterns Section
  lanternsSection: {
    badge: string;
    title: string;
  };

  // 9. Grand Finale Section
  finaleSection: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    bridgeText: string;
    nameText: string;
    wishesParagraphs: string[];
    signOffPreText: string;
    signOffRelationship: string;
    signOffName: string;
    footerNote: string;
  };
}

/**
 * 🎂 BIRTHDAY EXPERIENCE TEMPLATE CONFIGURATION
 * -----------------------------------------------------------------------------
 * 👉 STEP 1: Replace "[Friend's Name]" below with your friend/loved one's real name!
 * 👉 STEP 2: Replace "[Your Name]" with your real name!
 * 👉 STEP 3: Replace `20` below with your friend's exact age (e.g., 18, 21, 25, 30)!
 * 
 * ✨ That's it! Every title, badge, chapter, and birthday wish across the 
 * entire website will automatically update to their exact name and age!
 * -----------------------------------------------------------------------------
 */
const FRIEND_NAME = "[Friend's Name]";
const SENDER_NAME = "[Your Name]";
const FRIEND_AGE = 20;

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  // ─── 1. BASIC INFORMATION ───
  birthdayPerson: {
    name: FRIEND_NAME,
    nickname: `${FRIEND_NAME} ✨`,
    age: FRIEND_AGE,
    birthYear: new Date().getFullYear() - FRIEND_AGE,
  },
  sender: {
    name: SENDER_NAME,
    relationship: "Your Best Friend",
    signOffMessage: `Made with pure friendship and gratitude for your ${FRIEND_AGE}th Birthday 💛`,
  },

  // ─── 2. ENTRANCE GATE ───
  entrance: {
    badgeText: "👑 A SPECIAL CELEBRATION AWAITS 👑",
    title: `Happy Birthday, ${FRIEND_NAME} ✨`,
    subtitle:
      "From 7th standard onwards — this is a cinematic journey through our lifelong friendship. Are you ready?",
    buttonText: "OPEN YOUR SPECIAL GIFT 🎁",
  },

  // ─── 3. HERO SECTION ───
  hero: {
    badgeText: "👑 LIFELONG FRIENDSHIP TRIBUTE 👑",
    title: `${FRIEND_NAME} ✨`,
    taglineBefore: "Celebrating",
    highlightText: "the most incredible friend",
    taglineAfter:
      "across the years! A tribute to our lifelong bond from 7th standard to forever.",
    scrollHint: "Scroll to explore",
    heroImage: "/assets/hero.png",
  },

  // ─── 4. STORY CHAPTERS ───
  chapters: [
    {
      id: "chapter-1",
      badge: "Chapter One",
      title: "Where It All Began",
      paragraphs: [
        `It was 7th standard. Just two kids sitting in the same classroom — no idea that a random conversation would blossom into a bond spanning all the way to your ${FRIEND_AGE}th birthday!`,
        "You weren't just a classmate. You became the person I could share everything with — my biggest dreams, my deepest worries, and even the most random 3 AM thoughts.",
      ],
      image: "/assets/school.png",
      imageAlt: "School memories",
    },
    {
      id: "chapter-3",
      badge: "Chapter Three",
      title: "You Gave Me Wings",
      paragraphs: [
        '"Build your career." "Don\'t give up." "You are capable of more than you think." — These weren\'t just words. They were fuel for my fire when everything felt difficult.',
        "You motivated me when I didn't believe in myself. You pushed me towards my goals when I wanted to quit. You didn't just support my career — you shaped it.",
      ],
      image: "/assets/wings.png",
      imageAlt: "Wings of motivation",
    },
    {
      id: "chapter-4",
      badge: "Chapter Four",
      title: "Written in the Stars",
      paragraphs: [
        "Some friendships are so rare and pure that they feel like they were destined by the universe. Ours is one of those.",
        "Like a constellation, every memory we share across the years is a glowing star — forming the most beautiful pattern in my sky.",
      ],
      image: "/assets/friendship.png",
      imageAlt: "Friendship constellation",
    },
    {
      id: "chapter-5",
      badge: "Chapter Five",
      title: "Puppy Love 🐾",
      paragraphs: [
        "Because you have the softest heart for cute dogs! These adorable fluff-balls brought flowers and balloons just to celebrate your special birthday today!",
        "Just like these puppies — you bring pure joy and unconditional warmth to everyone lucky enough to know you. 🐕✨",
      ],
      image: "/assets/puppies.png",
      imageAlt: "Cute birthday puppies",
    },
    {
      id: "chapter-6",
      badge: "Chapter Six",
      title: "Our Memory Book",
      paragraphs: [
        "If I could write a book about our friendship, it would be the most incredible book ever written. Every chapter has been filled with laughter, growth, and trust.",
        "And today, as we celebrate you, we are starting the most exciting chapters of all!",
      ],
      image: "/assets/book.png",
      imageAlt: "Memory book",
    },
    {
      id: "chapter-7",
      badge: "Chapter Seven",
      title: "Our Tree of Life",
      paragraphs: [
        "Like this magnificent golden tree, our friendship has deep roots. No storm can shake it. No distance can break it.",
        "You are the roots that keep me grounded, and the branches that inspire me to reach higher. Thank you for being my Tree of Life.",
      ],
      image: "/assets/tree.png",
      imageAlt: "Tree of Life",
    },
  ],

  // ─── 5. INTERACTIVE FLIP CARDS ───
  friendshipCardsSection: {
    badge: "Chapter Two",
    title: "Things I'll Never Forget",
    subtitle: "Tap on each card on your screen to read what you mean to me.",
    cards: [
      {
        emoji: "📚",
        title: "7th Standard",
        text: "That is where it all began. Two kids sitting in the same classroom, not knowing this would become a lifelong bond. You were the first person who truly understood me.",
      },
      {
        emoji: "💪",
        title: "My Strength",
        text: "When life hit hard, you never let me fall. You pushed me forward, reminded me of my worth, and told me you can do this — and I believed you every single time.",
      },
      {
        emoji: "🎯",
        title: "Career Builder",
        text: "You did not just support my dreams — you actively helped me build them. Every career decision, every late-night doubt, you were there with clarity and confidence.",
      },
      {
        emoji: "👂",
        title: "Daily Storyteller",
        text: "No matter how boring or silly my stories were, you always listened. You laughed at my jokes, you cried with my pain, you celebrated my small wins.",
      },
      {
        emoji: "🌟",
        title: "Believed in Me",
        text: "When the whole world doubted me, you stood firm. I believe in you — those four words from you meant more than a thousand from anyone else.",
      },
      {
        emoji: "🤝",
        title: "Always Beside Me",
        text: "Through every storm and every sunshine, you never left my side. You are not just a friend — you are family, you are home, you are my greatest blessing.",
      },
    ],
  },

  // ─── 6. EMOTIONAL QUOTES ───
  quotesSection: {
    quote1:
      "A best friend isn't someone who is just always there. It is someone who understands you more than you understand yourself.",
    quote2:
      "You listened to my daily stories — the boring ones, the exciting ones, the 3 AM ones. You never judged. You just listened.",
    quote3:
      "When nobody believed in me — you did. And that changed everything.",
  },

  // ─── 7. INTERACTIVE BIRTHDAY CAKE SECTION ───
  cakeSection: {
    badge: "Interactive Birthday Celebration",
    title: "Blow Out The Candles!",
    subtitle:
      "Make your birthday wish, blow out the candles, and watch your magical surprise light up! ✨",
    tapToRevealTitle: "TAP TO REVEAL YOUR BIRTHDAY CAKE!",
    tapToRevealSubtitle: "A special surprise is waiting for you inside ✨",
    instructionBannerTitle: "🕯️ TAP EACH CANDLE OR THE BUTTON BELOW! 🕯️",
    instructionBannerSubtitle:
      "Make your birthday wish and blow out the candles!",
    celebrationTitle: `HAPPY ${FRIEND_AGE}th BIRTHDAY ${FRIEND_NAME.toUpperCase()}!`,
    celebrationSubtitle:
      `You blew out all the candles! Welcome to age ${FRIEND_AGE} — may this new chapter bring you infinite blessings, happiness, and all your dreams fulfilled ✨`,
    blowAllButtonText: "BLOW ALL CANDLES AT ONCE",
    reLightButtonText: "Light Candles Again 🕯️",
  },

  // ─── 8. LANTERNS SECTION ───
  lanternsSection: {
    badge: "Chapter Eight",
    title:
      "May every dream ahead take flight like these lanterns into the infinite sky",
  },

  // ─── 9. GRAND FINALE SECTION ───
  finaleSection: {
    badge: `✨ CELEBRATING ${FRIEND_AGE} MAGICAL YEARS ✨`,
    titleLine1: "HAPPIEST",
    titleLine2: `${FRIEND_AGE}th BIRTHDAY`,
    bridgeText: "My Friend",
    nameText: `${FRIEND_NAME.toUpperCase()} 👑`,
    wishesParagraphs: [
      `Welcome to age ${FRIEND_AGE}! I wish you endless happiness, the wildest success, unforgettable adventures, and dreams that always come true.`,
      "May your smile always shine brighter than every star in the night sky.",
      "Thank you for being the most incredible friend anyone could ever ask for. You are truly one in a billion.",
    ],
    signOffPreText: "With all the gratitude in the world",
    signOffRelationship: "AND LAST YOUR BEST FRIEND",
    signOffName: SENDER_NAME.toUpperCase(),
    footerNote:
      `Made with pure friendship and gratitude for your ${FRIEND_AGE}th Birthday 💛`,
  },
};
