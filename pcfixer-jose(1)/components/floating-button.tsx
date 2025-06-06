"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { translations } from "@/lib/translations"

interface FloatingButtonProps {
  language: string
}

export function FloatingButton({ language }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[language as keyof typeof translations]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-md border border-cyan-950/50 p-4 rounded-lg shadow-lg w-64 mb-4"
          >
            <div className="text-white font-medium mb-2">{t.footer.whatsapp}</div>
            <p className="text-muted-foreground text-sm mb-3">{t.footer.whatsappText}</p>
            <a
              href="https://wa.me/3197306999"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-center py-2 rounded-md font-medium transition-colors duration-300"
            >
              {t.footer.whatsappButton}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center rounded-full w-14 h-14 shadow-lg ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
        } transition-colors duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </motion.button>
    </div>
  )
}
