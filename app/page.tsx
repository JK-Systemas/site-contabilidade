"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Mail, Phone, MapPin, Menu, X } from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-black cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            Helena Esteves
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Sobre Mim
            </button>
            <button
              onClick={() => scrollToSection("trabalhos")}
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Trabalhos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-black hover:text-gray-600 transition-colors font-medium"
            >
              Contatos
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-black hover:text-gray-600 transition-colors font-medium text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-black hover:text-gray-600 transition-colors font-medium text-left"
              >
                Sobre Mim
              </button>
              <button
                onClick={() => scrollToSection("trabalhos")}
                className="text-black hover:text-gray-600 transition-colors font-medium text-left"
              >
                Trabalhos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-black hover:text-gray-600 transition-colors font-medium text-left"
              >
                Contatos
              </button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

function AnimatedSection({
  children,
  className = "",
  animation = fadeInUp,
  id,
}: {
  children: React.ReactNode
  className?: string
  animation?: any
  id?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={animation.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f5f1eb]">
      <Header />
      {/* Hero Section */}
      <AnimatedSection id="hero" className="container mx-auto px-6 py-16 pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
          <motion.div className="lg:w-1/2 mb-8 lg:mb-0" variants={staggerContainer} initial="initial" animate="animate">
            <motion.h1 className="text-6xl lg:text-8xl font-light text-[#c4a484] mb-2" variants={fadeInLeft}>
              Helena
            </motion.h1>
            <motion.h2 className="text-6xl lg:text-8xl font-bold text-black mb-8" variants={fadeInLeft}>
              Esteves
            </motion.h2>
            <motion.p className="text-sm text-gray-600 mb-6 max-w-xs" variants={fadeInLeft}>
              PORTFÓLIO DE FOTOGRAFIA
              <br />
              DE INTERIORES
            </motion.p>
            <motion.button
              className="text-sm text-[#c4a484] border-b border-[#c4a484] pb-1 hover:opacity-70 transition-opacity"
              variants={fadeInLeft}
            >
              ENTRE EM CONTATO
            </motion.button>
          </motion.div>
          <motion.div
            className="lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-80 h-80 rounded-full overflow-hidden">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Helena Esteves"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about" className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          <motion.div className="lg:w-1/2 mb-8 lg:mb-0" variants={fadeInLeft}>
            <h2 className="text-5xl lg:text-6xl font-light text-black mb-2">Sobre</h2>
            <h3 className="text-5xl lg:text-6xl font-light text-[#c4a484] mb-8">mim</h3>
          </motion.div>
          <motion.div className="lg:w-1/2 flex flex-col items-center" variants={fadeInRight}>
            <div className="w-64 h-80 rounded-t-full overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=320&width=256"
                alt="Helena Esteves"
                width={256}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-xs text-center leading-relaxed">
              Descobri meu amor pela fotografia de interiores quando percebi minha paixão por capturar a essência dos
              espaços. Cada ambiente conta uma história única, e meu trabalho é dar vida a essa narrativa através das
              lentes.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Featured Works Section */}
      <AnimatedSection id="trabalhos" className="container mx-auto px-6 py-16">
        <motion.div className="max-w-6xl mx-auto" variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp}>
            <h2 className="text-5xl lg:text-6xl font-light text-black mb-2">Trabalhos</h2>
            <h3 className="text-5xl lg:text-6xl font-light text-black mb-12">em destaque</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeInLeft}>
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Interior Design 1"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">
                <strong>Projeto Apartamento</strong>
                <br />
                Porto, 2023
              </p>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Interior Design 2"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">
                <strong>Design Loja Pedro</strong>
                <br />
                Lisboa, 2023
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Philosophy Section */}
      <AnimatedSection className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          <motion.div className="lg:w-1/2 mb-8 lg:mb-0 pr-0 lg:pr-12" variants={fadeInLeft}>
            <p className="text-2xl lg:text-3xl font-light text-black leading-relaxed">
              Adoro capturar a essência e a beleza de um espaço como deveria ser, ou como um lugar cheio de potencial.
            </p>
          </motion.div>
          <motion.div className="lg:w-1/2" variants={fadeInRight}>
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Interior space"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Foto e Produção:
              <br />
              Helena Esteves
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Portfolio Grid */}
      <AnimatedSection className="container mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInLeft}>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Interior 3"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              <strong>Projeto Harmonia Casa</strong>
              <br />
              Porto, 2023
            </p>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Interior 4"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">
              <strong>Cozinha da Maria</strong>
              <br />
              Lisboa, 2023
            </p>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
          <motion.div className="lg:w-1/2 mb-8 lg:mb-0" variants={fadeInLeft}>
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=500&width=375"
                alt="Helena working"
                width={375}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div className="lg:w-1/2 lg:pl-16" variants={fadeInRight}>
            <h2 className="text-5xl lg:text-6xl font-light text-black mb-12">Experiência</h2>

            <div className="space-y-8">
              <div>
                <p className="text-[#c4a484] text-sm font-medium mb-1">FOTÓGRAFA AUTÔNOMA</p>
                <p className="text-black font-medium">2018 - Atual</p>
              </div>

              <div>
                <p className="text-[#c4a484] text-sm font-medium mb-1">ASSISTENTE DE FOTOGRAFIA</p>
                <p className="text-black font-medium">2015 - 2018, Bel e Roberto</p>
              </div>

              <div>
                <p className="text-[#c4a484] text-sm font-medium mb-1">ASSISTENTE DE FOTOGRAFIA</p>
                <p className="text-black font-medium">2014 - 2015, Estúdio Criativo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          <motion.div className="lg:w-1/2 mb-8 lg:mb-0" variants={fadeInLeft}>
            <h2 className="text-5xl lg:text-6xl font-light text-black mb-2">Entre em</h2>
            <h3 className="text-5xl lg:text-6xl font-light text-[#c4a484] mb-12">contato</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#c4a484]" />
                <div>
                  <p className="text-sm text-gray-600">ENDEREÇO</p>
                  <p className="text-black">Rua Qualquer, 123, Cidade Qualquer - PO</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#c4a484]" />
                <div>
                  <p className="text-sm text-gray-600">TELEFONE</p>
                  <p className="text-black">(11) 9.9999-9999</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#c4a484]" />
                <div>
                  <p className="text-sm text-gray-600">E-MAIL</p>
                  <p className="text-black">helena@helenaesteves.com.br</p>
                </div>
              </div>
            </div>
            <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg transition-colors font-medium"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Contactar Serviço</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="lg:w-1/2 flex justify-center lg:justify-end" variants={fadeInRight}>
            <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Interior space"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  )
}
