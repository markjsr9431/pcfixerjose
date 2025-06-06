"use client"

import { HeroSection } from "@/components/hero-section"
import { ContentBlocks } from "@/components/content-blocks"
import { ImageGallery } from "@/components/image-gallery"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"
import { FloatingButton } from "@/components/floating-button"
import { FloatingHeader } from "@/components/floating-header"
import { useLanguage } from "@/hooks/use-language"

export default function Home() {
  const { language, setLanguage } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <FloatingHeader language={language} setLanguage={setLanguage} />
      <section id="hero">
        <HeroSection language={language} />
      </section>
      <section id="content">
        <ContentBlocks language={language} />
      </section>
      <section id="gallery">
        <ImageGallery language={language} />
      </section>
      <section id="services">
        <ServicesSection language={language} />
      </section>
      <section id="contact">
        <Footer language={language} />
      </section>
      <FloatingButton language={language} />
    </main>
  )
}
