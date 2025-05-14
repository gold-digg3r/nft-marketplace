"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:col-span-2">
            <Logo className="h-8 w-auto mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Gold Digger is a comprehensive Solana-based platform that combines NFT marketplace functionality, DeFi
              features, and AI-powered tools.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href="/marketplace"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Marketplace
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link
                  href="/brand-guide"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Brand Guide
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </motion.li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Discord
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </motion.li>
            </ul>
          </div>
        </motion.div>
        <motion.div
          className="border-t mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gold Digger. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
