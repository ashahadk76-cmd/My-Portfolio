

// File: /app/api/query/[id]/route.js - FIXED VERSION
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import query from "@/model/query";

// ✅ CORRECT: Dynamic route mein params use karo
export async function DELETE(request, { params }) {
  const { id } = await params; // ⭐⭐ Yahi change hai ⭐⭐
  
  console.log("Deleting query with ID:", id); // Debug log
  
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );
  }
  
  try {
    await connectDB();
    const deletedQuery = await query.findByIdAndDelete(id);
    
    if (!deletedQuery) {
      return NextResponse.json(
        { success: false, message: "Query not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Query deleted successfully",
      deletedId: id 
    }, { status: 200 });
    
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}