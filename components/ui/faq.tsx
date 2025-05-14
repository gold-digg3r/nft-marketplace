"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export function FAQ() {
  const faqs = [
    {
      question: "What is Gold Digger?",
      answer:
        "Gold Digger is a comprehensive Solana-based platform that combines NFT marketplace functionality, DeFi features, and AI-powered tools to create a unique ecosystem for crypto enthusiasts. Our platform allows users to buy, sell, and trade unique NFTs from various collections.",
    },
    {
      question: "How do I get started with Gold Digger?",
      answer:
        "To get started, you'll need a Solana wallet like Phantom or Solflare. Once you have a wallet, you can connect it to our platform and start exploring the marketplace. You can browse collections, buy NFTs, and participate in staking to earn rewards.",
    },
    {
      question: "What are the benefits of owning Gold Digger NFTs?",
      answer:
        "Owning Gold Digger NFTs provides various benefits, including access to exclusive features, staking rewards, community events, and governance rights. Each collection has its own unique utility within the ecosystem, offering different advantages to holders.",
    },
    {
      question: "How does staking work?",
      answer:
        "Staking allows you to lock up your NFTs or tokens to earn rewards. By staking, you're contributing to the platform's security and governance while earning passive income. The longer you stake, the more rewards you can earn.",
    },
    {
      question: "What fees are associated with transactions?",
      answer:
        "Gold Digger charges a small fee on marketplace transactions to support the platform's development and maintenance. These fees are competitive with other NFT marketplaces and are transparently displayed before you complete any transaction.",
    },
    {
      question: "How can I contact support?",
      answer:
        "If you need assistance, you can reach our support team through Discord, Twitter, or by submitting a ticket on our website. We're committed to providing timely and helpful support to all our users.",
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
            FAQ
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Find answers to the most common questions about Gold Digger and our NFT marketplace.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-gold-500 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
