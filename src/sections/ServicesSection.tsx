import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Brain, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const services = [
  {
    icon: Phone,
    title: 'Telecommunications',
    description:
      'Design, procurement, and lifecycle management of voice, data, and unified comms.',
  },
  {
    icon: Brain,
    title: 'AI Development',
    description:
      'Intelligent automation, predictive models, and AI-augmented workflows.',
  },
  {
    icon: Network,
    title: 'System Integration',
    description:
      'Connect legacy and modern platforms with secure, observable pipelines.',
  },
];

export default function ServicesSection({ className = '' }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Desktop: pinned with scroll animation
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
        { scale: 1.1, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { y: '60vh', opacity: 0, rotateX: 18 },
            { y: 0, opacity: 1, rotateX: 0, ease: 'power2.out' },
            0.05 + i * 0.06
          );
        }
      });

      scrollTl.fromTo(
        ctaRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // Exit
      scrollTl.fromTo(
        [labelRef.current, ...cardsRef.current.filter(Boolean), ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-4vh', ease: 'power2.in' },
        0.7
      );
    });

    // Mobile/Tablet: flowing with reveal animation
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
      id="services"
      className={`relative bg-[#070A12] min-h-screen lg:h-screen lg:section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <img
          src="/images/services-city-tech.jpg"
          alt="City technology"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[rgba(7,10,18,0.55)]" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen lg:h-full flex flex-col px-6 lg:px-[6vw] py-20 lg:py-[12vh]">
        {/* Label */}
        <div ref={labelRef} className="mb-6 lg:mb-8" style={{ opacity: 0 }}>
          <span className="label-mono">Services</span>
        </div>

        {/* Cards grid - compact on mobile */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center lg:items-start">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card rounded-[22px] p-4 lg:p-6 flex flex-col"
              style={{ opacity: 0, perspective: '1000px' }}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[rgba(45,107,255,0.15)] flex items-center justify-center mb-3 lg:mb-4">
                <service.icon className="w-5 h-5 text-[#2D6BFF]" />
              </div>

              {/* Title */}
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2 lg:mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#A7B1C8] leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className="w-full h-[1px] bg-[rgba(167,177,200,0.18)] mt-3 lg:mt-4" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-6 lg:mt-8 text-center" style={{ opacity: 0 }}>
          <a href="#integration" className="btn-secondary inline-flex items-center gap-2">
            See how we work
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
