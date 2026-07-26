![Birthday Template Preview](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js) ![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-9.6-blue?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)

# 🎂 Interactive 3D Birthday Celebration Template

**Transform ordinary birthdays into extraordinary digital experiences.**

An immersive, production-ready birthday website template featuring stunning 3D graphics, cinematic animations, and personalization—all through a single configuration file. Built with modern web technologies for desktop, tablet, and mobile.



---

## ✨ Key Features

### 🎮 Interactive Elements
- **3D Cake with Candles** – Tap individual candles to blow them out
- **Realistic Confetti** – Physics-based confetti animations that respond to actions
- **Touch Gestures** – Swipe, tap, and pinch gestures optimized for mobile

### 🎬 Professional Animations
- **Parallax Scrolling** – Depth-layered animations as you scroll
- **GSAP Scroll Triggers** – Scroll-synchronized animations with timeline control
- **Framer Motion** – Smooth component transitions and entrance effects
- **Text Animations** – Letter-by-letter reveals and typewriter effects

### 💌 Personalization Hub
- **Flip Card Memories** – Interactive cards with personal photos and messages
- **Story Timeline** – 8-chapter journey through memories with custom images
- **Inspirational Quotes** – Personal or funny quotes that celebrate the person
- **Custom Sections** – Hero intro, entrance gate, grand finale all configurable

### 🎵 Immersive Experience
- **Ambient Music Player** – Background music with play/pause controls
- **Volume Control** – Adjust music without page refresh
- **Custom Audio** – Easy swap to any birthday playlist

### 📱 Fully Responsive
- **Mobile-First Design** – Optimized touch experience
- **Adaptive Layouts** – Beautiful on phones, tablets, and desktops
- **Performance Optimized** – Lazy-loaded assets and 3D culling

### ⚙️ Developer-Friendly
- **Single Config File** – All customization in `src/config/birthday.ts`
- **TypeScript** – Full type safety and IDE support
- **Production-Ready** – CI/CD with GitHub Actions included
- **Zero-Config Deployment** – Works with Vercel, GitHub Pages, or any Node.js host

---

## 🛠️ Tech Stack

| Tech | Purpose | Version |
|------|---------|---------|
| **Next.js** | React framework with server rendering | 16.2 |
| **React** | Component library | 19.2 |
| **Three.js** | 3D graphics engine | 0.185 |
| **React Three Fiber** | React renderer for Three.js | 9.6 |
| **@react-three/drei** | 3D utilities and helpers | 10.7 |
| **GSAP** | Advanced animations & scroll triggers | 3.15 |
| **Framer Motion** | React animation library | 12.42 |
| **Tailwind CSS** | Utility-first styling | 4.0 |
| **Canvas Confetti** | Confetti particle effects | 1.9 |
| **Lenis** | Smooth scroll behavior | 1.3 |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (check with `node --version`)
- **npm** or **yarn** package manager

### 1️⃣ Create Your Birthday Site

Click **[Use this template](https://github.com/VisionStack-404/Birthday-template/generate)** to create your own repository.

### 2️⃣ Clone & Install

```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Hot reload is enabled—changes save instantly.

### 4️⃣ Customize in 3 Minutes

Edit `src/config/birthday.ts`:

```typescript
// Step 1: Update names and age
const FRIEND_NAME = "Sarah";    // Birthday person
const SENDER_NAME = "Alex";     // Your name
const FRIEND_AGE = 21;          // Their age
```

**That's it!** The site auto-generates titles like "Sarah's 21st Birthday" throughout.

---

## 🎨 Customization Guide

### Configuration File Structure

All customization happens in **`src/config/birthday.ts`**:

```typescript
export const config = {
  // Basic info
  friendName: "Sarah",
  senderName: "Alex",
  friendAge: 21,
  
  // Page sections
  hero: { ... },          // Main landing page
  entrance: { ... },      // Welcome gate
  chapters: [ ... ],      // Memory timeline
  quotes: [ ... ],        // Inspirational messages
  cakeSection: { ... },   // Pre/post cake
  finaleSection: { ... }, // Grand finale
}
```

### Customizing Each Section

#### Hero Section
```typescript
hero: {
  title: "Sarah's 21st Birthday",
  subtitle: "A digital celebration",
  tagline: "Click below to enter...",
  bgImage: "/assets/hero.png"
}
```

#### Memory Chapters (Timeline)
```typescript
chapters: [
  {
    title: "Chapter 1: The Beginning",
    image: "/assets/chapter1.png",
    description: "Our first adventure together"
  },
  // ... add up to 8 chapters
]
```

#### Flip Cards (Personal Messages)
```typescript
friendshipCardsSection: {
  cards: [
    {
      front: "🎂 Best Friend",
      back: "You're the sprinkles on my cake!",
      emoji: "✨"
    },
    // ... multiple cards
  ]
}
```

#### Music & Audio
```typescript
audio: {
  backgroundMusic: "/audio/birthday.mp3",
  volume: 0.5,
  autoPlay: false
}
```

### 📁 Media Files Structure

Replace these placeholder files:

```
public/
├── assets/
│   ├── hero.png              # Main hero image (1024x1024)
│   ├── chapter1-8.png        # Memory timeline images
│   ├── cake.png              # Cake preview image
│   └── memories/             # Additional photos
└── audio/
    └── birthday.mp3          # Background music
```

**Image Recommendations:**
- Format: PNG or JPG (WebP for best compression)
- Size: 1024x1024px for memory cards, 1920x1080px for hero
- Optimization: Use [TinyPNG](https://tinypng.com) for compression

---

## 🎯 Feature Showcase

### Interactive 3D Cake
- **Click Candles** – Tap individual candles to blow them out
- **Blow All** – Double-click to extinguish all candles at once
- **Confetti Burst** – Particle effects on successful blowout
- **Realistic Lighting** – Dynamic shadows and reflections

### Memory Timeline
- **8 Chapters** – Structured story through the relationship
- **Parallax Images** – Images move independently for depth
- **Smooth Transitions** – Page sections fade/slide in on scroll
- **Mobile-Optimized** – Touch-friendly chapter navigation

### Quotes Section
- **Animated Text** – Letter-by-letter reveal effect
- **Multiple Themes** – Funny, inspirational, or heartfelt
- **Easy Customization** – Add/remove quotes in config

### Finale Experience
- **Grand Finale Animation** – Celebration sequence
- **Confetti Shower** – Full-screen particle celebration
- **Closing Message** – Personal farewell message
- **Music Crescendo** – Audio cue for the finale

---

## 📦 Building & Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository → Auto-deploys on every push
4. Done! Your site is live globally with CDN caching

### Deploy to GitHub Pages

Pre-configured with GitHub Actions:

1. Go to repo **Settings → Pages**
2. Select **GitHub Actions** as source
3. Push changes—auto-deploys to `https://<username>.github.io/<repo-name>`

### Deploy to Traditional Hosting

```bash
npm run build
npm start  # Runs on port 3000
```

Deploy the `.next` directory to any Node.js host (Heroku, Railway, etc.).

---

## 📊 Project Structure

```
Birthday-template/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Main entry point
│   ├── components/
│   │   ├── Hero.tsx          # Landing section
│   │   ├── Cake3D.tsx        # Interactive 3D cake
│   │   ├── MemoryCards.tsx   # Flip cards component
│   │   ├── Timeline.tsx      # Memory chapters
│   │   ├── Quotes.tsx        # Quotes section
│   │   ├── MusicPlayer.tsx   # Audio controls
│   │   └── Finale.tsx        # Grand finale
│   ├── config/
│   │   └── birthday.ts       # ⭐ Central configuration
│   ├── styles/
│   │   └── globals.css       # Global styles
│   └── utils/
│       ├── animations.ts     # GSAP configurations
│       └── helpers.ts        # Utility functions
├── public/
│   ├── assets/               # Images & media
│   │   └── *.png
│   └── audio/
│       └── birthday.mp3
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 📖 Available Commands

```bash
# Development
npm run dev           # Start dev server with hot reload (localhost:3000)

# Production
npm run build         # Build optimized production bundle
npm run start         # Run production server locally

# Code Quality
npm run lint          # Check for ESLint violations
npm run lint:fix      # Auto-fix linting issues

# Deployment
npm run export        # Export static site (if needed)
```

---

## 🎯 Best Practices

### Performance
- ✅ Use WebP images for 30% smaller files
- ✅ Keep background music under 3MB
- ✅ Compress images: max 1024x1024px for thumbnails
- ✅ Test on mobile at 3G speeds

### Customization
- ✅ Keep copy concise (under 100 chars per section)
- ✅ Use high-quality photos (sharp and well-lit)
- ✅ Match theme colors for cohesive design
- ✅ Test across devices before sharing

### Accessibility
- ✅ Add alt text to all images
- ✅ Ensure sufficient color contrast
- ✅ Include keyboard navigation
- ✅ Provide music toggle option

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Build Fails with Memory Error
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Images Not Loading
- Check file paths in `birthday.ts` match `public/assets/` exactly
- Ensure file extensions are lowercase (`.png`, not `.PNG`)
- Verify image files exist in the directory

### Confetti Not Showing
- Check browser console for errors (F12)
- Verify `canvas-confetti` is installed: `npm list canvas-confetti`
- Ensure browser allows canvas rendering

---

## 🤝 Contributing

Found a bug or have an idea? Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request with description

---

## 📄 License

This project is open source under the **MIT License**. See [LICENSE](LICENSE) file for details.

You're free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ❌ Hold liable

---

## 💡 Support & Community

### Get Help
- 🐛 **Bug Reports** – [Open an issue](https://github.com/VisionStack-404/Birthday-template/issues)
- 💬 **Questions** – [Start a discussion](https://github.com/VisionStack-404/Birthday-template/discussions)
- ⭐ **Like it?** – Star the repo to show support!

### Showcase Your Birthday
Share your celebration at #BirthdayTemplate on social media!

---

## 🚀 Roadmap

### Planned Features
- [ ] Multi-language support (i18n)
- [ ] Photo gallery lightbox
- [ ] Video message integration
- [ ] Guest book / comment section
- [ ] Custom color themes
- [ ] Social media sharing buttons
- [ ] Analytics tracking

---

**Made with ❤️ by [VisionStack-404](https://github.com/VisionStack-404)**

Transform birthdays. Celebrate digitally. Create memories.
