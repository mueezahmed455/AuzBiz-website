"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  User,
  Clock,
  Loader2,
} from "lucide-react";
import { SectionHeader, FadeInView, StaggerChildren, StaggerItem } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import FAQAccordion from "@/components/FAQAccordion";
import CTABar from "@/components/CTABar";
import PageMetadata from "@/components/PageMetadata";
import Button from "@/components/Button";

const faqs = [
  {
    q: "How quickly do you respond to inquiries?",
    a: "We respond to all WhatsApp messages within 2 hours during office hours (Mon–Sat, 9am–8pm). Email responses are within 4–6 hours. For urgent travel needs, WhatsApp is always the fastest channel.",
  },
  {
    q: "Do you offer customised packages?",
    a: "Absolutely. Every client is different. We build fully bespoke itineraries based on your destination, travel dates, group size, budget, and preferences. Just tell us what you're dreaming of.",
  },
  {
    q: "What areas do your visa services cover?",
    a: "We assist with Schengen, UAE, UK, Malaysia, Thailand, Saudi Arabia (Umrah), and several other destinations. Our team provides document preparation, checklist guidance, and pre-submission review.",
  },
  {
    q: "Can you manage a large corporate group tour?",
    a: "Yes — this is one of our core specialisations. We have managed MICE and incentive group tours for 10 to 200+ participants across Pakistan and internationally, with full end-to-end coordination.",
  },
  {
    q: "Is an initial consultation free?",
    a: "Yes, completely free with zero obligation. We love talking travel. Contact us via WhatsApp, email, or the form on this page and one of our team members will be in touch promptly.",
  },
  {
    q: "How do I pay for a package?",
    a: "We accept bank transfer, EasyPaisa, JazzCash, and cash at our Lahore office. A booking deposit secures your spot. Full payment terms are confirmed at the time of your booking.",
  },
];

const officeHours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM", highlight: true },
  { day: "Saturday", time: "10:00 AM – 6:00 PM", highlight: true },
  { day: "Sunday", time: "Closed" },
];

// Google Maps embed URL for DHA II (Rehbar) Lahore-Pakistan
const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.123456789!2d74.343!3d31.478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzQwLjgiTiA3NMKwMjAnMzQuOSJF!5e0!3m2!1sen!2s!4v1234567890";
const MAPS_DIR_URL = "https://www.google.com/maps/search/Lahore+DHA+RAHBAR+Pakistan";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", service: "", destination: "", travelDates: "", groupSize: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.phone) {
      setFormError("First name and phone number are required.");
      return;
    }
    setFormStatus("loading");
    setFormError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          service: form.service,
          destination: form.destination,
          travelDates: form.travelDates,
          groupSize: form.groupSize,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      setForm({ firstName: "", lastName: "", phone: "", email: "", service: "", destination: "", travelDates: "", groupSize: "", message: "" });
    } catch {
      setFormStatus("error");
      setFormError("Could not send. Please WhatsApp us directly.");
    }
  };

  return (
    <>
      <PageMetadata
        title="Contact AUZBIZ — Get in Touch for Travel, Events & Study Abroad | Lahore"
        description="Reach AUZBIZ — Dream Beyond Borders in Lahore. Call +92 346 4993122, WhatsApp, or visit us at DHA II (Rehbar) Lahore-Pakistan. Free consultation on Umrah, tours, corporate events, visas & study abroad."
        ogTitle="Contact AUZBIZ — Free Travel Consultation, Lahore"
        ogDescription="Get in touch with AUZBIZ for Umrah packages, group tours, corporate events, visa services & study abroad. Response within 2 hours on WhatsApp."
      />
      {/* Hero */}
      <section className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden">
        <HeroParticles />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <FadeInView>
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Contact Us — We Respond Within 2 Hours on WhatsApp
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Get in Touch.
              <span className="block text-gold-500">We Reply Within 2 Hours.</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              Whether it&apos;s a group tour, Umrah package, corporate event, visa query, or
              study abroad guidance — the AUZBIZ team is ready. Reach out through any channel.
            </p>
          </FadeInView>
        </div>
        <div className="h-1 bg-gold-500" />
      </section>

      {/* Quick contact strip */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: MessageCircle, label: "WhatsApp (Fastest)", val: "+92 346 4993122", href: "https://wa.me/923464993122" },
            { icon: Phone, label: "Call Us", val: "+92 346 4993122", href: "tel:+923464993122" },
            { icon: Mail, label: "Email", val: "auzbizpak@gmail.com", href: "mailto:auzbizpak@gmail.com" },
            { icon: MapPin, label: "Office Address", val: "DHA II (Rehbar) Lahore-Pakistan", href: MAPS_DIR_URL },
            { icon: Globe, label: "Website", val: "www.auzbizgroup.com", href: "https://www.auzbizgroup.com" },
          ].map((item) => (
            <FadeInView key={item.label}>
              <Link href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3 items-start h-full hover:border-gold-500/30 hover:shadow-sm transition-all duration-200">
                  <div className="w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center flex-shrink-0 text-gold-500">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-xs font-semibold text-navy-800 leading-relaxed hover:text-gold-500 transition-colors">{item.val}</div>
                  </div>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Main contact layout */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <FadeInView>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-navy-800 px-6 py-5">
                  <h3 className="text-white font-bold">Send us an inquiry</h3>
                  <p className="text-white/50 text-xs mt-1">Fill in the form and we&apos;ll respond within 2–4 hours</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-3.5">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">First name *</label>
                        <input type="text" placeholder="Ahmed" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Last name</label>
                        <input type="text" placeholder="Khan" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">WhatsApp / Phone number *</label>
                        <input type="text" placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email address</label>
                        <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Service you&apos;re interested in *</label>
                        <select value={form.service} onChange={(e) => handleChange("service", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all text-gray-500">
                          <option value="">Select a service...</option>
                          <option>Corporate Events & MICE</option>
                          <option>Air Ticketing</option>
                          <option>Group Tours</option>
                          <option>Umrah Package</option>
                          <option>Hotel Bookings</option>
                          <option>Visa Services</option>
                          <option>Study Abroad</option>
                          <option>End-to-End Management</option>
                          <option>Custom / Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Travel destination (if applicable)</label>
                        <input type="text" placeholder="e.g. Uzbekistan, Thailand, Umrah..." value={form.destination} onChange={(e) => handleChange("destination", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Travel dates (approx)</label>
                          <input type="text" placeholder="e.g. August 2026" value={form.travelDates} onChange={(e) => handleChange("travelDates", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Group size</label>
                          <input type="text" placeholder="e.g. 4 persons" value={form.groupSize} onChange={(e) => handleChange("groupSize", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Your message / requirements</label>
                        <textarea rows={4} placeholder="Tell us about your plans, budget, special requirements..." value={form.message} onChange={(e) => handleChange("message", e.target.value)} className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none" />
                      </div>
                      {formStatus === "success" && (
                        <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-lg p-3 text-center">
                          <p className="text-xs text-[#1D9E75] font-semibold">✓ Inquiry sent! We&apos;ll respond on WhatsApp within 2 hours.</p>
                        </div>
                      )}
                      {formError && (
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                          <p className="text-xs text-red-500">{formError}</p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full bg-navy-800 text-gold-500 text-sm font-semibold py-3 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                      >
                        {formStatus === "loading" ? (
                          <><Loader2 size={16} className="animate-spin" /> Sending...</>
                        ) : (
                          "Submit Inquiry — We'll Respond Shortly"
                        )}
                      </button>
                      <p className="text-[10px] text-gray-400 text-center">
                        By submitting this form you agree to be contacted by AUZBIZ via WhatsApp or email. No spam, ever.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </FadeInView>

            {/* Right column */}
            <div className="space-y-4">
              {/* WhatsApp big CTA */}
              <FadeInView delay={0.1}>
                <TiltCard tiltAmount={3} scale={1.01}>
                <Link
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#25D366] rounded-2xl p-6 flex items-center gap-4 hover:bg-[#20bd5a] transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <MessageCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Chat directly on WhatsApp</h3>
                    <p className="text-white/70 text-xs mt-0.5">Fastest way to reach us — instant replies during office hours</p>
                    <p className="text-white font-semibold text-sm mt-2">+92 346 4993122</p>
                  </div>
                </Link>
                </TiltCard>
              </FadeInView>

              {/* Google Maps Embed */}
              <FadeInView delay={0.15}>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                    <MapPin size={14} fill="#D4AF37" stroke="#D4AF37" />
                    <span className="text-xs font-semibold text-navy-800">AUZBIZ Office — DHA II (Rehbar) Lahore-Pakistan</span>
                  </div>
                  <div className="relative w-full h-48 bg-navy-800">
                    <iframe
                      src={MAPS_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="AUZBIZ Office Location"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="px-5 py-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">DHA II (Rehbar) Lahore-Pakistan</span>
                    <a
                      href={MAPS_DIR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold text-navy-800 bg-gold-500 px-3 py-1.5 rounded-lg hover:bg-gold-400 transition-colors"
                    >
                      Open in Maps →
                    </a>
                  </div>
                </div>
              </FadeInView>

              {/* Info cards */}
              <FadeInView delay={0.2}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-100 rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User size={12} strokeWidth={1.5} /> Your Host
                    </div>
                    <div className="text-xs font-semibold text-navy-800">Zubair Ahmad</div>
                    <div className="text-[11px] text-gray-400">Chief Executive Officer (CEO)</div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Clock size={12} strokeWidth={1.5} /> Response Time
                    </div>
                    <div className="text-xs font-semibold text-navy-800">Within 2 hrs</div>
                    <div className="text-[11px] text-gray-400">Mon–Sat via WhatsApp</div>
                  </div>
                </div>
              </FadeInView>

              {/* Office hours */}
              <FadeInView delay={0.25}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h4 className="text-xs font-semibold text-navy-800 flex items-center gap-2 mb-4">
                    <Clock size={14} stroke="#D4AF37" strokeWidth={2} />
                    Office Hours
                  </h4>
                  <div className="space-y-2.5">
                    {officeHours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                        <span className="text-gray-500">{h.day}</span>
                        <span className={`font-semibold ${h.highlight ? "text-[#1D9E75]" : "text-gray-400"}`}>
                          {h.time}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs pt-1.5">
                      <span className="text-gray-400 text-[11px]">WhatsApp (urgent)</span>
                      <span className="font-semibold text-[#25D366]">Available 7 days</span>
                    </div>
                  </div>
                </div>
              </FadeInView>

              {/* Social buttons */}
              <FadeInView delay={0.3}>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.facebook.com/auzbizpak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#1877F2] text-white text-xs font-semibold py-3 rounded-lg hover:bg-[#166fe5] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                    Facebook
                  </a>
                  <a
                    href="https://www.linkedin.com/company/auzbiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#0A66C2] text-white text-xs font-semibold py-3 rounded-lg hover:bg-[#0959a8] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" /></svg>
                    LinkedIn
                  </a>
                </div>
              </FadeInView>
            </div>
          </div>

          {/* FAQ */}
          <FadeInView className="mt-16">
            <h3 className="text-base font-bold text-navy-800 mb-6">Frequently Asked Questions</h3>
            <FAQAccordion items={faqs} />
          </FadeInView>
        </div>
      </section>

      <CTABar
        title="Your journey begins with one message."
        subtitle="Free consultation · No obligation · AUZBIZ — Dream Beyond Borders, Lahore"
        primaryLabel="View Our Packages"
        primaryHref="/packages"
      />
    </>
  );
}
