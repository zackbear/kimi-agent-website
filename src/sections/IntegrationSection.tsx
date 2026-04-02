import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface IntegrationSectionProps {
  className?: string;
}

export default function IntegrationSection({ className = '' }: IntegrationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Desktop: pinned
    mm.add('(min-width: 1024px)', () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.12, opacity: 0.5 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '18vh', opacity: 0, rotateX: 22 },
        { y: 0, opacity: 1, rotateX: 0, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(
        ctaRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // Exit
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    });

    // Mobile: flowing
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        subheadlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: subheadlineRef.current,
            start: 'top 90%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="integration"
      className={`relative bg-[#070A12] min-h-screen lg:h-screen lg:section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
        <img
          src="/images/integration-skyline.jpg"
          alt="City skyline"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.6)]" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 w-full min-h-screen lg:h-full flex flex-col items-center justify-center px-6 lg:px-[6vw] py-20 lg:py-[15vh]"
      >
        {/* Label */}
        <div ref={labelRef} className="mb-4 lg:mb-6" style={{ opacity: 0 }}>
          <span className="label-mono">Integration</span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="w-full max-w-[1000px] text-center text-[clamp(28px,8vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-4 lg:mb-6"
          style={{ opacity: 0, perspective: '1000px' }}
        >
          Seamless integration, superior performance.
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="w-full max-w-[750px] text-center text-base lg:text-xl text-[#A7B1C8] leading-relaxed mb-8 lg:mb-10"
          style={{ opacity: 0 }}
        >
          We map your environment, remove friction, and ship integrations that
          don't wake the on-call team.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a href="#contact" className="btn-primary flex items-center gap-2">
            Request an integration audit
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
