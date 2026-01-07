"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

const DeleteProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/project");
                const data = await res.json();
                setProjects(data || []); // safe
            } catch (err) {
                console.error(err);
                alert("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Delete project
    const deleteProject = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/project/${String(id)}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                setProjects((prev) => prev.filter((p) => p._id !== id));
            } else {
                alert(data.message || "Delete failed");
            }
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Remove <span className="text-red-400">Projects</span>
                </h1>

                {projects.length === 0 ? (
                    <p className="text-gray-400">No projects found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-gray-900 border border-gray-700/50 rounded-xl p-5 flex justify-between items-start gap-4"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">{project.title}</h2>
                                    <p className="text-sm text-gray-400 mt-1">{project.duration}</p>
                                </div>

                                <button
                                    onClick={() => deleteProject(project._id)}
                                    disabled={deletingId === project._id}
                                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition disabled:opacity-60"
                                >
                                    {deletingId === project._id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default DeleteProjectPage;
