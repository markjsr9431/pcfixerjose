"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Languages, Volume2, VolumeX, Minimize2 } from "lucide-react"
import { useTheme } from "next-themes"

interface FloatingHeaderProps {
  language: string
  setLanguage: (lang: string) => void
}

export function FloatingHeader({ language, setLanguage }: FloatingHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const togglePlayer = () => {
    if (!showPlayer) {
      setShowPlayer(true)
    } else {
      // Solo ocultar la ventana, no detener la música
      setShowPlayer(false)
    }
  }

  const minimizePlayer = () => {
    // Solo ocultar la ventana flotante, mantener la música
    setShowPlayer(false)
    // Marcar que hay música reproduciéndose si el usuario ya interactuó
    if (!isPlaying) {
      setIsPlaying(true)
    }
  }

  const stopMusic = () => {
    // Detener completamente la música
    setShowPlayer(false)
    setIsPlaying(false)

    // Forzar recarga del iframe para detener la música
    const iframe = document.getElementById("soundcloud-player") as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const menuItems = [
    { id: "hero", label: language === "es" ? "Inicio" : "Home" },
    { id: "content", label: language === "es" ? "Contenido" : "Content" },
    { id: "gallery", label: language === "es" ? "Galería" : "Gallery" },
    { id: "services", label: language === "es" ? "Servicios" : "Services" },
    { id: "contact", label: language === "es" ? "Contacto" : "Contact" },
  ]

  return (
    <>
      {/* Iframe persistente para música de fondo - SIEMPRE presente cuando isPlaying es true */}
      {isPlaying && (
        <div
          className="fixed pointer-events-none"
          style={{
            position: "fixed",
            top: "-9999px",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            zIndex: -1,
          }}
        >
          <iframe
            id="soundcloud-background"
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746425982&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          />
        </div>
      )}

      {/* Reproductor de música flotante visible */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-cyan-950/50 p-6 max-w-md w-80"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                🎧 {language === "es" ? "Música Chill para Navegar" : "Chill Music for Browsing"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === "es"
                  ? "Haz clic en play para escuchar música ambiente mientras exploras nuestros servicios"
                  : "Click play to listen to ambient music while exploring our services"}
              </p>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-full">
                <iframe
                  id="soundcloud-player"
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1746425982&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                  className="rounded-lg"
                  onLoad={() => {
                    // Cuando el iframe se carga, consideramos que puede haber música
                    setTimeout(() => setIsPlaying(true), 2000)
                  }}
                />
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                  <a
                    href="https://soundcloud.com/lofi_girl"
                    title="Lofi Girl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 no-underline transition-colors"
                  >
                    Lofi Girl
                  </a>
                  {" · "}
                  <a
                    href="https://soundcloud.com/lofi_girl/sets/sleep-lofi"
                    title="Sleep lofi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 no-underline transition-colors"
                  >
                    Sleep lofi
                  </a>
                </div>
              </div>
            </div>

            {/* Controles del reproductor */}
            <div className="flex justify-between items-center">
              <button
                onClick={minimizePlayer}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
                title={language === "es" ? "Minimizar (música continúa)" : "Minimize (music continues)"}
              >
                <Minimize2 className="h-4 w-4" />
                <span className="text-xs">{language === "es" ? "Minimizar" : "Minimize"}</span>
              </button>

              <button
                onClick={stopMusic}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors"
                title={language === "es" ? "Detener música completamente" : "Stop music completely"}
              >
                <VolumeX className="h-4 w-4" />
                <span className="text-xs">{language === "es" ? "Detener" : "Stop"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de música reproduciéndose en segundo plano */}
      <AnimatePresence>
        {isPlaying && !showPlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-30"
          >
            <button
              onClick={togglePlayer}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              title={language === "es" ? "Mostrar reproductor (música activa)" : "Show player (music active)"}
            >
              <Volume2 className="h-5 w-5 animate-pulse" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-cyan-950/50"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-cyan-950/50 hover:bg-gray-200 dark:hover:bg-cyan-950/70 text-gray-700 dark:text-cyan-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                  </button>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-6">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-600 dark:text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Controls */}
                <div className="flex items-center space-x-2">
                  {/* Music Player Toggle */}
                  <button
                    onClick={togglePlayer}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isPlaying
                        ? "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 text-orange-700 dark:text-orange-300"
                        : showPlayer
                          ? "bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300"
                          : "bg-gray-100 dark:bg-cyan-950/50 text-gray-700 dark:text-cyan-400 hover:bg-gray-200 dark:hover:bg-cyan-950/70 hover:text-gray-900 dark:hover:text-cyan-300"
                    }`}
                    title={
                      isPlaying && !showPlayer
                        ? language === "es"
                          ? "Música reproduciéndose - Mostrar reproductor"
                          : "Music playing - Show player"
                        : showPlayer
                          ? language === "es"
                            ? "Ocultar reproductor"
                            : "Hide player"
                          : language === "es"
                            ? "Mostrar reproductor"
                            : "Show player"
                    }
                  >
                    <Volume2 className={`h-4 w-4 ${isPlaying && !showPlayer ? "animate-pulse" : ""}`} />
                    <span className="text-sm font-medium hidden sm:inline">
                      {language === "es" ? "Música" : "Music"}
                    </span>
                    {isPlaying && !showPlayer && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </button>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-cyan-950/50 hover:bg-gray-200 dark:hover:bg-cyan-950/70 text-gray-700 dark:text-cyan-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors"
                    title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>

                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-cyan-950/50 hover:bg-gray-200 dark:hover:bg-cyan-950/70 text-gray-700 dark:text-cyan-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors"
                    title="Toggle Menu"
                  >
                    {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-cyan-950/50 overflow-hidden"
                  >
                    <div className="flex flex-col space-y-3">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="text-left text-gray-600 dark:text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-2"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}
