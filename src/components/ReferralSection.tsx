"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Share2, Gift, Coins, Check, Star } from "lucide-react";
import { SectionHeader, StaggerChildren, StaggerItem } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import Button from "@/components/Button";

const referralSteps = [
  {
    icon: Share2,
    title: "1. Share AUZBIZ",
    desc: "Tell your friends, family, or colleagues about AUZBIZ. Share our WhatsApp number or website link.",
  },
  {
    icon: Gift,
    title: "2. They Book a Trip",
    desc: "When your referral books any package (Umrah, tour, or event) and completes their travel, you earn rewards.",
  },
  {
    icon: Coins,
    title: "3. You Get PKR 5,000 Off",
    desc: "You receive PKR 5,000 credit toward your next AUZBIZ booking. No limit on how many friends you refer!",
  },
];

const loyaltyTiers = [
  {
    tier: "Silver",
    min: "1 Trip",
    color: "text-gray-400",
    bg: "bg-gray-50 dark:bg-[#12122a]",
    perks: ["Priority WhatsApp support", "Exclusive deal notifications", "Birthday travel voucher"],
  },
  {
    tier: "Gold",
    min: "3 Trips",
    color: "text-gold-500",
    bg: "bg-gold-500/5",
    perks: ["All Silver perks", "Free airport transfer (1 way)", "5% discount on all packages"],
  },
  {
    tier: "Platinum",
    min: "5+ Trips",
    color: "text-navy-800 dark:text-white",
    bg: "bg-navy-800/5 dark:bg-[#12122a]",
    perks: ["All Gold perks", "Free airport transfer (both ways)", "10% discount on all packages", "Dedicated travel consultant"],
  },
];

export default function ReferralSection() {
  return (
    <section className="py-16 sm:py-20 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Referral & Loyalty Program"
          title="Bring a friend, earn rewards — everyone wins"
          description="Love travelling with AUZBIZ? Share the experience and earn PKR 5,000 off your next trip for every friend who books with us. Plus, unlock exclusive perks as a loyal traveller."
        />

        {/* Referral steps */}
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 mb-12">
          {referralSteps.map((step) => (
            <StaggerItem key={step.title}>
              <TiltCard tiltAmount={3} scale={1.015}>
                <div
                  className="border rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                >
                  <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center mb-4 text-navy-800 group-hover:bg-navy-800 group-hover:text-gold-500 transition-colors duration-300">
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-sm text-navy-800 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Loyalty tiers */}
        <div className="border rounded-2xl overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
          <div className="px-6 py-4 bg-gold-500/5 border-b border-gray-100 dark:border-[#2a2a5e]">
            <h3 className="text-xs font-semibold text-navy-800 dark:text-white"><Star size={14} className="inline mr-1" strokeWidth={1.5} /> AUZBIZ Loyalty Tiers</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">The more you travel, the more you save</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-[#2a2a5e]">
            {loyaltyTiers.map((tier) => (
              <div key={tier.tier} className={`p-5 ${tier.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-bold text-sm ${tier.color}`}>{tier.tier}</span>
                  <span className="text-[10px] text-gray-400 bg-white dark:bg-[#0a0a1a] px-2 py-0.5 rounded-full border border-gray-100 dark:border-[#2a2a5e]">
                    {tier.min}
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="text-[11px] text-gray-500 flex items-start gap-2">
                      <Check size={10} stroke="#D4AF37" strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link
            href="https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I%20want%20to%20refer%20a%20friend%20and%20earn%20rewards!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-800 dark:bg-gold-500 text-gold-500 dark:text-navy-800 text-xs font-semibold px-6 py-3 rounded-lg hover:bg-navy-700 dark:hover:bg-gold-400 transition-colors"
          >
            Start Referring on WhatsApp
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
