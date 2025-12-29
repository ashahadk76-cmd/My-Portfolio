"use client"
import { useState } from 'react'
import { 
  PlusCircle, 
  Upload, 
  Link as LinkIcon, 
  Calendar, 
  Image as ImageIcon,
  Github,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'

const AdminPage = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        proj_Link: "",
        githubcodeLink: "",
        duration: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formdata = new FormData();
        formdata.append("description", data.description);
        formdata.append("duration", data.duration);
        formdata.append("githubcodeLink", data.githubcodeLink);
        formdata.append("imageUrl", data.imageUrl);
        formdata.append("proj_Link", data.proj_Link);
        formdata.append("title", data.title);

        try {
            const response = await fetch("/api/project", {
                method: "POST",
                body: formdata,
            });
            
            const result = await response.json();
            
            if (result.success) {
                setSubmitStatus('success');
                setData({
                    title: "",
                    description: "",
                    imageUrl: "",
                    proj_Link: "",
                    githubcodeLink: "",
                    duration: ""
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error("Error adding project:", error);
        } finally {
            setIsSubmitting(false);
            
            // Reset status after 3 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
        }
    }

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white py-35 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                            <PlusCircle className="w-7 h-7 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Project</span></h1>
                            <p className="text-gray-400 mt-1">Add your latest project to the portfolio</p>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400">Project added successfully!</span>
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400">Failed to add project. Please try again.</span>
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

                            {/* Image URL */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-300 mb-3">
                                    <ImageIcon className="w-4 h-4 text-purple-400" />
                                    <span>Image URL</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="imageUrl" 
                                    value={data.imageUrl} 
                                    onChange={handleChange} 
                                    required
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                                    placeholder="https://example.com/image.jpg"
                                />
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
                                    type="text" 
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
                                    type="text" 
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
                                        <span>Adding Project...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5" />
                                        <span>Add Project to Portfolio</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Note */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Project will appear in your portfolio after submission
                    </p>
                </div>
            </div>
        </main>
    )
}

export default AdminPage