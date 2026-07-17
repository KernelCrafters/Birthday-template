'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), { ssr: false });
const CakeInteraction = dynamic(() => import('@/components/CakeInteraction'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/* ─── Reusable Split Helpers (Direct color & neon shadow for 100% visibility & exact mobile sizing) ─── */
const splitChars = (text: string, colorClass = 'text-[#FFE5B4]') =>
  text.split('').map((c, i) => (
    <span
      key={i}
      className={`inline-block font-black ${colorClass}`}
      style={{ textShadow: '0 0 20px rgba(255,229,180,0.35)' }}
    >
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));

const splitWords = (text: string) =>
  text.split(' ').map((w, i) => (
    <span key={i} className="stagger-word inline-block mr-[0.22em]">{w}</span>
  ));

/* Finale letters get staggered CSS animation delays + neon glow */
const finaleChars = (text: string, colorClass = 'text-[#FFD700]', glowColor = 'rgba(255,215,0,0.4)') =>
  text.split('').map((c, i) => (
    <span
      key={i}
      className={`finale-letter inline-block font-black ${colorClass}`}
      style={{
        animationDelay: `${i * 0.04}s`,
        textShadow: `0 0 20px ${glowColor}, 0 0 45px ${glowColor}`
      }}
    >
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) return;

    const ctx = gsap.context(() => {
      /* ─── HERO ANIMATION ─── */
      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .fromTo('.hero-line-1 span', { opacity: 0, y: 40, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.4)' })
        .fromTo('.hero-line-2 span', { opacity: 0, y: 40, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.04, ease: 'back.out(1.7)' }, '-=0.3')
        .fromTo('.hero-tagline', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-image', { opacity: 0, scale: 0.8, y: 35 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');

      /* ─── SECTION REVEALS ─── */
      document.querySelectorAll('.section-reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
        });
      });

      /* ─── IMAGE CINEMATIC ENTRANCE ─── */
      document.querySelectorAll('.cinema-img').forEach(el => {
        gsap.fromTo(el, { opacity: 0, scale: 0.8, y: 40, rotateY: 5 }, {
          opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
        });
      });

      /* ─── PARALLAX IMAGES ─── */
      document.querySelectorAll('.parallax-float').forEach(el => {
        gsap.to(el, {
          y: -25, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      });

      /* ─── STAGGER WORDS ─── */
      document.querySelectorAll('.stagger-group').forEach(group => {
        gsap.fromTo(group.querySelectorAll('.stagger-word'),
          { opacity: 0, y: 20, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.07, ease: 'power2.out',
            scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      });

      /* ─── TEXT REVEALS ─── */
      document.querySelectorAll('.text-reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 30, filter: 'blur(4px)' }, {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });

      /* ─── GLASS CARDS STAGGER ─── */
      document.querySelectorAll('.card-grid').forEach(grid => {
        gsap.fromTo(grid.querySelectorAll('.glass-card'),
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      });

      /* ─── FLOATING ANIMATION ─── */
      document.querySelectorAll('.float-y').forEach((el, i) => {
        gsap.to(el, { y: '+=10', duration: 2.2 + i * 0.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });

      /* ─── FINALE (Guaranteed Intersection + Scroll fallback for mobile) ─── */
      const finaleEl = document.querySelector('.finale-section');
      if (finaleEl) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              finaleEl.classList.add('finale-visible');
            }
          });
        }, { threshold: 0.05 });
        observer.observe(finaleEl);

        const checkScroll = () => {
          const rect = finaleEl.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.95) {
            finaleEl.classList.add('finale-visible');
          }
        };
        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
      }

    }, containerRef);

    return () => ctx.revert();
  }, [entered]);

  /* ─── ENTRANCE GATE (Exact mobile text sizing & touch friendly) ─── */
  if (!entered) {
    return (
      <div className="w-full min-h-screen bg-[#060816] flex flex-col items-center justify-center gap-6 sm:gap-8 text-white overflow-hidden px-4 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="stars-layer"></div>
          <div className="stars-layer-2"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,200,220,0.12)_0%,_transparent_70%)] pointer-events-none"></div>
        
        <div className="z-10 text-center space-y-5 sm:space-y-6 max-w-xl mx-auto w-full">
          <div className="inline-block px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700] text-[11px] sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase animate-bounce">
            {BIRTHDAY_CONFIG.entrance.badgeText}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight px-2" style={{ background: 'linear-gradient(135deg, #FFD700, #FFF8E1, #F8C8DC, #E6E6FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.3))' }}>
            {BIRTHDAY_CONFIG.entrance.title}
          </h1>
          <p className="text-white/75 text-sm sm:text-lg max-w-md mx-auto leading-relaxed px-4">
            {BIRTHDAY_CONFIG.entrance.subtitle}
          </p>
          <button
            type="button"
            onClick={() => setEntered(true)}
            onTouchEnd={(e) => { e.preventDefault(); setEntered(true); }}
            className="mt-4 sm:mt-6 group relative px-8 sm:px-14 py-4 sm:py-6 rounded-full overflow-hidden cursor-pointer touch-manipulation active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(248,200,220,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] z-30 pointer-events-auto select-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8C8DC] via-[#FFD700] to-[#E6E6FA] opacity-85 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none"></div>
            <span className="relative text-sm sm:text-lg font-black tracking-widest uppercase text-[#060816] pointer-events-none">
              {BIRTHDAY_CONFIG.entrance.buttonText}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full bg-[#060816] text-white overflow-hidden overflow-x-hidden">
      {/* Particle Background */}
      <ParticleCanvas />

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO SECTION (Exact Mobile & Desktop Proportions)    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="stars-layer"></div><div className="stars-layer-2"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,200,220,0.15)_0%,_transparent_60%)] pointer-events-none"></div>
        
        <div className="z-10 text-center space-y-5 sm:space-y-6 max-w-5xl w-full">
          <div className="hero-line-1 flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#FFD700]/50 bg-[#FFD700]/15 text-[#FFD700] text-[11px] sm:text-sm font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase">
              {BIRTHDAY_CONFIG.hero.badgeText}
            </span>
          </div>

          <h1 className="hero-line-2 text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight flex flex-wrap justify-center items-center gap-0.5 sm:gap-2">
            {splitChars(BIRTHDAY_CONFIG.hero.title, "text-[#FFD700]")}
          </h1>

          <p className="hero-tagline text-sm sm:text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            {BIRTHDAY_CONFIG.hero.taglineBefore} <span className="text-[#FFD700] font-bold">{BIRTHDAY_CONFIG.hero.highlightText}</span> {BIRTHDAY_CONFIG.hero.taglineAfter}
          </p>

          <div className="hero-image float-y pt-4 sm:pt-6">
            <div className="relative inline-block">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#F8C8DC]/30 via-[#FFD700]/30 to-[#E6E6FA]/30 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.hero.heroImage} alt="Gift box" className="relative w-56 sm:w-80 md:w-96 rounded-2xl shadow-2xl shadow-pink-900/40 mx-auto" />
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint absolute bottom-4 sm:bottom-6 z-10 flex flex-col items-center gap-1.5 sm:gap-2">
          <p className="text-[10px] sm:text-xs text-white/40 tracking-[0.3em] uppercase font-semibold">{BIRTHDAY_CONFIG.hero.scrollHint}</p>
          <div className="w-4 sm:w-5 h-7 sm:h-8 border border-white/30 rounded-full flex justify-center pt-1"><div className="w-1 sm:w-1.5 h-2 bg-[#FFD700] rounded-full animate-bounce"></div></div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 1: WHERE IT ALL BEGAN                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(230,230,250,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="section-reveal space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#F8C8DC]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#F8C8DC]">{BIRTHDAY_CONFIG.chapters[0]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[0]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[0]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#E6E6FA]/25 to-[#F8C8DC]/20 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[0]?.image} alt={BIRTHDAY_CONFIG.chapters[0]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-purple-900/50 hover:shadow-[0_20px_60px_rgba(230,230,250,0.3)] transition-shadow duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 2: FRIENDSHIP CARDS (Touch Responsive)      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 z-10 relative">
          <div className="section-reveal text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#FFD700]">{BIRTHDAY_CONFIG.friendshipCardsSection.badge}</p>
              <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold">
              {splitWords(BIRTHDAY_CONFIG.friendshipCardsSection.title)}
            </h2>
            <p className="text-reveal text-white/75 text-sm sm:text-lg max-w-lg mx-auto">
              {BIRTHDAY_CONFIG.friendshipCardsSection.subtitle}
            </p>
          </div>

          <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {BIRTHDAY_CONFIG.friendshipCardsSection.cards.map((card, i) => (
              <FlipCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 3: MOTIVATION & SUPPORT                     */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,229,180,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="flex justify-center order-2 lg:order-1">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#FFD700]/20 to-[#FFE5B4]/20 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[1]?.image} alt={BIRTHDAY_CONFIG.chapters[1]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-amber-900/50 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)] transition-shadow duration-700" />
            </div>
          </div>
          <div className="section-reveal space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#FFE5B4]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#FFE5B4]">{BIRTHDAY_CONFIG.chapters[1]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[1]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[1]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 4: EMOTIONAL QUOTES                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,200,220,0.08)_0%,_transparent_50%)] pointer-events-none"></div>
        <div className="z-10 max-w-4xl mx-auto px-4 sm:px-8 space-y-12 sm:space-y-24 text-center relative">
          <div className="text-reveal">
            <blockquote className="text-lg sm:text-4xl md:text-5xl font-light text-white leading-snug italic" style={{ textShadow: '0 0 40px rgba(248,200,220,0.3)' }}>
              "{BIRTHDAY_CONFIG.quotesSection.quote1}"
            </blockquote>
          </div>
          <div className="text-reveal flex justify-center">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent"></div>
          </div>
          <div className="text-reveal">
            <blockquote className="text-base sm:text-3xl md:text-4xl font-light text-[#E6E6FA] leading-snug">
              {BIRTHDAY_CONFIG.quotesSection.quote2}
            </blockquote>
          </div>
          <div className="text-reveal flex justify-center">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#F8C8DC]/60 to-transparent"></div>
          </div>
          <div className="text-reveal">
            <blockquote className="text-base sm:text-3xl md:text-4xl font-light text-[#FFE5B4] leading-snug">
              {BIRTHDAY_CONFIG.quotesSection.quote3}
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 5: FRIENDSHIP CONSTELLATION                 */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(230,230,250,0.06)_0%,_transparent_50%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="section-reveal space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#E6E6FA]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#E6E6FA]">{BIRTHDAY_CONFIG.chapters[2]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[2]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[2]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#E6E6FA]/20 to-[#FFD700]/15 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[2]?.image} alt={BIRTHDAY_CONFIG.chapters[2]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-indigo-900/50 hover:shadow-[0_20px_60px_rgba(230,230,250,0.3)] transition-shadow duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 6: PUPPY LOVE 🐾                           */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,229,180,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="flex justify-center">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#FFE5B4]/20 to-[#F8C8DC]/20 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[3]?.image} alt={BIRTHDAY_CONFIG.chapters[3]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-orange-900/50 hover:shadow-[0_20px_60px_rgba(255,229,180,0.3)] transition-shadow duration-700" />
            </div>
          </div>
          <div className="section-reveal space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#FFE5B4]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#FFE5B4]">{BIRTHDAY_CONFIG.chapters[3]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[3]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[3]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 7: MEMORY BOOK                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="section-reveal space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#FFD700]">{BIRTHDAY_CONFIG.chapters[4]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[4]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[4]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#FFD700]/20 to-[#F8C8DC]/15 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[4]?.image} alt={BIRTHDAY_CONFIG.chapters[4]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-amber-900/50 hover:shadow-[0_20px_60px_rgba(255,215,0,0.3)] transition-shadow duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 8: TREE OF LIFE                             */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,230,250,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center z-10">
          <div className="flex justify-center">
            <div className="cinema-img float-y relative w-full max-w-[280px] sm:max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#E6E6FA]/20 to-[#FFE5B4]/20 rounded-3xl blur-3xl"></div>
              <img src={BIRTHDAY_CONFIG.chapters[5]?.image} alt={BIRTHDAY_CONFIG.chapters[5]?.imageAlt} className="relative w-full rounded-2xl shadow-2xl shadow-purple-900/50 hover:shadow-[0_20px_60px_rgba(230,230,250,0.3)] transition-shadow duration-700" />
            </div>
          </div>
          <div className="section-reveal space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#E6E6FA]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#E6E6FA]">{BIRTHDAY_CONFIG.chapters[5]?.badge}</p>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {splitWords(BIRTHDAY_CONFIG.chapters[5]?.title || "")}
            </h2>
            <div className="glass-card p-5 sm:p-8 rounded-2xl space-y-3 sm:space-y-4">
              {BIRTHDAY_CONFIG.chapters[5]?.paragraphs.map((para, i) => (
                <p key={i} className="text-reveal text-sm sm:text-lg text-white/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 9: INTERACTIVE BIRTHDAY CAKE 🎂              */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(248,200,220,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="z-10 w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center section-reveal space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-[#F8C8DC]"></div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#F8C8DC]">{BIRTHDAY_CONFIG.cakeSection.badge}</p>
              <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-[#F8C8DC]"></div>
            </div>
            <h2 className="stagger-group text-2xl sm:text-5xl md:text-6xl font-bold">
              {splitWords(BIRTHDAY_CONFIG.cakeSection.title)}
            </h2>
            <p className="text-xs sm:text-base text-white/70 max-w-md mx-auto">
              {BIRTHDAY_CONFIG.cakeSection.subtitle}
            </p>
          </div>
          <CakeInteraction />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CHAPTER 10: LANTERNS                                 */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-20 sm:py-24 overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0">
          <img src="/assets/lanterns.png" alt="Floating lanterns" className="parallax-float w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-transparent to-[#060816]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#060816]/80 via-transparent to-[#060816]/80"></div>
        </div>
        <div className="z-10 text-center space-y-8 max-w-4xl">
          <div className="section-reveal space-y-4 sm:space-y-6">
            <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.35em] text-[#FFD700]">{BIRTHDAY_CONFIG.lanternsSection.badge}</p>
            <h2 className="stagger-group text-xl sm:text-4xl md:text-5xl font-light leading-relaxed px-2">
              {splitWords(BIRTHDAY_CONFIG.lanternsSection.title)}
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* GRAND FINALE (Exact Mobile Proportions & Letters)    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="finale-section relative w-full min-h-[120vh] flex items-center justify-center py-24 sm:py-28 overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/assets/fireworks.png" alt="Fireworks" className="parallax-float w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-[#060816]/40 to-[#060816]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.1)_0%,_transparent_65%)]"></div>
        </div>

        <div className="z-10 text-center space-y-8 sm:space-y-10 max-w-5xl w-full">
          {/* Main Birthday Text - Animated letter by letter with exact mobile text sizes */}
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#FFD700] bg-[#FFD700]/15 mb-2">
              <p className="text-[10px] sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#FFD700] font-black">
                {BIRTHDAY_CONFIG.finaleSection.badge}
              </p>
            </div>

            <h1 className="text-3xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight flex flex-wrap justify-center items-center gap-0.5 sm:gap-2">
              {finaleChars(BIRTHDAY_CONFIG.finaleSection.titleLine1, "text-[#FFD700]", "rgba(255,215,0,0.5)")}
            </h1>

            <h2 className="text-2xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight flex flex-wrap justify-center items-center gap-0.5 sm:gap-2">
              {finaleChars(BIRTHDAY_CONFIG.finaleSection.titleLine2, "text-[#F8C8DC]", "rgba(248,200,220,0.4)")}
            </h2>
          </div>

          {/* Bridge text */}
          <div className="text-reveal py-3 sm:py-4">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <div className="h-px w-10 sm:w-24 bg-gradient-to-r from-transparent to-[#FFD700]/70"></div>
              <p className="text-lg sm:text-3xl font-bold text-white tracking-[0.25em] sm:tracking-[0.3em] uppercase italic">{BIRTHDAY_CONFIG.finaleSection.bridgeText}</p>
              <div className="h-px w-10 sm:w-24 bg-gradient-to-l from-transparent to-[#FFD700]/70"></div>
            </div>
          </div>

          {/* Big cinematic name */}
          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight flex flex-wrap justify-center items-center gap-0.5 sm:gap-2">
            {finaleChars(BIRTHDAY_CONFIG.finaleSection.nameText, "text-[#E6E6FA]", "rgba(230,230,250,0.5)")}
          </h2>

          {/* Sparkle Divider */}
          <div className="text-reveal flex items-center justify-center gap-3 py-4 sm:py-6">
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-white/30"></div>
            <span className="text-xl sm:text-3xl animate-bounce">✨👑✨</span>
            <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-white/30"></div>
          </div>

          {/* Wishes */}
          <div className="text-reveal max-w-2xl mx-auto space-y-4 sm:space-y-6 pt-2 px-2">
            {BIRTHDAY_CONFIG.finaleSection.wishesParagraphs.map((para, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? 'text-sm sm:text-2xl text-white font-light' : i === 1 ? 'text-sm sm:text-2xl text-white/90 font-light italic' : 'text-xs sm:text-xl text-[#FFD700] font-semibold'}`}>
                {para}
              </p>
            ))}
          </div>

          {/* Sign-off format */}
          <div className="text-reveal pt-10 sm:pt-16 space-y-6 sm:space-y-8">
            <div className="relative inline-block w-full max-w-md mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#F8C8DC]/20 via-[#FFD700]/25 to-[#E6E6FA]/20 rounded-3xl blur-xl animate-pulse-slow"></div>
              <div className="relative glass-card px-5 sm:px-12 py-6 sm:py-10 rounded-2xl text-center space-y-3 sm:space-y-4 border-2 border-[#FFD700]/50 shadow-[0_0_40px_rgba(255,215,0,0.25)]">
                <p className="text-[10px] sm:text-sm text-white/60 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">{BIRTHDAY_CONFIG.finaleSection.signOffPreText}</p>
                <div className="h-px w-16 sm:w-20 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
                
                <p className="text-lg sm:text-3xl font-extrabold text-[#FFF8E1] tracking-wider uppercase">
                  {BIRTHDAY_CONFIG.finaleSection.signOffRelationship}
                </p>
                
                <p className="text-4xl sm:text-6xl font-black tracking-wider text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] animate-bounce">
                  {BIRTHDAY_CONFIG.finaleSection.signOffName}
                </p>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-white/30 tracking-widest uppercase pt-3 sm:pt-4 font-bold">
              {BIRTHDAY_CONFIG.finaleSection.footerNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FLIP CARD COMPONENT (Mobile exact sizing & touch-friendly) ─── */
function FlipCard({ card, index }: { card: typeof BIRTHDAY_CONFIG.friendshipCardsSection.cards[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setFlipped(!flipped);
  };

  return (
    <div
      className="glass-card group cursor-pointer perspective-1000 w-full touch-manipulation transition-transform active:scale-98 z-20 pointer-events-auto select-none"
      style={{ minHeight: '220px' }}
      onClick={toggleFlip}
      onTouchEnd={toggleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d pointer-events-none ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: '220px' }}>
        {/* Front */}
        <div className="absolute inset-0 p-5 sm:p-8 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 text-center pointer-events-none" style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-4xl sm:text-5xl animate-bounce pointer-events-none" style={{ animationDelay: `${index * 0.1}s` }}>{card.emoji}</span>
          <h3 className="text-lg sm:text-2xl font-black text-white pointer-events-none">{card.title}</h3>
          <span className="px-3 sm:px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs text-[#FFD700] uppercase font-bold tracking-widest pointer-events-none">
            Tap to read ✨
          </span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 p-5 sm:p-8 rounded-2xl flex items-center justify-center bg-[#060816]/95 border border-[#FFD700]/40 pointer-events-none" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <p className="text-xs sm:text-base text-white/90 leading-relaxed text-center font-medium pointer-events-none">{card.text}</p>
        </div>
      </div>
    </div>
  );
}
