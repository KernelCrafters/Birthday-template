'use client';

import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

export default function CakeInteraction() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  const [cakeRevealed, setCakeRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    const rect = sectionRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...opts,
        origin: { x, y: y - 0.1 },
        particleCount: Math.floor(280 * particleRatio),
        colors: ['#F8C8DC', '#E6E6FA', '#FFE5B4', '#FFD700', '#ffffff', '#FF6B6B']
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(() => {
      confetti({ particleCount: 200, spread: 180, origin: { x: 0.5, y: 0.6 }, colors: ['#F8C8DC', '#FFD700', '#E6E6FA'] });
    }, 500);

    setTimeout(() => {
      confetti({ particleCount: 150, spread: 160, origin: { x: 0.2, y: 0.5 }, colors: ['#FFD700', '#F8C8DC'] });
      confetti({ particleCount: 150, spread: 160, origin: { x: 0.8, y: 0.5 }, colors: ['#E6E6FA', '#FFE5B4'] });
    }, 1000);
  };

  const blowCandle = (index: number) => {
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);

    if (newCandles.every(c => !c)) {
      setAllBlown(true);
      triggerConfetti();
    }
  };

  const blowAllAtOnce = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setCandlesLit([false, false, false, false, false]);
    setAllBlown(true);
    triggerConfetti();
  };

  const handleReveal = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setCakeRevealed(true);
  };

  return (
    <div ref={sectionRef} className="relative flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl mx-auto px-4 z-20">

      {/* ── STEP 1: Reveal the Cake ── */}
      {!cakeRevealed && (
        <button
          type="button"
          onClick={handleReveal}
          onTouchEnd={handleReveal}
          className="group relative cursor-pointer w-full max-w-md touch-manipulation active:scale-95 transition-transform duration-300 z-30 pointer-events-auto select-none"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#F8C8DC] via-[#FFD700] to-[#E6E6FA] rounded-2xl opacity-50 blur-xl group-hover:opacity-85 transition-all duration-700 animate-pulse-slow pointer-events-none"></div>
          <div className="relative glass-card p-6 sm:p-10 rounded-2xl text-center space-y-4 border-2 border-white/30 group-hover:border-white/60 transition-all duration-500 pointer-events-none">
            <div className="flex justify-center gap-2 pointer-events-none">
              <span className="text-4xl sm:text-5xl animate-bounce">🎂</span>
              <span className="text-4xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
              <span className="text-4xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>👑</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-wider uppercase pointer-events-none">
              {BIRTHDAY_CONFIG.cakeSection.tapToRevealTitle}
            </h3>
            <p className="text-xs sm:text-base text-[#FFD700] font-medium pointer-events-none">
              {BIRTHDAY_CONFIG.cakeSection.tapToRevealSubtitle}
            </p>
          </div>
        </button>
      )}

      {/* ── STEP 2: Show Birthday Cake + Candles ── */}
      {cakeRevealed && (
        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full animate-fade-in z-20">

          {/* Instruction Banner */}
          {!allBlown && (
            <div className="relative w-full max-w-lg pointer-events-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/40 to-[#F8C8DC]/40 rounded-2xl blur-md animate-pulse-slow"></div>
              <div className="relative glass-card p-4 sm:p-6 rounded-2xl border-2 border-[#FFD700]/50 text-center space-y-2">
                <p className="text-sm sm:text-lg font-bold text-[#FFD700] tracking-wide">
                  {BIRTHDAY_CONFIG.cakeSection.instructionBannerTitle}
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  {BIRTHDAY_CONFIG.cakeSection.instructionBannerSubtitle}
                </p>
              </div>
            </div>
          )}

          {allBlown && (
            <div className="relative w-full max-w-lg animate-fade-in pointer-events-none">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700]/60 to-[#F8C8DC]/60 rounded-2xl blur-xl animate-pulse-slow"></div>
              <div className="relative glass-card p-6 sm:p-8 rounded-2xl text-center space-y-3 border-2 border-[#FFD700]">
                <div className="flex justify-center gap-2 text-3xl sm:text-4xl">🎉 👑 🎂 ✨</div>
                <h3 className="text-xl sm:text-4xl font-black text-[#FFD700] tracking-wide">
                  {BIRTHDAY_CONFIG.cakeSection.celebrationTitle}
                </h3>
                <p className="text-xs sm:text-base text-white/90 leading-relaxed font-light">
                  {BIRTHDAY_CONFIG.cakeSection.celebrationSubtitle}
                </p>
              </div>
            </div>
          )}

          {/* The Cake & Interactive Topper Area */}
          <div className="relative my-6 sm:my-8 z-20">
            <div className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${allBlown ? 'bg-gradient-to-r from-[#FFD700]/60 via-[#F8C8DC]/60 to-[#E6E6FA]/60 scale-125 opacity-100' : 'bg-[#F8C8DC]/15 opacity-60'}`}></div>
            
            <div className="relative flex flex-col items-center pointer-events-none">
              {/* ── AFTER BLOWING CANDLES: Reveal the Magical "20" Sparkler Candle Topper! ── */}
              {allBlown && (
                <div className="absolute -top-20 sm:-top-28 z-30 flex flex-col items-center animate-bounce pointer-events-none">
                  {/* Sparkler fire effects above the 20 */}
                  <div className="flex gap-6 sm:gap-10 mb-1">
                    <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full bg-gradient-to-t from-[#FF6B00] via-[#FFD700] to-[#ffffff] animate-flame shadow-[0_0_30px_#FFD700,0_0_60px_#FF6B00,0_-15px_35px_#FFD700]"></div>
                    <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full bg-gradient-to-t from-[#FF6B00] via-[#FFD700] to-[#ffffff] animate-flame shadow-[0_0_30px_#FFD700,0_0_60px_#FF6B00,0_-15px_35px_#FFD700]" style={{ animationDelay: '0.15s' }}></div>
                  </div>

                  {/* Big Glowing 20 Number Badge */}
                  <div className="bg-gradient-to-r from-[#FFD700] via-[#FFF8E1] to-[#FFD700] text-[#060816] font-black text-3xl sm:text-5xl px-8 sm:px-12 py-3 sm:py-4 rounded-full border-4 border-white shadow-[0_0_50px_rgba(255,215,0,0.9)] flex items-center gap-3 tracking-tighter">
                    <span className="animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                    <span>{BIRTHDAY_CONFIG.birthdayPerson.age}</span>
                    <span className="animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                  </div>
                  {/* Topper Sticks going into cake */}
                  <div className="flex gap-8">
                    <div className="w-1.5 h-10 sm:h-14 bg-gradient-to-b from-[#FFD700] via-white to-transparent shadow-md"></div>
                    <div className="w-1.5 h-10 sm:h-14 bg-gradient-to-b from-[#FFD700] via-white to-transparent shadow-md"></div>
                  </div>
                </div>
              )}

              {/* Cake Image */}
              <img
                src="/assets/cake.png"
                alt={`${BIRTHDAY_CONFIG.birthdayPerson.age}th Birthday Cake`}
                className={`w-64 sm:w-80 md:w-[28rem] rounded-3xl shadow-2xl transition-all duration-1000 pointer-events-none ${allBlown ? 'shadow-[0_0_140px_rgba(255,215,0,0.7)] scale-105' : 'shadow-pink-900/40'}`}
              />

              {/* ── BEFORE BLOWING CANDLES: Show the 5 Interactive Lit Candles ── */}
              {!allBlown && (
                <div className="absolute top-[10%] sm:top-[12%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-5 sm:gap-9 md:gap-11 z-30 pointer-events-auto">
                  {candlesLit.map((lit, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => { e.preventDefault(); if (lit) blowCandle(i); }}
                      onTouchEnd={(e) => { e.preventDefault(); if (lit) blowCandle(i); }}
                      className={`group relative flex flex-col items-center justify-end p-2 sm:p-3 transition-all duration-300 touch-manipulation pointer-events-auto select-none ${lit ? 'cursor-pointer hover:scale-125 active:scale-90 -translate-y-2 sm:-translate-y-4' : 'cursor-default opacity-50'}`}
                      aria-label={`Candle ${i + 1}`}
                    >
                      {/* Flame */}
                      {lit && (
                        <div className="relative mb-1 pointer-events-none">
                          <div className="w-4 sm:w-5 h-6 sm:h-8 rounded-full bg-gradient-to-t from-[#FF6B00] via-[#FFD700] to-[#FFF8E1] animate-flame shadow-[0_0_20px_#FFD700,0_0_40px_#FF6B00,0_-10px_25px_#FFD700]"></div>
                          <div className="absolute -inset-3 rounded-full bg-[#FFD700]/30 blur-md group-hover:bg-[#FFD700]/60 transition-colors"></div>
                        </div>
                      )}
                      {!lit && (
                        <div className="relative mb-1 h-6 sm:h-8 flex items-end justify-center pointer-events-none">
                          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/20"></div>
                        </div>
                      )}
                      {/* Candle stick */}
                      <div className={`w-3 sm:w-4 h-10 sm:h-14 rounded-md transition-all duration-500 shadow-md border border-white/20 pointer-events-none ${lit ? 'bg-gradient-to-b from-[#FFF8E1] via-[#F8C8DC] to-[#E6B3C8]' : 'bg-white/20'}`}></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile-Friendly Blow Button + Counter */}
          {!allBlown && (
            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-sm mt-2 sm:mt-4 z-30 pointer-events-auto">
              <button
                type="button"
                onClick={blowAllAtOnce}
                onTouchEnd={blowAllAtOnce}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFE5B4] to-[#F8C8DC] text-[#060816] font-black text-sm sm:text-lg uppercase tracking-wider shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] active:scale-95 transition-all duration-300 cursor-pointer touch-manipulation flex items-center justify-center gap-2 pointer-events-auto select-none z-30"
              >
                <span className="pointer-events-none">{BIRTHDAY_CONFIG.cakeSection.blowAllButtonText}</span>
                <span className="pointer-events-none">💨</span>
              </button>
              <p className="text-[11px] sm:text-sm text-white/60 tracking-widest uppercase font-semibold pointer-events-none">
                {candlesLit.filter(c => c).length} candle{candlesLit.filter(c => c).length !== 1 ? 's' : ''} remaining
              </p>
            </div>
          )}

          {allBlown && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setCandlesLit([true, true, true, true, true]);
                setAllBlown(false);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setCandlesLit([true, true, true, true, true]);
                setAllBlown(false);
              }}
              className="mt-4 sm:mt-6 py-3 px-8 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer touch-manipulation shadow-lg z-30 pointer-events-auto select-none"
            >
              {BIRTHDAY_CONFIG.cakeSection.reLightButtonText}
            </button>
          )}

        </div>
      )}
    </div>
  );
}
