import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const testimonials = [
  {
    quote:
      'Dragus turned our telecom chaos into a 90-day rollout with zero downtime.',
    author: 'R. Kowalski',
    role: 'IT Director',
  },
  {
    quote:
      'They integrated three legacy systems without breaking our workflows.',
    author: 'D. Reyes',
    role: 'Operations Lead',
  },
  {
    quote: 'Finally, an AI pilot that actually made it to production.',
    author: 'T. Barnes',
    role: 'Product VP',
  },
];

export default function TestimonialsSection({ className = '' }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current],
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      if (cardsRef.current[0]) {
        scrollTl.fromTo(
          cardsRef.current[0],
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.05
        );
      }

      if (cardsRef.current[1]) {
        scrollTl.fromTo(
          cardsRef.current[1],
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.08
        );
      }

      if (cardsRef.current[2]) {
        scrollTl.fromTo(
          cardsRef.current[2],
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.11
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // Exit
      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, ...cardsRef.current.filter(Boolean), ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-5vh', ease: 'power2.in' },
        0.7
      );
    });

    // Mobile: flowing
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0.6 },
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
        [labelRef.current, headlineRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: true,
              },
            }
          );
        }
      });

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
      id="results"
      className={`relative bg-[#070A12] min-h-screen lg:h-screen lg:section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <img
          src="/images/testimonials-server.jpg"
          alt="Server room"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.65)]" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen lg:h-full flex flex-col items-center px-6 lg:px-[6vw] py-20 lg:py-[12vh]">
        {/* Label */}
        <div ref={labelRef} className="mb-3 lg:mb-4" style={{ opacity: 0 }}>
          <span className="label-mono">Results</span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="w-full max-w-[1000px] text-center text-[clamp(24px,6vw,56px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-8 lg:mb-10"
          style={{ opacity: 0 }}
        >
          Trusted by teams who run tight ships.
        </h2>

        {/* Testimonial Cards - compact */}
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card rounded-[22px] p-4 lg:p-6 flex flex-col"
              style={{ opacity: 0 }}
            >
              {/* Quote icon */}
              <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-[#2D6BFF] mb-2 lg:mb-3 opacity-60" />

              {/* Quote text */}
              <p className="text-sm lg:text-lg text-white leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="mt-3 lg:mt-4 pt-2 lg:pt-3 border-t border-[rgba(167,177,200,0.18)]">
                <p className="font-mono text-xs lg:text-sm font-medium text-white">
                  {testimonial.author}
                </p>
                <p className="text-xs lg:text-sm text-[#A7B1C8]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-6 lg:mt-8" style={{ opacity: 0 }}>
          <a href="#contact" className="btn-secondary flex items-center gap-2">
            Read the case studies
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
