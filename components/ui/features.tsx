"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gem, Coins, ShieldCheck, Zap, Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedItem } from "@/components/ui/animated-section"

export function Features() {
  const features = [
    {
      icon: <Gem className="h-10 w-10 text-gold-400 mb-2" />,
      title: "NFT Marketplace",
      description:
        "Buy, sell, and trade unique NFTs from various collections with low transaction fees and seamless user experience.",
    },
    {
      icon: <Coins className="h-10 w-10 text-gold-400 mb-2" />,
      title: "Token Staking",
      description: "Stake your NFTs and tokens to earn rewards and participate in the platform's governance.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-gold-400 mb-2" />,
      title: "Secure Transactions",
      description: "All transactions are secured by Solana blockchain technology, ensuring transparency and security.",
    },
    {
      icon: <Zap className="h-10 w-10 text-gold-400 mb-2" />,
      title: "Fast Processing",
      description: "Experience lightning-fast transactions with Solana's high-performance blockchain.",
    },
    {
      icon: <Users className="h-10 w-10 text-gold-400 mb-2" />,
      title: "Community Rewards",
      description: "Earn rewards for participating in the community and contributing to the platform's growth.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-gold-400 mb-2" />,
      title: "Analytics Dashboard",
      description:
        "Access detailed analytics about your NFTs, collections, and market trends to make informed decisions.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block px-3 py-1 text-sm font-medium text-gold-800 bg-gold-100 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Features
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Platform Features
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Gold Digger combines cutting-edge technology with user-friendly features to create the ultimate NFT
            marketplace experience.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedItem key={index} variant="stagger" index={index} staggerDelay={0.1} className="h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-200/10 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  )
}
