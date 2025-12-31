"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  Coffee,
  Gamepad2,
  Music,
  BookOpen,
  Users,
  Target,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  FolderGit2,
  Heart,
  Rocket,
} from "lucide-react";

// ==================== ANIMATION VARIANTS ====================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
};

// ==================== DATA ====================
const personalInfo = [
  { value: "Ashahad Khan", icon: Users },
  { value: "India", icon: MapPin },
  { value: "1+ Year Experience", icon: Briefcase },
  { value: "ashahad@example.com", icon: Mail },
];

const stats = [
  { number: "10+", label: "Projects Built", icon: FolderGit2 },
  { number: "1+", label: "Year Experience", icon: Calendar },
  { number: "15+", label: "Technologies", icon: Code2 },
  { number: "100%", label: "Commitment", icon: Rocket },
];

const skills = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-400",
    borderColor: "hover:border-blue-500/50",
    items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    color: "from-green-500 to-emerald-400",
    borderColor: "hover:border-green-500/50",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    title: "Database",
    color: "from-purple-500 to-pink-400",
    borderColor: "hover:border-purple-500/50",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  {
    title: "Tools",
    color: "from-orange-500 to-yellow-400",
    borderColor: "hover:border-orange-500/50",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
];
const experiences = [
  {
    role: "MERN Stack Web Developer",
    company: "Personal & Academic Projects",
    period: "2024 – Present",
    type: "Hands-on Project Experience",
    description:
      "Working as a full-stack MERN developer by building real-world web applications while pursuing my BCA degree. Focused on writing clean, scalable, and user-friendly solutions.",
    points: [
      "Built 10+ full-stack projects using MongoDB, Express.js, React, and Node.js",
      "Implemented authentication, authorization, and RESTful APIs",
      "Designed responsive and modern user interfaces using Tailwind CSS",
      "Deployed and managed applications on platforms like Vercel",
    ],
  },
];


const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science",
    institution: "University",
    year: "2023 – Present (2nd Year)",
    description:
      "Currently pursuing BCA with a strong focus on programming fundamentals, data structures, databases, and software development alongside hands-on web development.",
  },
  {
    degree: "Higher Secondary (12th)",
    field: "Science Stream",
    institution: "School",
    year: "2021 – 2023",
    description:
      "Developed a solid foundation in Mathematics and Computer Science.",
  },
];

const values = [
  {
    title: "Clean Code",
    description: "Writing readable and maintainable code.",
    icon: Code2,
  },
  {
    title: "Always Learning",
    description: "Improving skills every single day.",
    icon: Lightbulb,
  },
  {
    title: "Problem Solving",
    description: "Finding simple solutions to complex problems.",
    icon: Target,
  },
  {
    title: "User Focused",
    description: "Building apps that users love to use.",
    icon: Users,
  },
];

const hobbies = [
  { name: "Coding", icon: Code2, color: "text-blue-400" },
  { name: "Gaming", icon: Gamepad2, color: "text-green-400" },
  { name: "Music", icon: Music, color: "text-purple-400" },
  { name: "Reading", icon: BookOpen, color: "text-orange-400" },
  { name: "Coffee", icon: Coffee, color: "text-yellow-400" },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

// ==================== COMPONENT ====================
export default function About() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] z-50 flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 p-1 shadow-2xl shadow-purple-500/25">
              <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AK
                </span>
              </div>
            </div>

            {/* Orbital Dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full" />
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              />
            </div>
          </div>

          {/* Loading Text with Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-2"
          >
            <h3 className="text-xl font-semibold text-white">
              Loading Portfolio
            </h3>
            <p className="text-gray-400 text-sm">
              Crafting the experience...
            </p>
          </motion.div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full " />
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 pt-20 md:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Profile Avatar */}
          <motion.div variants={scaleUp} className="mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1 shadow-2xl shadow-purple-500/25">
              <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AK
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-3xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ashahad Khan
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-300 mb-6">
            Full-Stack Web Developer
          </motion.p>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 px-4">
            I am a BCA student and early-career web developer from India. I started my development journey in 2024 and build clean, responsive, and user-friendly web applications using modern technologies like React, Next.js, and Node.js.
          </motion.p>

          {/* Personal Info Pills */}
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 px-4">
            {personalInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-purple-500/50 transition-colors"
              >
                <info.icon className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                <span className="text-xs md:text-sm text-gray-300">{info.value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
            <Link
              href="/projects"
              className="group px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              View My Projects
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all text-sm md:text-base"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
              >
                <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-purple-400 mx-auto mb-2 md:mb-3" />
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT STORY SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">My Journey</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold">
              The{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
          </motion.div>

          {/* Story Content */}
          <motion.div variants={stagger} className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed">
            <motion.p variants={fadeUp}>
              My journey into programming started during my BCA studies when I wrote my first lines of code. What began as academic curiosity quickly grew into a passion that I pursue every day.
            </motion.p>

            <motion.p variants={fadeUp}>
              I am currently pursuing a Bachelor of Computer Applications (BCA) and actively focusing on modern web development. I have been learning and building projects using technologies like React, Next.js, and Node.js through online courses, documentation, and hands-on practice.
            </motion.p>

            <motion.p variants={fadeUp}>
              I believe in learning by doing, which has led me to build multiple projects ranging from simple landing pages to full-stack applications with authentication and databases. Each project has strengthened my problem-solving skills and practical understanding.

            </motion.p>

            <motion.p variants={fadeUp}>
              As an early-career developer, I bring a strong willingness to learn, attention to detail, and enthusiasm for building clean, responsive, and user-friendly web applications. I am actively seeking opportunities to grow, contribute, and gain real-world experience.
            </motion.p>

            {/* Quote */}
            <motion.div variants={fadeUp} className="pt-6 md:pt-8 border-t border-gray-800">
              <p className="text-center text-purple-400 italic text-base md:text-lg">
                &quot;Focused on continuous learning and building real-world web applications&quot;
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <Code2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">Technical Skills</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4">
              What I{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Work With
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              Technologies and tools I use to build web applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className={`p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 ${category.borderColor} transition-all`}
              >
                <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {category.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1.5 md:px-3 md:py-2 bg-gray-800/80 rounded-lg text-xs md:text-sm text-gray-300 border border-gray-700/50 hover:border-purple-500/50 hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">Experience</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500" />

            {/* Experience Cards */}
            <div className="space-y-6 md:space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="relative pl-10 md:pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-8 w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full -translate-x-1/2 mt-4 md:mt-6 shadow-lg shadow-purple-500/50" />

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                        {exp.period}
                      </span>
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-purple-400 text-sm md:text-base mb-3">{exp.company}</p>
                    <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">{exp.description}</p>

                    {/* Points */}
                    <div className="space-y-1.5 md:space-y-2">
                      {exp.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-1.5 md:gap-2 text-xs md:text-sm text-gray-300">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== EDUCATION SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">Education</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Academic{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Background
              </span>
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-4 md:space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-purple-500/20 rounded-xl flex-shrink-0">
                      <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-purple-400 text-xs md:text-sm">{edu.field}</p>
                      <p className="text-gray-400 text-sm md:text-base mt-1">{edu.institution}</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-2">{edu.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 text-gray-300 rounded-lg text-xs md:text-sm whitespace-nowrap mt-3 md:mt-0">
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">Work Philosophy</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 text-center group transition-all"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all">
                  <value.icon className="w-5 h-5 md:w-7 md:h-7 text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2">{value.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== HOBBIES SECTION ==================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-3 md:mb-4">
              <Coffee className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">Beyond Coding</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hobbies
              </span>
            </h2>
          </motion.div>

          {/* Hobbies */}
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3 md:gap-6">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all min-w-[90px] md:min-w-[110px]"
              >
                <hobby.icon className={`w-7 h-7 md:w-9 md:h-9 ${hobby.color}`} />
                <span className="text-sm md:text-base text-gray-300 font-medium">{hobby.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/10 rounded-full blur-[100px] md:blur-[150px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mx-auto mb-4 md:mb-6" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-2xl md:text-5xl font-bold mb-3 md:mb-4">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg max-w-xl mx-auto">
            I am actively looking for opportunities to learn, grow, and contribute.
            Let&apos;s discuss how I can add value to your team or project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <Link
              href="/contact"
              className="group px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              Get In Touch
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 md:px-8 md:py-4 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              <FolderGit2 className="w-3 h-3 md:w-4 md:h-4" />
              View Projects
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-10">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            variants={scaleUp}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-green-500/10 border border-green-500/30 rounded-full"
          >
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm text-green-400 font-medium">Open to Opportunities</span>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}