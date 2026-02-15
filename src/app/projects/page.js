"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Calendar,
  Code2,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Zap,
  Filter,
  FolderOpen,
  Rocket,
  Star,
  Clock,
  Tag
} from "lucide-react";
import Link from "next/link";

export default function page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  // 🔥 FIX 1: API Response handle kiya
  useEffect(() => {
    fetch("/api/project")
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data);
        
        // ✅ Projects nikaalo (array mein convert karo)
        const projectsArray = data.projects || data.data || data || [];
        setProjects(Array.isArray(projectsArray) ? projectsArray : []);
        
        setTimeout(() => setLoading(false), 1500);
      })
      .catch(err => {
        console.error(err);
        setProjects([]);
        setTimeout(() => setLoading(false), 1500);
      });
  }, []);

  // 🔥 FIX 2: Categories auto generate
  const categories = [
    "all",
    ...new Set(projects.map(p => p.category).filter(Boolean))
  ];

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setContentVisible(true), 100);
    }
  }, [loading]);

  // Filter projects
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

  // Stats
  const stats = [
    { number: projects.length || "0", label: "Total Projects", icon: FolderOpen },
    { number: projects.filter(p => p.category === "Full-Stack").length || "5+", label: "Full-Stack", icon: Layers },
    { number: projects.filter(p => p.category === "Frontend").length || "10+", label: "Frontend", icon: Code2 },
    { number: "15+", label: "Technologies Used", icon: Zap },
  ];

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[80px] animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Loader Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-purple-400" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Loading Projects</h2>
          <p className="text-gray-400">Fetching amazing work...</p>

          {/* Loading Bar */}
          <div className="mt-6 w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-loading-bar"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading-bar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-loading-bar {
            animation: loading-bar 1.5s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 pt-20 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]"></div>

        <div
          className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">My Portfolio</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            A collection of real-world applications built with modern technologies,
            best practices, and a passion for clean code.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span>{projects.length} Projects</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Quality Code</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Modern Tech Stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`
                  text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 
                  rounded-2xl border border-gray-700/50
                  hover:border-purple-500/50 transition-all duration-500
                  hover:scale-105 hover:-translate-y-1
                  ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            {/* Filter Label */}
            <div className="flex items-center gap-2 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter by category</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`
                    px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                    ${activeFilter === category
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50 hover:border-purple-500/50'
                    }
                  `}
                >
                  <span className="capitalize">{category}</span>
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className={`
                    group relative bg-gradient-to-br from-gray-900 to-gray-800 
                    rounded-2xl border border-gray-700/50 overflow-hidden 
                    hover:border-purple-500/50 transition-all duration-500 
                    hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10
                    ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="h-52 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 relative overflow-hidden">
                    {project.media?.length > 0 ? (
                      <img
                        src={project.media[0].url || project.media[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/600x400/1a1a1a/white?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Layers className="w-20 h-20 text-gray-700" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70"></div>

                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Hover View Button */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredProject === project._id ? 'opacity-100' : 'opacity-0'}`}>
                      <Link href={`/details?id=${project._id}`}>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 cursor-pointer">
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium">View Details</span>
                        </div>
                      </Link>
                    </div>
                    
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-2">
                      {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4">
                      {project.duration && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs">{project.duration}</span>
                        </div>
                      )}
                      {project.techStack?.length > 0 && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Tag className="w-3.5 h-3.5" />
                          <span className="text-xs">{project.techStack.length} techs</span>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-gray-800/80 rounded-lg text-xs text-purple-300 border border-gray-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2.5 py-1 bg-gray-800/80 rounded-lg text-xs text-gray-400 border border-gray-700/50">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.proj_Link && (
                        <a
                          href={project.proj_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.githubcodeLink && (
                        <a
                          href={project.githubcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800/80 border border-gray-700/50 rounded-xl text-sm font-medium hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Decorative Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                <Code2 className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No Projects Found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                {activeFilter === "all"
                  ? "No projects added yet. Check back soon for amazing work!"
                  : `No ${activeFilter} projects available. Try selecting a different category.`
                }
              </p>
              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>View All Projects</span>
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {filteredProjects.length > 6 && (
            <div className="text-center mt-16">
              <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-700 rounded-full font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 group">
                <span>Load More Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Technologies</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built With <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Modern Tech</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tools and technologies I use to build amazing projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express",].map((tech, index) => (
              <div
                key={tech}
                className="px-5 py-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span className="text-gray-300 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-purple-400 mb-4">
            <Rocket className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Let&apos;s Collaborate</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Have a <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Project Idea?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            I&apos;m always excited to work on new projects and bring creative ideas to life.
            Let&apos;s build something amazing together!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-700 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
            >
              <span>About Me</span>
            </Link>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-500"></div>
            <Star className="w-5 h-5 text-purple-400" />
            <div className="h-px w-24 bg-gradient-to-r from-purple-500 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx global>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}