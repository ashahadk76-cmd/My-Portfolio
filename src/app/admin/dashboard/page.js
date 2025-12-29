"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const router = useRouter();

  // Fetch only recent queries (limit 5)
  useEffect(() => {
    fetch("/api/query?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setQueries(Array.isArray(data) ? data : data.queries || []);
      })
      .catch((err) => {
        console.error("Error:", err);
        setQueries([]);
      });
  }, []);

  const handleLogout = async () => {
    // await fetch("/api/logout", { method: "POST" });
    // router.push("/admin/login");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": "ashahadkhanind@gmail.com",
      "password": "Ashahad2006"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          router.push("/admin/login");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-indigo-600 p-6 pt-30 md:p-10"> 
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-sans font-extrabold  ">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
           href="/projects"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-shadow-blue-950 text-lg font-semibold "
          >
            Projects
          </Link>
          <Link
            href="/admin/queries"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-shadow-blue-950 text-lg font-semibold"
          >
            All Queries
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-shadow-blue-950 text-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link
          href="/admin/queries"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700">Total Queries</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{queries.length}+</p>
        </Link>

        <Link
          href={"/admin/projects"}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">Manage</p>
        </Link>

        <Link
          href="/admin/projects"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700">Add Project</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">+</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Quick Stats</h3>
          <p className="text-lg text-gray-600 mt-2">Recent: {queries.length}</p>
        </div>
      </div>

      {/* Recent Queries Preview
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Queries</h2>
          <Link 
            href="/admin/queries" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>

        {queries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No queries yet</p>
        ) : (
          <div className="space-y-4">
            {queries.slice(0, 5).map((q) => (
              <div key={q._id || q.id} className="border-l-4 border-blue-500 p-4 bg-gray-50 hover:bg-gray-100">
                <div className="flex justify-between">
                  <p className="font-medium text-gray-800">{q.name}</p>
                  <p className="text-sm text-gray-500">{q.email}</p>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{q.message}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AdminDashboard;