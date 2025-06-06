"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Wrench, Shield, RotateCcw, Download, Cpu, Home, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { translations } from "@/lib/translations"

interface ServicesSectionProps {
  language: string
}

export function ServicesSection({ language }: ServicesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const t = translations[language as keyof typeof translations]

  const services = [
    {
      title: t.services.items.repair.title,
      description: t.services.items.repair.description,
      icon: Wrench,
      color: "from-cyan-500 to-blue-600",
      image: null,
    },
    {
      title: t.services.items.preventive.title,
      description: t.services.items.preventive.description,
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      image: null,
    },
    {
      title: t.services.items.corrective.title,
      description: t.services.items.corrective.description,
      icon: RotateCcw,
      color: "from-blue-500 to-indigo-600",
      image: null,
    },
    {
      title: t.services.items.installation.title,
      description: t.services.items.installation.description,
      icon: Download,
      color: "from-purple-500 to-violet-600",
      image: null,
    },
    {
      title: t.services.items.cleaning.title,
      description: t.services.items.cleaning.description,
      icon: Cpu,
      color: "from-cyan-500 to-teal-600",
      image: "/images/hardware-cleaning.png",
    },
    {
      title: t.services.items.home.title,
      description: t.services.items.home.description,
      icon: Home,
      color: "from-blue-500 to-cyan-600",
      image: "/images/home-service.png",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-50 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {t.services.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/90 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-cyan-950/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-lg"
            >
              {service.image && (
                <div
                  className="relative w-full h-48 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div
                  className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${service.color}`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-cyan-600 dark:border-cyan-800/50 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all duration-300"
                >
                  <Link
                    href="https://linktr.ee/pcfixerjose"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    {t.services.request}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}

          {/* Modal para ver imagen completa */}
          {selectedService && selectedService.image && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedService(null)}
            >
              <div
                className="relative bg-white/95 dark:bg-black/70 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 bg-gray-200 dark:bg-black/50 rounded-full p-2 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-black/70 transition-colors z-10"
                  onClick={() => setSelectedService(null)}
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="relative w-full md:w-2/3 h-64 md:h-auto">
                  <Image
                    src={selectedService.image || "/placeholder.svg"}
                    alt={selectedService.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 md:w-1/3 flex flex-col justify-center">
                  <div
                    className={`w-14 h-14 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${selectedService.color}`}
                  >
                    <selectedService.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{selectedService.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedService.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-cyan-600 dark:border-cyan-800/50 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all duration-300"
                  >
                    <Link
                      href="https://linktr.ee/pcfixerjose"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {t.services.request}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
