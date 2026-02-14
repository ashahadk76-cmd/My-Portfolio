import Projects from "@/model/Projects";
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});

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


export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "id not found"
            }, { status: 401 })
        }

        const project = await Projects.findById(id)

        if (!project) {
            return NextResponse.json({
                success: false,
                message: "project not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            project
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "failed to fetch projects"
        }, { status: 500 })
    }
}





export async function PATCH(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        if (!id || !Projects) {
            return NextResponse.json({ success: false, message: "ID not found" }, { status: 400 });
        }

        const data = await req.formData();

        const title = data.get("title");
        const description = data.get("description");
        const duration = data.get("duration");
        const proj_Link = data.get("proj_Link");
        const githubcodeLink = data.get("githubcodeLink");
        const mediaFiles = data.getAll("media"); // multiple files

        if (!title || !description || !duration || !proj_Link || !githubcodeLink) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        let media = [];
        if (mediaFiles && mediaFiles.length > 0) {
            for (const file of mediaFiles) {
                if (!file || typeof file.arrayBuffer !== "function") continue;
                const buffer = Buffer.from(await file.arrayBuffer());

                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "portfolio_projects", resource_type: "auto" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(buffer);
                });

                media.push({ url: result.secure_url, publicID: result.public_id });
            }
        }

        const updatedProject = await Projects.findByIdAndUpdate(
            id,
            { title, description, duration, proj_Link, githubcodeLink, ...(media.length && { media }) },
            { new: true }
        );

        if (!updatedProject) {
            return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, project: updatedProject }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to update project" }, { status: 500 });
    }
}