'use client';

import Button from '../components/Button';

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center lg:text-left text-navy-800 dark:text-white mb-2">
              Our Story
            </h2>
            <p className="text-navy-600/80 dark:text-white/70 max-w-2xl lg:text-left text-sm sm:text-base leading-relaxed">
              Since our inception, AUZBIZ has been dedicated to transforming travel dreams into reality. As Pakistan&apos;s trusted travel and events partner, we combine sector experience with personalised service to craft journeys that inspire and create lasting memories.
            </p>
            <p className="text-navy-600/80 dark:text-white/70 max-w-2xl lg:text-left text-sm sm:text-base leading-relaxed">
              From Umrah and group tours to corporate MICE, visas, and study abroad — our team handles the details so you can focus on the experience. Based in Lahore, we serve families, professionals, and leading organisations nationwide.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-start justify-center">
              <Button href="/packages" variant="primary" size="lg">
                Explore Packages
              </Button>
              <Button href="/visas" variant="secondary" size="lg">
                Visa Services
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div
              className="rounded-2xl overflow-hidden shadow-lg aspect-[16/10] relative"
              style={{
                background:
                  "linear-gradient(135deg, #1A2A6C 0%, #0f1a45 40%, #D4AF37 160%)",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-2">
                  AUZBIZ
                </p>
                <p className="text-white text-2xl font-bold leading-snug">
                  Dream Beyond Borders™
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Travel · Events · Visas · Study Abroad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
