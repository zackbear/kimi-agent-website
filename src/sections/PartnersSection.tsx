import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cloud, Phone, Server, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PartnersSectionProps {
  className?: string;
}

const partners = [
  {
    name: 'EmetroTel',
    description: 'Unified comms & migration',
    icon: Phone,
  },
  {
    name: 'Yeastar',
    description: 'Cloud PBX & collaboration',
    icon: Server,
  },
  {
    name: 'Yealink',
    description: 'Endpoints & video',
    icon: Video,
  },
  {
    name: 'AWS',
    description: 'Cloud infrastructure',
    icon: Cloud,
  },
];

export default function PartnersSection({ className = '' }: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Partner cards animation
      const cards = gridRef.current?.querySelectorAll('.partner-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '5vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className={`relative bg-[#070A12] py-[10vh] ${className}`}
    >
      <div className="relative z-10 w-full px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left heading block */}
          <div ref={headingRef} className="lg:col-span-4" style={{ opacity: 0 }}>
            <span className="label-mono mb-4 block">Partners</span>
            <h2 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.0] tracking-[-0.02em] text-white mb-6">
              Technology partners
            </h2>
            <p className="text-lg text-[#A7B1C8] leading-relaxed">
              We work with platforms that prioritize reliability, APIs, and real
              support.
            </p>
          </div>

          {/* Right partner grid */}
          <div ref={gridRef} className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="partner-card glass-card rounded-[22px] p-6 flex items-start gap-4"
                  style={{ opacity: 0 }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[rgba(45,107,255,0.15)] flex items-center justify-center flex-shrink-0">
                    <partner.icon className="w-6 h-6 text-[#2D6BFF]" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-[#A7B1C8]">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-8 text-center sm:text-left" style={{ opacity: 0 }}>
              <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
                Become a partner
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
