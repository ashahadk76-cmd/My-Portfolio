"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Home, 
  User, 
  Code2, 
  FolderKanban, 
  Mail, 
  Menu, 
  X,
  LayoutDashboard,
  LogOut,
  Zap,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminToken = localStorage.getItem('adminToken')
      setIsAdmin(!!adminToken)
    }

    checkAdminStatus()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Skills', path: '/skills', icon: Code2 },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.href = '/'
  }

  const socialLinks = [
    { icon: Github, url: '#', label: 'GitHub' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Twitter, url: '#', label: 'Twitter' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-gray-800/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={() => setActiveLink('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                <span className="text-xl font-bold text-white">AK</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>
            
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ashahad Khan
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Full-stack Developer
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setActiveLink(item.name.toLowerCase())}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl
                    transition-all duration-300 relative group
                    ${activeLink === item.name.toLowerCase()
                      ? 'text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${activeLink === item.name.toLowerCase() ? 'text-purple-400' : ''}`} />
                  <span className="font-medium">{item.name}</span>
                  
                  {activeLink === item.name.toLowerCase() && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                  )}
                </Link>
              )
            })}

            {/* ONLY SHOW ADMIN DASHBOARD & LOGOUT IF LOGGED IN */}
            {isAdmin && (
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href="/admin/dashboard"
                  className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-400 hover:bg-green-500/30 transition-all duration-300 group"
                  aria-label="Admin Dashboard"
                >
                  <LayoutDashboard className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 hover:border-red-400 hover:bg-red-500/30 transition-all duration-300 group"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-400 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Only show admin buttons if logged in (mobile) */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                  aria-label="Dashboard"
                >
                  <LayoutDashboard className="w-5 h-5 text-green-400" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                </button>
              </div>
            ) : null}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-slideDown">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-4 backdrop-blur-xl shadow-xl">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => {
                        setActiveLink(item.name.toLowerCase())
                        setIsOpen(false)
                      }}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-300
                        ${activeLink === item.name.toLowerCase()
                          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${activeLink === item.name.toLowerCase() ? 'text-purple-400' : 'text-gray-400'}`} />
                      <span className="font-medium">{item.name}</span>
                      
                      {activeLink === item.name.toLowerCase() && (
                        <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  )
                })}

                {/* Only show admin link if logged in (mobile) */}
                {isAdmin && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30 hover:bg-green-500/30 transition-all"
                    >
                      <LayoutDashboard className="w-5 h-5 text-green-400" />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white border border-red-500/30 hover:bg-red-500/30 transition-all"
                    >
                      <LogOut className="w-5 h-5 text-red-400" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                )}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a 
                        key={social.label}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-purple-500/20 transition-all"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-gray-400 hover:text-white" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </header>
  )
}

export default Navbar