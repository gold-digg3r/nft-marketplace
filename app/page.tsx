"use client"

import Link from "next/link"
import { ParallaxHero } from "@/components/ui/parallax-hero"
import { AnimatedSection } from "@/components/ui/animated-section"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Features } from "@/components/ui/features"
import { About } from "@/components/ui/about"
import { CTA } from "@/components/ui/cta"
import { FAQ } from "@/components/ui/faq"
import { Footer } from "@/components/ui/footer"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />

      <ParallaxHero image="/images/3d-digital-background-with-golden-flowing-cyber-dots.jpg">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-white bg-gold-400/80 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Gold Digger NFT Marketplace
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              The Future of Digital Gold
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Discover, collect, and trade unique NFTs in the Gold Digger marketplace
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Link
                href="/marketplace"
                className="bg-gold-400 hover:bg-gold-500 text-gray-900 font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 transform hover:-translate-y-1"
              >
                Explore Marketplace
              </Link>
              <Link
                href="/brand-guide"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 transform hover:-translate-y-1"
              >
                Documentation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxHero>

      <AnimatedSection variant="fadeIn" delay={0.2}>
        <Features />
      </AnimatedSection>

      <AnimatedSection variant="slideUp" delay={0.2}>
        <About />
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" delay={0.2}>
        <CTA />
      </AnimatedSection>

      <AnimatedSection variant="slideUp" delay={0.2}>
        <FAQ />
      </AnimatedSection>

      <AnimatedSection variant="fadeIn">
        <Footer />
      </AnimatedSection>
    </>
  )
}
