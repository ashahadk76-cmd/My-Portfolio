"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ImageSlider from "@/component/ImageSlider";
import {
  Calendar,
  Github,
  ExternalLink,
  ArrowLeft,
  Loader2,
  Globe,
  Clock,
  Tag,
  Share2,
  Link2,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Create a separate component that uses useSearchParams
function ProjectDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("No project ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(`/api/project/${id}`);
        const data = await res.json();

        if (res.ok) {
          // Handle different response structures
          const projectData = data.project || data.data || data;
          setProject(projectData);
        } else {
          setError(data.message || "Failed to load project");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error loading project details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = () => {
    if (!project) return;
    
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 p-8 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">{error || "The project you're looking for doesn't exist or has been removed."}</p>
          <Link
            href="/"
            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Back Button */}
      <div className="pt-20 mb-8 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        
        {/* Breadcrumb - Using Link with href or just text if no route */}
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/admin/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
          <span className="mx-2">/</span>
          <span className="text-purple-400 truncate max-w-[150px] inline-block align-bottom">
            {project.title}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Column - Media Slider */}
        <div className="space-y-4">
          <div className="lg:sticky lg:top-24">
            <ImageSlider media={project.media || []} />
            
            {/* Project Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700/50 p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {project.media?.length || 0}
                </div>
                <div className="text-xs text-gray-400">Media Files</div>
              </div>
              {project.views && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700/50 p-3 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{project.views}</div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
              )}
              {project.likes && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700/50 p-3 text-center">
                  <div className="text-2xl font-bold text-pink-400">{project.likes}</div>
                  <div className="text-xs text-gray-400">Likes</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Project Details */}
        <div className="space-y-6">
          {/* Title & Description */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 p-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {project.title}
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {project.duration && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold">Duration</h3>
                </div>
                <p className="text-gray-300 text-lg">{project.duration}</p>
              </div>
            )}

            {project.proj_Link && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold">Live Demo</h3>
                </div>
                <a
                  href={project.proj_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 group truncate"
                >
                  <span className="truncate">{project.proj_Link.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>
              </div>
            )}

            {project.githubcodeLink && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Github className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="font-semibold">Source Code</h3>
                </div>
                <a
                  href={project.githubcodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 group truncate"
                >
                  <span className="truncate">{project.githubcodeLink.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </a>
              </div>
            )}
          </div>

          {/* Tags Section */}
          {project.tags && project.tags.length > 0 && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-400" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 hover:bg-purple-500/20 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {project.proj_Link ? (
              <a
                href={project.proj_Link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            ) : (
              <button
                disabled
                className="flex-1 py-4 bg-gray-700 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2 opacity-50"
              >
                <ExternalLink className="w-5 h-5" />
                No Live Demo
              </button>
            )}
            
            <button
              onClick={handleShare}
              className="px-6 py-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors relative group"
              title="Share project"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {copied ? 'Copied!' : 'Share'}
              </span>
            </button>
          </div>

          {/* Additional Metadata */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Added on {new Date(project.createdAt || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              {project.updatedAt && project.updatedAt !== project.createdAt && (
                <div className="flex items-center gap-2">
                  <span>Updated on {new Date(project.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              
              {project._id && (
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  <span className="font-mono">ID: {project._id.slice(-6)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Projects Link */}
          <div className="text-center">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      }>
        <ProjectDetailsContent />
      </Suspense>
    </main>
  );
}