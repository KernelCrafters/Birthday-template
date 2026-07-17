# ✨ 3D Cinematic & Interactive Birthday Celebration Template 🎂

> **Turn any birthday into a breathtaking, cinematic 3D web experience.**  
> Built with **Next.js 16**, **React Three Fiber (Three.js)**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🌟 Features

- 👑 **Interactive 3D Birthday Cake**: Tap candles individually or hit the button to blow them all out at once with realistic confetti blasts!
- 🎬 **Cinematic GSAP Animations**: Smooth text split animations, parallax floating elements, and scroll-triggered story chapters.
- 💌 **Interactive Touch/Click Flip Cards**: Reveal personal memories and heartfelt notes on tap.
- 🎵 **Built-in Ambient Music Player**: Plays celebratory background audio (`public/audio/birthday.mp3`) seamlessly.
- ⚡ **100% Responsive & Touch-Optimized**: Designed to look and feel buttery smooth on both mobile devices and desktop screens.
- 🛠️ **One-File Customization (`src/config/birthday.ts`)**: Update names, age, quotes, chapters, images, and wishes in **one single file** without touching complex component code!

---

## 🚀 Quick Start (Use as Template)

### 1. Create your own repository
Click the green **[Use this template](https://github.com/)** button at the top right of this repository on GitHub to generate a new repository with this codebase.

### 2. Clone locally and install dependencies
```bash
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to preview your birthday website!

---

## 🎨 How to Customize (In 5 Minutes!)

Everything you need to customize is cleanly organized inside `src/config/birthday.ts`. You **do not** need to edit `page.tsx` or any 3D component files unless you want to change the layout!

### 1️⃣ Update `src/config/birthday.ts`
Open `src/config/birthday.ts` and look right at the top of the file! You only need to change three lines to personalize the entire website instantly:
```ts
const FRIEND_NAME = "Sarah"; // 👉 Change to your friend's real name!
const SENDER_NAME = "Alex";  // 👉 Change to your name!
const FRIEND_AGE = 21;       // 👉 Change to their exact age (e.g., 18, 21, 25, 30)!
```
Every title, badge, chapter, age number, and birthday wish across the entire 3D cake, story timeline, and finale will automatically format to match their name and age (`21st BIRTHDAY`, `CELEBRATING 21 MAGICAL YEARS`, `Welcome to age 21`, etc.)!

You can also scroll down in `src/config/birthday.ts` to customize:
- **`hero`**: Customize the main title and tagline.
- **`entrance`**: Customize the welcome gate button text and subtitle.
- **`chapters`**: Edit the story chapters, memory paragraphs, and image paths.
- **`friendshipCardsSection`**: Add or modify the flip cards with your personal memories.
- **`quotesSection`**: Put your favorite emotional or funny quotes.
- **`cakeSection`**: Customize what happens before and after blowing out the candles.
- **`finaleSection`**: Customize the grand finale title and sign-off message.

### 2️⃣ Replace Images & Audio (`public/assets/` & `public/audio/`)
Place your custom photos inside `public/assets/` and reference them in `src/config/birthday.ts`:
- `public/assets/hero.png` (Main hero gift/illustration)
- `public/assets/school.png` (Chapter 1 photo)
- `public/assets/wings.png` (Chapter 3 photo)
- `public/assets/friendship.png` (Chapter 5 photo)
- `public/assets/puppies.png` (Chapter 6 photo)
- `public/assets/book.png` (Chapter 7 photo)
- `public/assets/tree.png` (Chapter 8 photo)
- `public/assets/cake.png` (Cake preview/illustration)

To change the background music, simply replace `public/audio/birthday.mp3` with your own favorite MP3 file!

---

## 📦 Building & Testing for Production

Before deploying, verify that your site builds without errors:
```bash
npm run build
```
This checks all TypeScript definitions and generates an optimized production build.

---

## 🌐 Free & Easy Deployment

### Option A: Deploy to GitHub Pages (Automated via GitHub Actions)
This template comes pre-configured with a `.github/workflows/deploy.yml` workflow!
1. Go to your GitHub repository **Settings** -> **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Customize birthday experience"
   git push origin main
   ```
4. GitHub Actions will automatically build and publish your website! Your site will be live at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`.

### Option B: Deploy to Vercel (1-Click)
1. Go to [https://vercel.com](https://vercel.com) and import your GitHub repository.
2. Click **Deploy**. Vercel will automatically detect Next.js and host it globally with zero configuration!

---

## 🛠️ Tech Stack & License
- **Framework**: Next.js 16 (React 19, TypeScript)
- **3D / Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`, Canvas Confetti
- **Animations**: GSAP, Framer Motion, Lenis Smooth Scroll
- **Styling**: Tailwind CSS v4, Glassmorphism UI

---
*Made with ❤️ using the 3D Interactive Birthday Template.*
