import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MissionSectionProps {
  className?: string;
}

const values = [
  { icon: Zap, text: 'Uptime over hype' },
  { icon: Shield, text: 'Security by default' },
  { icon: Check, text: 'Measurable outcomes' },
];

const stats = [
  { value: '150+', label: 'systems delivered' },
  { value: '99.99%', label: 'uptime target' },
  { value: 'Global', label: 'delivery' },
];

export default function MissionSection({ className = '' }: MissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
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

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Parallax on image
      gsap.to(imageRef.current, {
        y: '-4vh',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: '3vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className={`relative bg-[#070A12] py-[10vh] min-h-screen ${className}`}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/images/mission-texture.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left text column */}
          <div ref={headingRef} className="max-w-[600px]" style={{ opacity: 0 }}>
            <span className="label-mono mb-4 block">Mission</span>
            <h2 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.0] tracking-[-0.02em] text-white mb-8">
              Our mission
            </h2>

            <p className="text-lg text-[#A7B1C8] leading-relaxed mb-8">
              We believe infrastructure should be invisible—reliable, secure, and
              fast. We help organizations modernize without drama, adopting AI and
              cloud systems that respect existing operations.
            </p>

            {/* Values list */}
            <ul className="space-y-4 mb-12">
              {values.map((value) => (
                <li key={value.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(45,107,255,0.15)] flex items-center justify-center">
                    <value.icon className="w-4 h-4 text-[#2D6BFF]" />
                  </div>
                  <span className="text-white">{value.text}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
                  <p className="text-2xl lg:text-3xl font-semibold text-[#2D6BFF]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#A7B1C8]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div
            ref={imageRef}
            className="relative"
            style={{ opacity: 0 }}
          >
            <div className="relative w-full h-[300px] lg:h-[56vh] rounded-[22px] overflow-hidden">
              <img
                src="/images/hero-control-room.jpg"
                alt="Technology operations"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
