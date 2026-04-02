import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  className?: string;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Integration', href: '#integration' },
  { label: 'Results', href: '#results' },
  { label: 'Mission', href: '#mission' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn', external: false },
  { icon: Twitter, href: '#', label: 'Twitter', external: false },
  { icon: Github, href: 'https://github.com/zackbear/', label: 'GitHub', external: true },
];

export default function Footer({ className = '' }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            end: 'top 80%',
            scrub: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#070A12] py-12 ${className}`}
      style={{ opacity: 0 }}
    >
      <div className="w-full px-[6vw]">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Dragus Enterprises — home"
            className="flex items-center gap-3"
          >
            <img
              src="/images/dragus-mark.png"
              alt=""
              className="h-14 w-auto"
            />
            <span className="text-white font-semibold text-sm tracking-wide">Dragus Enterprises</span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-[#A7B1C8] hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                {...(social.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="w-10 h-10 rounded-lg bg-[rgba(167,177,200,0.1)] flex items-center justify-center text-[#A7B1C8] hover:text-white hover:bg-[rgba(45,107,255,0.2)] transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[rgba(167,177,200,0.18)] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A7B1C8]">
            © 2026 Dragus Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#A7B1C8] hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#A7B1C8] hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
