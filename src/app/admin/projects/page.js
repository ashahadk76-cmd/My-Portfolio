"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
    Pencil, 
    Trash2, 
    ExternalLink, 
    Github, 
    Calendar, 
    Image as ImageIcon,
    Eye 
} from 'lucide-react'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            setIsLoading(true)
            const res = await fetch("/api/project")
            const data = await res.json()

            // Handle different response structures
            const projectsData = data.projects || data.data || data || []
            setProjects(Array.isArray(projectsData) ? projectsData : [])
        } catch (err) {
            console.error("Error fetching projects:", err)
            setError("Failed to load projects")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return

        try {
            const res = await fetch(`/api/project/${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                // Remove from local state
                setProjects(projects.filter(p => p._id !== id))
            } else {
                alert("Failed to delete project")
            }
        } catch (err) {
            console.error("Error deleting project:", err)
            alert("Error deleting project")
        }
    }

    const handleEdit = (id) => {
        router.push(`/admin/projects/add?id=${id}`)
    }

    const handleViewDetails = (id) => {
        router.push(`/details?id=${id}`)
    }

    const handleAddNew = () => {
        router.push('/admin/projects/add')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading projects...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchProjects}
                        className="px-6 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Projects
                            </span>
                        </h1>
                        <p className="text-gray-400">Manage your portfolio projects</p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02] transition-all duration-300"
                    >
                        Add New Project
                    </button>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/50 rounded-3xl border border-gray-800">
                        <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                        <p className="text-gray-400 mb-6">Get started by adding your first project</p>
                        <button
                            onClick={handleAddNew}
                            className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
                        >
                            Add Your First Project
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-gray-800 relative group">
                                    {project.media && project.media.length > 0 ? (
                                        <img
                                            src={project.media[0].url || project.media[0]}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://via.placeholder.com/400x225?text=No+Image"
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                            <ImageIcon className="w-12 h-12 text-gray-600" />
                                        </div>
                                    )}

                                    {/* Hover Actions - Now with 4 buttons */}
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleViewDetails(project._id)}
                                            className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(project._id)}
                                            className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors transform hover:scale-110"
                                            title="Edit"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors transform hover:scale-110"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        {project.proj_Link && (
                                            <a
                                                href={project.proj_Link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors transform hover:scale-110"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold line-clamp-1 flex-1">
                                            {project.title}
                                        </h3>
                                        {/* Quick View Button for Desktop */}
                                        <button
                                            onClick={() => handleViewDetails(project._id)}
                                            className="ml-2 p-2 bg-blue-600/20 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors hidden sm:block"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        {project.duration && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{project.duration}</span>
                                            </div>
                                        )}
                                        {project.githubcodeLink && (
                                            <a
                                                href={project.githubcodeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span>Code</span>
                                            </a>
                                        )}
                                    </div>

                                    {/* Quick Actions for Mobile */}
                                    <div className="grid grid-cols-3 gap-2 md:hidden">
                                        <button
                                            onClick={() => handleViewDetails(project._id)}
                                            className="py-2 bg-blue-600/20 rounded-lg text-blue-400 font-medium hover:bg-blue-600/30 transition-colors text-sm"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(project._id)}
                                            className="py-2 bg-purple-600/20 rounded-lg text-purple-400 font-medium hover:bg-purple-600/30 transition-colors text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            className="py-2 bg-red-600/20 rounded-lg text-red-400 font-medium hover:bg-red-600/30 transition-colors text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}