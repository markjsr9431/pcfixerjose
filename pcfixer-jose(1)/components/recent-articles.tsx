"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    title: "Los 5 smartphones más innovadores de 2025",
    description:
      "Descubre los dispositivos móviles que están redefiniendo la experiencia del usuario con tecnologías revolucionarias.",
    date: "15 mayo, 2025",
    category: "Celulares",
    readTime: "5 min",
  },
  {
    title: "Cómo proteger tus cuentas con autenticación de dos factores",
    description:
      "Guía completa para implementar 2FA en todas tus cuentas y evitar accesos no autorizados a tu información personal.",
    date: "10 mayo, 2025",
    category: "Ciberseguridad",
    readTime: "7 min",
  },
  {
    title: "El impacto de la IA generativa en el diseño web",
    description:
      "Análisis de cómo las herramientas de inteligencia artificial están transformando el proceso creativo en el desarrollo web.",
    date: "5 mayo, 2025",
    category: "Inteligencia Artificial",
    readTime: "8 min",
  },
  {
    title: "Windows 12 vs macOS Sequoia: comparativa exhaustiva",
    description: "Analizamos las fortalezas y debilidades de los últimos sistemas operativos de Microsoft y Apple.",
    date: "1 mayo, 2025",
    category: "Sistemas Operativos",
    readTime: "10 min",
  },
]

export function RecentArticles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Artículos Recientes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mantente al día con las últimas noticias y tutoriales sobre tecnología, seguridad y tendencias digitales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-black/30 backdrop-blur-sm border-cyan-950/50 hover:border-cyan-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-cyan-400">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-lg text-white">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{article.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300 p-0 hover:bg-transparent"
                  >
                    Leer más <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
            Ver todos los artículos
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
