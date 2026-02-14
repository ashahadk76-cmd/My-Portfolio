"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
    PlusCircle,
    Upload,
    Calendar,
    Image as ImageIcon,
    Github,
    ExternalLink,
    CheckCircle,
    XCircle,
    Loader2,
    Pencil
} from 'lucide-react'

// Create a separate component that uses useSearchParams
function ProjectFormContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const projectId = searchParams.get('id')

    const [data, setData] = useState({
        title: "",
        description: "",
        proj_Link: "",
        githubcodeLink: "",
        duration: ""
    })

    const [existingMedia, setExistingMedia] = useState([])
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [fetchError, setFetchError] = useState(null)

    const isEditing = !!projectId

    // Fetch project data if editing
    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) return

            setIsLoading(true)
            setFetchError(null)

            try {
                const response = await fetch(`/api/project/${projectId}`)
                const result = await response.json()

                if (response.ok) {
                    // Handle different possible response structures
                    const projectData = result.project || result.data || result

                    setData({
                        title: projectData.title || "",
                        description: projectData.description || "",
                        proj_Link: projectData.proj_Link || "",
                        githubcodeLink: projectData.githubcodeLink || "",
                        duration: projectData.duration || ""
                    })

                    // Store existing media if available
                    if (projectData.media) {
                        setExistingMedia(projectData.media)
                    }
                } else {
                    setFetchError(result.message || "Failed to load project data")
                }
            } catch (error) {
                console.error("Error fetching project:", error)
                setFetchError("Error loading project data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProject()
    }, [projectId])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const formdata = new FormData()

            // Append all text fields
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    formdata.append(key, data[key])
                }
            })

            // Append new files
            files.forEach(file => {
                formdata.append("media", file)
            })

            const url = isEditing ? `/api/project/${projectId}` : "/api/project"
            const method = isEditing ? "PATCH" : "POST"

            const response = await fetch(url, {
                method: method,
                body: formdata,
            })

            const result = await response.json()

            if (response.ok) {
                setSubmitStatus("success")

                // Reset form after successful submission (only for new projects)
                if (!isEditing) {
                    setData({
                        title: "",
                        description: "",
                        proj_Link: "",
                        githubcodeLink: "",
                        duration: ""
                    })
                    setFiles([])
                }

                // Redirect to projects dashboard after 1.5 seconds
                setTimeout(() => {
                    router.push('/admin/projects')
                }, 1500)
            } else {
                setSubmitStatus("error")
                console.error("Server error:", result)
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} project:`, error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-gray-400">Loading project data...</p>
                </div>
            </div>
        )
    }

    // Error state for fetching
    if (fetchError) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Error Loading Project</h2>
                    <p className="text-gray-400 mb-6">{fetchError}</p>
                    <button
                        onClick={() => router.push('/admin/projects')}
                        className="px-6 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                        {isEditing ? (
                            <Pencil className="w-7 h-7 text-purple-400" />
                        ) : (
                            <PlusCircle className="w-7 h-7 text-purple-400" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {isEditing ? 'Edit' : 'Add New'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Project
                            </span>
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {isEditing ? 'Update your project details' : 'Add your latest project to the portfolio'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">
                        Project {isEditing ? 'updated' : 'added'} successfully! Redirecting...
                    </span>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">
                        Failed to {isEditing ? 'update' : 'add'} project. Please try again.
                    </span>
                </div>
            )}

            {/* Form Container */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-3">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span>Project Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                            placeholder="Enter project title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-3">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            <span>Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 resize-none"
                            placeholder="Describe your project..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Duration */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 mb-3">
                                <Calendar className="w-4 h-4 text-purple-400" />
                                <span>Duration</span>
                            </label>
                            <input
                                type="text"
                                name="duration"
                                value={data.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                                placeholder="e.g., 2 months"
                            />
                        </div>

                        {/* Media Upload */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 mb-3">
                                <ImageIcon className="w-4 h-4 text-purple-400" />
                                <span>Media Files {isEditing && '(Upload new to replace)'}</span>
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                            />
                            {/* Show existing media count when editing */}
                            {isEditing && existingMedia.length > 0 && (
                                <p className="mt-2 text-sm text-gray-400">
                                    {existingMedia.length} existing media file(s)
                                </p>
                            )}
                            {/* Show selected files */}
                            {files.length > 0 && (
                                <p className="mt-2 text-sm text-purple-400">
                                    {files.length} new file(s) selected
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Project Link */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 mb-3">
                                <ExternalLink className="w-4 h-4 text-purple-400" />
                                <span>Live Demo URL</span>
                            </label>
                            <input
                                type="url"
                                name="proj_Link"
                                value={data.proj_Link}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                                placeholder="https://your-project.com"
                            />
                        </div>

                        {/* GitHub Link */}
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 mb-3">
                                <Github className="w-4 h-4 text-purple-400" />
                                <span>GitHub Repository</span>
                            </label>
                            <input
                                type="url"
                                name="githubcodeLink"
                                value={data.githubcodeLink}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                                placeholder="https://github.com/username/project"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 
                                transition-all duration-300
                                ${isSubmitting
                                    ? 'bg-gray-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02]'
                                }
                            `}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{isEditing ? 'Updating' : 'Adding'} Project...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    <span>{isEditing ? 'Update' : 'Add'} Project</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Note */}
            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    {isEditing
                        ? 'Changes will be reflected in your portfolio after update'
                        : 'Project will appear in your portfolio after submission'
                    }
                </p>
            </div>
        </div>
    )
}

// Main page component with Suspense
export default function ProjectFormPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white py-20 px-4">
            <Suspense fallback={
                <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                        <p className="text-gray-400">Loading form...</p>
                    </div>
                </div>
            }>
                <ProjectFormContent />
            </Suspense>
        </main>
    )
}