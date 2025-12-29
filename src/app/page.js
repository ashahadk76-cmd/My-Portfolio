"use client"
import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github, Linkedin, Mail, ArrowRight, Download, ChevronDown,
  Code2, Server, Database, Palette, Zap, Layers, Send
} from 'lucide-react'

import CVDownload from '@/component/cvdownload'
import HireMe from '@/component/Hireme'
export default function Home() {
  const [loading, setLoading] = useState(true)
  const [scrollKey, setScrollKey] = useState(0)
  const [openHire, setOpenHire] = useState(false);


  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Skills data
  const mainSkills = [
    { name: "Frontend", color: "from-blue-500 to-cyan-400", icon: Code2 },
    { name: "Backend", color: "from-green-500 to-emerald-400", icon: Server },
    { name: "Database", color: "from-purple-500 to-pink-400", icon: Database },
    { name: "UI/UX", color: "from-orange-500 to-yellow-400", icon: Palette },
  ]

  // LOADER - Fixed aur better
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative overflow-hidden  ">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[80px] animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div
                className="absolute inset-4 border-4 border-transparent border-t-cyan-500 rounded-full"
                style={{
                  animationName: 'spin',
                  animationDuration: '1.5s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDirection: 'reverse'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AK</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Ashahad Khan</h2>
          <p className="text-gray-400 mb-6">Full-Stack Developer</p>

          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-loading"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden pt-20 ">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0  bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Available for new projects</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            A curated portfolio showcasing real-world experience <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">, problem-solving, and scalable digital solutions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white  text-2xl md:text-xl mb-8   "
          >
            I&apos;m Ashahad Khan, a passionate Full Stack Developer crafting scalable, high-performance web applications with modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              onClick={() => setOpenHire(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold flex items-center gap-2 text-white"
            >
              Hire Me
            </motion.button>
            <HireMe
              isOpen={openHire}
              onClose={() => setOpenHire(false)}
            />


            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/cv.pdf"
              className="px-8 py-3 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" /> Download CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4"
          >
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/ashahadk76-cmd"
                className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </section>

      {/* SKILLS SECTION - REPEATED ANIMATIONS */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            key={`title-${scrollKey}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            My <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
          </motion.h2>

          <motion.p
            key={`subtitle-${scrollKey}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
          >
            Specialized in modern web technologies and frameworks
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {mainSkills.map((skill, index) => (
              <motion.div
                key={`skill-${skill.name}-${scrollKey}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                viewport={{
                  once: false,
                  amount: 0.2,
                  margin: "-100px"
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}
                  >
                    <skill.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{skill.name} Development</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Building scalable and performant applications
                    </p>
                  </div>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className={`text-2xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  >
                    {skill.level}
                  </motion.span>
                </div>

                {/* PROGRESS BAR - REPEATS ON SCROLL */}
              
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["React", "Next.js", "JavaScript", "Node.js"].slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm text-gray-300 border border-gray-700/50"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ADDITIONAL SKILLS */}
          <motion.div
            key={`additional-${scrollKey}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              Technical <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { name: "JavaScript", level: 95 },
              
                { name: "React/Next.js", level: 92 },
                { name: "Node.js", level: 88 },
                { name: "Python", level: 80 },
                { name: "MongoDB", level: 85 },
                
                { name: "Tailwind", level: 95 },
              ].map((skill, i) => (
                <motion.div
                  key={`extra-${skill.name}-${scrollKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-purple-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.1, duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4">
        <motion.div
          key={`about-${scrollKey}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 text-purple-400 mb-6">
            <Layers className="w-6 h-6" />
            <span className="font-medium uppercase tracking-wider">About Me</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Passionate Developer & <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Problem Solver</span>
          </h2>

          <div className="space-y-4 text-gray-400 text-lg">
            <p>
              Hello! I&apos;m <span className="text-white font-semibold">Ashahad Khan</span>,
              a passionate full-stack developer with experience in building modern web applications.
            </p>
            <p>
              I specialize in creating scalable, performant, and user-friendly applications
              using cutting-edge technologies like React, Next.js, Node.js, and modern databases.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { number: "50+", label: "Projects" },
              { number: "30+", label: "Clients" },
              { number: "3+", label: "Years Exp" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TEST BUTTON FOR SCROLL */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setScrollKey(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold shadow-lg"
        >
          Scroll to Top
        </motion.button>
      </div>
    </main>
  )
}