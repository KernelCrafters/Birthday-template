'use client';

import { Scroll } from '@react-three/drei';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

export default function HtmlOverlay() {
  return (
    <Scroll html style={{ width: '100%', height: '800vh' }}>
      
      {/* Page 0: Intro is handled entirely in 3D */}
      <div className="w-screen h-screen flex flex-col items-center justify-end pb-20 pointer-events-none">
        <p className="text-white/50 tracking-widest text-sm animate-pulse">
          Scroll down to discover the magic
        </p>
      </div>

      {/* Page 1: Hero Island */}
      <div className="w-screen h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
        <div className="glass-panel p-8 rounded-2xl max-w-lg pointer-events-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient">The Magical Island</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Welcome to the floating island of memories. Every detail here celebrates the beautiful journey we've shared since the 7th standard. 
          </p>
        </div>
      </div>

      {/* Page 2: Crystal Timeline */}
      <div className="w-screen h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
        <div className="glass-panel p-8 rounded-2xl max-w-lg pointer-events-auto">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Since 7th Standard...</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            From our school days to growing together, sharing thoughts, and supporting dreams. 
            We've come a long way.
          </p>
        </div>
      </div>

      {/* Page 3: Star Messages */}
      <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-light tracking-wide text-white/90">You were always there...</h2>
          <h2 className="text-3xl font-light tracking-wide text-white/90">When life became difficult...</h2>
          <h2 className="text-3xl font-light tracking-wide text-white/90">You reminded me to never give up.</h2>
        </div>
      </div>

      {/* Page 4: Crystal Heart */}
      <div className="w-screen h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
        <div className="glass-panel p-8 rounded-2xl max-w-lg pointer-events-auto">
          <h2 className="text-4xl font-bold mb-4 text-gradient">One of my Greatest Blessings</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Every heartbeat here resonates with gratitude. Thank you for every smile, every motivation, and for simply being YOU.
          </p>
        </div>
      </div>

      {/* Page 5: Dog Section */}
      <div className="w-screen h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
        <div className="glass-panel p-8 rounded-2xl max-w-lg pointer-events-auto text-right">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Puppy Love 🐾</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Because you love cute dogs! Look at them bringing flowers and balloons just for your birthday.
          </p>
        </div>
      </div>

      {/* Page 6: Memory Book */}
      <div className="w-screen h-screen flex items-center justify-center pointer-events-none">
        <div className="glass-panel p-10 rounded-2xl max-w-2xl text-center pointer-events-auto">
          <h2 className="text-4xl font-bold mb-6 text-gradient">Our Memory Book</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-4">
            Each page holds a story of Friendship, Motivation, and Dreams.
          </p>
        </div>
      </div>

      {/* Page 7: Final Message */}
      <div className="w-screen h-screen flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-gradient mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
          Happy Birthday {BIRTHDAY_CONFIG.birthdayPerson.name}
        </h1>
        <p className="text-xl text-white/80 max-w-2xl text-center leading-relaxed font-light">
          "I wish you endless happiness, success, health, beautiful memories, and dreams that always come true. May your smile always shine brighter than the stars."
        </p>
        <p className="mt-12 text-sm text-white/50 uppercase tracking-[0.3em]">
          Made with gratitude and friendship.
        </p>
      </div>

    </Scroll>
  );
}
