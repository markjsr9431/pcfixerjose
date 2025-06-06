"use client"
import { Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import { translations } from "@/lib/translations"

interface FooterProps {
  language: string
}

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const t = translations[language as keyof typeof translations]

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/pcfixer_jose" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/josé-sebastián-rubio-castro-5145151b5" },
  ]

  return (
    <footer className="bg-white/90 dark:bg-black/70 backdrop-blur-md border-t border-gray-200 dark:border-cyan-950/50 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título del Footer */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {t.footer.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              {t.footer.brand}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.footer.description}</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-cyan-950/50 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-700 p-2 rounded-full text-gray-600 dark:text-muted-foreground hover:text-white transition-all duration-300"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.footer.contact}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{t.footer.contactText}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t.footer.email}{" "}
              <a href="mailto:markjsr@proton.me" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                markjsr@proton.me
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t.footer.instagram}{" "}
              <a
                href="https://instagram.com/pcfixer_jose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                @pcfixer_jose
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-cyan-950/50 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-muted-foreground">
            &copy; {currentYear} {t.footer.brand}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
