import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone as PhoneIcon, Globe, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left block animation
      gsap.fromTo(
        leftRef.current,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Form card animation
      gsap.fromTo(
        formRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-[#0D1220] py-[10vh] min-h-screen ${className}`}
    >
      {/* Background silhouette */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/contact-silhouette.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Heading + Contact info */}
          <div ref={leftRef} className="max-w-[500px]" style={{ opacity: 0 }}>
            <span className="label-mono mb-4 block">Contact</span>
            <h2 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.0] tracking-[-0.02em] text-white mb-6">
              Let's build what's next.
            </h2>

            <p className="text-lg text-[#A7B1C8] leading-relaxed mb-10">
              Tell us what you're modernizing. We'll respond within two business
              days.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="mailto:hello@dragusenterprises.com"
                className="flex items-center gap-3 text-[#A7B1C8] hover:text-[#2D6BFF] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@dragusenterprises.com</span>
              </a>
              <a
                href="tel:+15550142200"
                className="flex items-center gap-3 text-[#A7B1C8] hover:text-[#2D6BFF] transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>+1 (555) 014-2200</span>
              </a>
              <div className="flex items-center gap-3 text-[#A7B1C8]">
                <Globe className="w-5 h-5" />
                <span>Available worldwide</span>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div
            ref={formRef}
            className="glass-card rounded-[22px] p-6 lg:p-8"
            style={{ opacity: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="form-input resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
                disabled={showSuccess}
              >
                {showSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message sent!
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
