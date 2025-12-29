"use client"

import React from 'react'
import Link from 'next/link'
import { 
  Heart, 
  Coffee, 
  Code2, 
  Home, 
  User, 
  FolderKanban, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  ArrowUp,
  Terminal
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Skills', path: '/skills', icon: Code2 },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  ]

  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 to-[#0a0a0f] border-t border-gray-800/50 ">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Ashahad Khan
                </h2>
                <p className="text-sm text-gray-400">Full-stack Developer</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm max-w-md text-center md:text-left">
              Building modern web applications with cutting-edge technologies
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <link.icon className="w-4 h-4 group-hover:text-purple-400" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Built With */}
          <div className="flex items-center gap-2 text-gray-400">
            <Code2 className="w-4 h-4" />
            <span className="text-sm">
              Built with <span className="text-cyan-400 font-medium">Next.js</span> & 
              <span className="text-purple-400 font-medium"> Tailwind CSS</span>
            </span>
          </div>

          {/* Made With Love */}
          <div className="flex items-center gap-2 text-gray-400">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm">Made with passion</span>
            <Coffee className="w-4 h-4 text-yellow-400" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Ashahad Khan. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-sm">Back to Top</span>
          </button>
        </div>

        {/* Extra Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Designed with attention to detail • Optimized for performance • Responsive across devices
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer