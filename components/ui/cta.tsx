"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-gold-300 to-gold-500 text-gray-900">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          className="inline-block px-3 py-1 text-sm font-medium bg-white/20 rounded-full backdrop-blur-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get Started
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to Join the Gold Rush?
        </motion.h2>

        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Start your journey in the Gold Digger ecosystem today and discover the future of digital collectibles.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/marketplace"
              className="block bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Explore Marketplace
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#"
              className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
