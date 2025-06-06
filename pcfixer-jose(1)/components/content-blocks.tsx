"use client"

import type React from "react"

import { Smartphone, Brain, ShieldCheck, Laptop } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { translations } from "@/lib/translations"

interface ContentBlocksProps {
  language: string
}

export function ContentBlocks({ language }: ContentBlocksProps) {
  const t = translations[language as keyof typeof translations]

  const contentBlocks = [
    {
      title: t.content.phones.title,
      description: t.content.phones.description,
      icon: Smartphone,
    },
    {
      title: t.content.ai.title,
      description: t.content.ai.description,
      icon: Brain,
    },
    {
      title: t.content.security.title,
      description: t.content.security.description,
      icon: ShieldCheck,
    },
    {
      title: t.content.os.title,
      description: t.content.os.description,
      icon: Laptop,
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          {t.content.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contentBlocks.map((block, index) => (
            <ContentBlock
              key={index}
              title={block.title}
              description={block.description}
              Icon={block.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentBlock({
  title,
  description,
  Icon,
  index,
}: {
  title: string
  description: string
  Icon: React.ElementType
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/90 dark:bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-cyan-950/50 hover:border-cyan-500/50 transition-all duration-300 group shadow-lg"
    >
      <div className="mb-4 bg-gradient-to-br from-cyan-500 to-purple-600 p-3 rounded-lg inline-block">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}
