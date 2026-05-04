"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiLogOut,
  FiFolder,
  FiMail,
  FiPlus,
  FiTrash2,
  FiTrendingUp,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Set date only on client side
    setCurrentDate(new Date().toLocaleDateString());

    fetch("/api/query?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setQueries(Array.isArray(data) ? data : data.queries || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setQueries([]);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const stats = [
    {
      title: "Total Queries",
      value: `${queries.length}+`,
      icon: FiMail,
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/queries",
    },
    {
      title: "Projects",
      value: "Manage",
      icon: FiFolder,
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      link: "/admin/projects",
      subText: "Edit",
    },
    {
      title: "Delete Project",
      value: "-",
      icon: FiTrash2,
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      link: "/admin/deleteproj",
    },
    {
      title: "Add Project",
      value: "+",
      icon: FiPlus,
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/admin/projects/add",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, Admin</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/projects"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <FiFolder className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              <span className="font-semibold">Projects</span>
            </Link>

            <Link
              href="/admin/queries"
              className="group flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">All Queries</span>
            </Link>

            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              <FiLogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-2">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                  {stat.subText && (
                    <p className="text-sm text-gray-400 mt-1">{stat.subText}</p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: `linear-gradient(to right, ${stat.textColor.split('-')[1]}, ${stat.textColor.split('-')[1]})` }}>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats Card */}
          <div className="lg:col-span-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">Recent Queries</span>
                <span className="text-white font-bold text-xl">{queries.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">Total Projects</span>
                <span className="text-white font-bold text-xl">—</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">Active Sessions</span>
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Last Login</span>
                <span className="text-white text-sm">
                  {currentDate || "Loading..."}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Queries Preview */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <FiMail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recent Queries</h3>
              </div>
              {queries.length > 0 && (
                <span className="text-xs text-gray-400">Last 5 entries</span>
              )}
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-2">Loading queries...</p>
                </div>
              ) : queries.length > 0 ? (
                queries.slice(0, 3).map((query, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{query.name || "Anonymous"}</p>
                        <p className="text-gray-400 text-sm">{query.email || "No email"}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {query.createdAt ? new Date(query.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                      {query.message || "No message"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FiMail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No queries yet</p>
                </div>
              )}
            </div>

            {queries.length > 0 && (
              <Link
                href="/admin/queries"
                className="block text-center mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View all {queries.length} queries →
              </Link>
            )}
          </div>
        </div>

        {/* Welcome Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Dashboard v2.0 | © 2024 Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;