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
  visible: {
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
    items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"],
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
    items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel"],
  },
];

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Freelance & Personal Projects",
    period: "2024 – Present",
    type: "Self-Learning & Freelance",
    description:
      "Building real-world web applications while learning modern development practices. Focused on creating clean, responsive, and user-friendly solutions.",
    points: [
      "Built 10+ projects using React, Next.js, and Tailwind CSS",
      "Developed full-stack apps with Node.js and MongoDB",
      "Implemented responsive designs and modern UI/UX",
      "Deployed applications on Vercel",
    ],
  },
  {
    role: "BCA Student",
    company: "University",
    period: "2021 – 2024",
    type: "Bachelor's Degree",
    description:
      "Completed Bachelor of Computer Applications with strong foundation in programming, data structures, and software development.",
    points: [
      "Learned C, C++, Java, and Python",
      "Studied Data Structures and Algorithms",
      "Completed academic projects",
      "Built problem-solving skills",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Science",
    institution: "University",
    year: "2021 - 2024",
    description: "Completed degree with focus on programming, databases, and software development.",
  },
  {
    degree: "Higher Secondary (12th)",
    field: "Science Stream",
    institution: "School",
    year: "2019 - 2021",
    description: "Foundation in Mathematics and Computer Science.",
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative   ">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Profile Avatar */}
          <motion.div variants={scaleUp} className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1 shadow-2xl shadow-purple-500/25 mt-16  ">
              <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AK
                </span>
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ashahad Khan
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-300 mb-6">
            Full-Stack Web Developer
          </motion.p>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            I am an early-career developer from India with a BCA degree. I started my professional coding journey 
            in 2024 and have been building web applications ever since. I focus on creating clean, responsive, 
            and user-friendly applications using modern technologies like React, Next.js, and Node.js.
          </motion.p>

          {/* Personal Info Pills */}
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3 mb-10">
            {personalInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:border-purple-500/50 transition-colors"
              >
                <info.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">{info.value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#projects"
              className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              View My Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
              >
                <stat.icon className="w-7 h-7 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT STORY SECTION ==================== */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">My Journey</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              The{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
          </motion.div>

          {/* Story Content */}
          <motion.div variants={stagger} className="space-y-6 text-gray-300 leading-relaxed">
            <motion.p variants={fadeUp}>
              My journey into programming started during my BCA studies when I wrote my first lines of code. 
              What began as academic curiosity quickly became a passion that I pursue every single day.
            </motion.p>

            <motion.p variants={fadeUp}>
              After completing my Bachelor's degree in 2024, I dedicated myself fully to modern web development. 
              I learned React, Next.js, and Node.js through online courses, official documentation, and most 
              importantly - by building real projects.
            </motion.p>

            <motion.p variants={fadeUp}>
              I believe in learning by doing. That&apos;s why I&apos;ve built multiple projects ranging from simple 
              landing pages to full-stack applications with authentication and databases. Every project 
              taught me something new and valuable.
            </motion.p>

            <motion.p variants={fadeUp}>
              As an early-career developer, I bring fresh perspectives, genuine enthusiasm, and a strong 
              hunger to learn and grow. I am actively looking for opportunities to contribute and build 
              meaningful applications.
            </motion.p>

            {/* Quote */}
            <motion.div variants={fadeUp} className="pt-8 border-t border-gray-800">
              <p className="text-center text-purple-400 italic text-lg">
                &quote;;Every expert was once a beginner. I am committed to the journey.&quote;
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section className="py-20 px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Technical Skills</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What I{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Work With
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to build web applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className={`p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 ${category.borderColor} transition-all`}
              >
                <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-gray-800/80 rounded-lg text-sm text-gray-300 border border-gray-700/50 hover:border-purple-500/50 hover:text-white transition-all"
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
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Experience</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
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
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-8 w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2 mt-6 shadow-lg shadow-purple-500/50" />

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                        {exp.period}
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-purple-400 mb-3">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                    {/* Points */}
                    <div className="space-y-2">
                      {exp.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
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
      <section className="py-20 px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Education</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Academic{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Background
              </span>
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-purple-400 text-sm">{edu.field}</p>
                      <p className="text-gray-400 mt-1">{edu.institution}</p>
                      <p className="text-gray-500 text-sm mt-2">{edu.description}</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Work Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ y: -10 }}
                className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 text-center group transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all">
                  <value.icon className="w-7 h-7 text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== HOBBIES SECTION ==================== */}
      <section className="py-20 px-6 bg-gray-900/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Coffee className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Beyond Coding</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hobbies
              </span>
            </h2>
          </motion.div>

          {/* Hobbies */}
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-4 md:gap-6">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all min-w-[110px]"
              >
                <hobby.icon className={`w-9 h-9 ${hobby.color}`} />
                <span className="text-gray-300 font-medium">{hobby.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-24 px-6 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <Rocket className="w-10 h-10 text-purple-400 mx-auto mb-6" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
            Let's{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
            I am actively looking for opportunities to learn, grow, and contribute. 
            Let&apos;s discuss how I can add value to your team or project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/#contact"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#projects"
              className="px-8 py-4 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              View Projects
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex justify-center gap-4 mb-10">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            variants={scaleUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/30 rounded-full"
          >
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Open to Opportunities</span>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}