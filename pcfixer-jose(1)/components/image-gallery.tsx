"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { translations } from "@/lib/translations"

interface ImageGalleryProps {
  language: string
}

const images = [
  {
    src: "/images/smartphone.png",
    alt: "Smartphone moderno con aplicaciones",
    category: "Celulares",
  },
  {
    src: "/images/ai.jpg",
    alt: "Concepto de inteligencia artificial",
    category: "IA",
  },
  {
    src: "/images/cybersecurity.png",
    alt: "Seguridad informática y protección de datos",
    category: "Ciberseguridad",
  },
  {
    src: "/images/os.png",
    alt: "Interfaz de sistema operativo",
    category: "Sistemas",
  },
  {
    src: "/images/gadgets.png",
    alt: "Gadgets tecnológicos modernos",
    category: "Gadgets",
  },
  {
    src: "/images/networks.png",
    alt: "Redes y conectividad",
    category: "Redes",
  },
]

export function ImageGallery({ language }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const t = translations[language as keyof typeof translations]

  const filteredImages = activeCategory ? images.filter((img) => img.category === activeCategory) : images

  const categories = Array.from(new Set(images.map((img) => img.category)))

  return (
    <section ref={ref} className="py-20 px-4 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          {t.gallery.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                : "bg-gray-100 dark:bg-muted text-gray-700 dark:text-muted-foreground hover:bg-gray-200 dark:hover:bg-muted/80"
            }`}
          >
            {t.gallery.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "bg-gray-100 dark:bg-muted text-gray-700 dark:text-muted-foreground hover:bg-gray-200 dark:hover:bg-muted/80"
              }`}
            >
              {t.gallery.categories[category.toLowerCase() as keyof typeof t.gallery.categories] || category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="overflow-hidden rounded-xl bg-white/90 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-cyan-950/50 hover:border-cyan-500/30 transition-all duration-300 shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full mb-2">
                  {t.gallery.categories[image.category.toLowerCase() as keyof typeof t.gallery.categories] ||
                    image.category}
                </span>
                <h3 className="font-medium text-gray-900 dark:text-white">{image.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
