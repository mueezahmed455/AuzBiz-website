'use client';

import Image from 'next/image';
import Button from '../components/Button';

export function AboutSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-center lg:text-left mb-6">
              Our Story
            </h2>
            <p className="text-navy-600/80 max-w-2xl lg:text-left">
              Since our inception, AUZBIZ has been dedicated to transforming travel dreams into reality. As Pakistan's most trusted travel agency, we combine unparalleled expertise with personalized service to craft journeys that inspire, educate, and create lasting memories.
            </p>
            <p className="text-navy-600/80 max-w-2xl lg:text-left">
              Our team of passionate travel experts brings together decades of experience across continents, ensuring every itinerary is meticulously crafted to exceed expectations. From the bustling bazaars of Istanbul to the serene valleys of Hunza, we specialize in curating authentic experiences that connect travelers with the heart and soul of each destination.
            </p>
            <div className="flex lg:justify-start">
              <Button href="/packages" variant="primary" size="lg">
                Explore Our Packages
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="https://source.unsplash.com/random/1600x900?luxury,travel"
              alt="Luxury travel experience"
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              width={800}
              height={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}