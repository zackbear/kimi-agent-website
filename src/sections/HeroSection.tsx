import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.8'
      );

      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        tl.fromTo(
          headlineWords,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 0.9 },
          '-=0.5'
        );
      }

      tl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.7 },
        '-=0.4'
      );

      tl.fromTo(
        cardRef.current,
        { x: '12vw', opacity: 0, rotateY: 8 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.9 },
        '-=0.8'
      );

      const cardLines = cardRef.current?.querySelectorAll('.card-line');
      if (cardLines) {
        tl.fromTo(
          cardLines,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.6 },
          '-=0.5'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation - desktop only
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only apply pinned scroll on desktop
    const mm = gsap.matchMedia();
    
    mm.add('(min-width: 1024px)', () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        glowRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    });

    return () => mm.revert();
  }, []);

  const headlineText = 'Engineering the next layer of business infrastructure.';
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative bg-[#070A12] min-h-screen lg:h-screen lg:section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero-control-room.jpg"
          alt="Control room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.65)]" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Accent glow - desktop only */}
      <div
        ref={glowRef}
        className="absolute left-[6vw] top-[15vh] w-[44vw] h-[40vh] glow-accent pointer-events-none hidden lg:block"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen lg:h-full flex flex-col">
        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:flex-row items-start justify-between px-6 lg:px-[6vw] pt-24 lg:pt-[18vh] pb-8 lg:pb-[10vh] gap-8 lg:gap-12">
          
          {/* Left content column */}
          <div className="flex flex-col gap-5 lg:gap-8 w-full lg:w-[46vw] lg:max-w-[700px]">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-[clamp(28px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
            >
              {words.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base lg:text-xl text-[#A7B1C8] leading-relaxed max-w-[550px]"
              style={{ opacity: 0 }}
            >
              Telecommunications, AI systems, and integration. Built to run quietly,
              scale confidently.
            </p>

            {/* CTA row */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4"
              style={{ opacity: 0 }}
            >
              <a href="#contact" className="btn-primary flex items-center gap-2">
                Book a discovery call
                <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="flex items-center gap-1 text-[#A7B1C8] hover:text-white transition-colors"
              >
                Explore services
                <ChevronRight size={18} />
              </a>
            </div>
          </div>

          {/* Right floating card */}
          <div
            ref={cardRef}
            className="w-full lg:w-[34vw] lg:max-w-[480px] glass-card rounded-[22px] p-5 lg:p-8"
            style={{ opacity: 0, perspective: '1000px' }}
          >
            <h3 className="card-line text-lg lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
              Systems that stay ahead
            </h3>
            <div className="w-full h-[2px] bg-[rgba(45,107,255,0.7)] mb-4 lg:mb-6" />
            <ul className="space-y-2 lg:space-y-4">
              <li className="card-line flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6BFF] mt-1.5 flex-shrink-0" />
                <span className="text-[#A7B1C8] text-sm lg:text-base">
                  Audit → Roadmap → Implementation
                </span>
              </li>
              <li className="card-line flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6BFF] mt-1.5 flex-shrink-0" />
                <span className="text-[#A7B1C8] text-sm lg:text-base">Uptime-first architecture</span>
              </li>
              <li className="card-line flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6BFF] mt-1.5 flex-shrink-0" />
                <span className="text-[#A7B1C8] text-sm lg:text-base">Security by design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row - caption and link */}
        <div className="px-6 lg:px-[6vw] pb-6 lg:pb-[6vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#A7B1C8]">
            Dragus Enterprises | Infrastructure Consulting
          </p>
          <a
            href="#services"
            className="flex items-center gap-2 text-[#A7B1C8] hover:text-[#2D6BFF] transition-colors text-sm"
          >
            View selected work
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
