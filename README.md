# 🎂 Interactive 3D Birthday Celebration Template

**A professional, fully responsive birthday celebration website powered by Next.js and Three.js.**

Create immersive, personalized 3D birthday experiences with cinematic animations, interactive elements, and a stunning visual presentation—all configured through a single file.

---

## ✨ Key Features

- **🎂 Interactive 3D Cake** – Tap individual candles or blow them all out with realistic confetti animations
- **🎬 Cinematic Animations** – Smooth parallax effects, scroll-triggered sequences, and professional text animations powered by GSAP
- **💌 Flip Card Memories** – Interactive cards that reveal personal memories and heartfelt messages
- **🎵 Ambient Music Player** – Built-in background music that enhances the celebration atmosphere
- **📱 Fully Responsive** – Optimized for mobile, tablet, and desktop with touch gestures supported
- **⚙️ Single-File Configuration** – Customize everything via `src/config/birthday.ts` without touching component code
- **🚀 Production-Ready** – TypeScript support, optimized performance, and accessible design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework & server-side rendering |
| **React Three Fiber** | WebGL 3D graphics rendering |
| **Three.js** | 3D graphics library |
| **GSAP** | Advanced animations & scroll triggers |
| **Tailwind CSS v4** | Utility-first styling |
| **TypeScript** | Type-safe development |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### 1. Use This Template

Click the **[Use this template](https://github.com/VisionStack-404/Birthday-template/generate)** button to create your own repository from this template.

### 2. Clone & Install

```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to preview your birthday site.

---

## 🎨 Customization Guide

All customization is centralized in a single configuration file—**no coding required!**

### Step 1: Update Core Information

Edit `src/config/birthday.ts` and update these three variables at the top:

```typescript
const FRIEND_NAME = "Sarah";    // Celebrant's name
const SENDER_NAME = "Alex";     // Your name
const FRIEND_AGE = 21;          // Their age
```

The entire site automatically generates age-appropriate titles (e.g., "21st BIRTHDAY") and personalizes all text throughout.

### Step 2: Customize Sections

Scroll down in `src/config/birthday.ts` to customize:

| Section | Customize |
|---|---|
| **`hero`** | Main title, tagline, and introductory content |
| **`entrance`** | Welcome gate button text and greeting |
| **`chapters`** | Story timeline with memories and images |
| **`friendshipCardsSection`** | Flip cards with personal messages |
| **`quotesSection`** | Inspirational or funny quotes |
| **`cakeSection`** | Pre-cake and post-cake messaging |
| **`finaleSection`** | Grand finale title and closing message |

### Step 3: Add Your Media

Replace placeholder images in `public/assets/` and audio in `public/audio/`:

**Images:**
- `hero.png` – Main hero image
- `school.png` – Chapter 1 memory
- `wings.png` – Chapter 3 memory
- `friendship.png` – Chapter 5 memory
- `puppies.png` – Chapter 6 memory
- `book.png` – Chapter 7 memory
- `tree.png` – Chapter 8 memory
- `cake.png` – Cake preview

**Audio:**
- `birthday.mp3` – Background music (or replace with your choice)

---

## 📦 Building for Production

Verify your site builds without errors:

```bash
npm run build
```

This compiles TypeScript, optimizes assets, and prepares the production bundle.

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free & Automated)

This template includes pre-configured GitHub Actions CI/CD.

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Birthday experience customized"
   git push origin main
   ```
4. Your site automatically deploys to: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

### Option 2: Vercel (1-Click Deployment)

1. Visit [vercel.com](https://vercel.com) and sign in
2. Import your GitHub repository
3. Click **Deploy** – Vercel auto-detects Next.js and deploys globally
4. Your site is live with zero configuration

### Option 3: Traditional Hosting

```bash
npm run build
npm run start
```

The `.next` directory contains your production-ready application. Deploy to any Node.js-compatible hosting.

---

## 📋 Project Structure

```
Birthday-template/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── config/
│   │   └── birthday.ts         # ⭐ Central configuration file
│   └── styles/                 # Global styles
├── public/
│   ├── assets/                 # Images & media
│   └── audio/                  # Background music
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 📖 Available Scripts

```bash
npm run dev          # Start development server (hot reload enabled)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

---

## 🎯 Tips for Best Results

- **Images**: Use high-quality images (recommend 1024x1024px for optimal rendering)
- **Audio**: Keep background music under 5MB for faster loading
- **Mobile**: Test on actual devices to experience touch animations
- **Performance**: The site uses lazy loading and optimized 3D rendering for smooth performance
- **Accessibility**: The template includes semantic HTML and keyboard navigation support

---

## 🤝 Contributing

Improvements and bug reports are welcome! Please feel free to:
- Fork the repository
- Create a feature branch
- Submit pull requests with enhancements

---

## 📄 License

This project is open source and available under the MIT License. See LICENSE file for details.

---

## 💡 Support & Questions

For issues, feature requests, or questions:
- Open a GitHub Issue
- Check existing discussions
- Review the documentation above

---

**Made with ❤️ – Transform ordinary birthdays into extraordinary digital experiences.**
