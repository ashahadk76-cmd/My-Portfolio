"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuery, setActiveQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const params = useParams();
  const id = params.id;


  // Fetch queries
  useEffect(() => {
    fetch("/api/query")
      .then((res) => res.json())
      .then((data) => {
        setQueries(data.queries || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

// Frontend - /app/admin/queries/page.js
// const handleDelete = async (id) => {
//   if (!confirm("Are you sure you want to delete this query?")) return;

//   fetch(`/api/query/${id}`, {
//     method: "DELETE",
//   })
//     .then(res => res.json()) // ✅ Response parse karo
//     .then(result => {
//       console.log("Delete result:", result); // Debug
//       if (result.success) {
//         setQueries(prev => prev.filter(q => q._id !== id));
//         alert("Query deleted successfully ✅");
//       } else {
//         alert("Delete failed: " + (result.message || "Unknown error"));
//       }
//     })
//     .catch(err => {
//       console.error("Delete error:", err);
//       alert("Network error ❌");
//     });
// };


const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/query/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                alert("Project deleted successfully ✅");
                setQueries((prev) => prev.filter((col) => col._id !== id));
            } else {
                alert(data.message || "Failed to delete project ❌");
            }
        } catch (error) {
            alert("Error deleting project: " + error.message);
        }
    };


  // Send reply
  const sendReply = async () => {
    if (!replyText.trim()) {
      alert("Reply empty hai");
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/replay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          useremail: activeQuery.email,
          replaymessage: replyText,
        }),
      });

      if (!res.ok) throw new Error("Reply failed");

      alert("Reply sent ✅");

      // Mark query as replied
      setQueries((prev) =>
        prev.map((q) =>
          q._id === activeQuery._id ? { ...q, replied: true } : q
        )
      );

      setReplyText("");
      setActiveQuery(null);
    } catch (err) {
      console.error(err);
      alert("Error sending reply ❌");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-bold mb-1">User Queries</h1>
        <p className="text-gray-400 text-sm">Total: {queries.length}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {queries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No queries found
          </div>
        ) : (
          queries.map((q) => (
            <div
              key={q._id}
              className={`p-4 rounded border ${q.replied ? "border-green-500 bg-gray-800" : "border-gray-700 bg-gray-900"
                }`}
            >
              <p className="font-medium text-white">{q.name}</p>
              <p className="text-gray-400 text-sm mb-2">{q.email}</p>
              <p className="text-gray-300 text-sm mb-4 p-3 bg-gray-800 rounded">
                {q.message}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveQuery(activeQuery?._id === q._id ? null : q);
                    setReplyText("");
                  }}
                  className={`px-4 py-2 rounded text-sm ${activeQuery?._id === q._id
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                  {activeQuery?._id === q._id ? "Cancel" : "Reply"}
                </button>

                <button
                  onClick={() => handleDelete(q._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                >
                  Delete
                </button>
              </div>

              {activeQuery?._id === q._id && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-purple-500"
                    rows={3}
                    placeholder="Type reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={sendReply}
                    disabled={sending}
                    className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;