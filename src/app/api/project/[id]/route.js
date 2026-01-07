import Projects from "@/model/Projects";
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";

export async function DELETE(request) {
    try {
        await connectDB();

        // URL se ID directly extract karo
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const projectId = pathSegments[pathSegments.length - 1];

        // Check if ID is valid
        if (!projectId || projectId === 'api' || projectId === 'projects') {
            return NextResponse.json(
                { success: false, message: "Project ID is required" },
                { status: 400 }
            );
        }

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return NextResponse.json(
                { success: false, message: "Invalid project ID" },
                { status: 400 }
            );
        }

        // Delete project
        const deletedProject = await Projects.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return NextResponse.json(
                { success: false, message: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Project deleted successfully",
                id: projectId
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}