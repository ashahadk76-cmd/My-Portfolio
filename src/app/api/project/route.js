import connectDB from "@/db/connectDB";
import Projects from "@/model/Projects";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config with error handling
cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});

// Helper function to upload file to Cloudinary
async function uploadToCloudinary(file) {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "portfolio_projects",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return {
            url: result.secure_url,
            publicID: result.public_id,
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
}

export async function POST(req) {
    try {
        // Connect to DB
        await connectDB();
        console.log("✅ DB Connected");

        // Parse form data
        const data = await req.formData();
        console.log("📦 Form data received");

        const title = data.get("title");
        const description = data.get("description");
        const duration = data.get("duration");
        const proj_Link = data.get("proj_Link");
        const githubcodeLink = data.get("githubcodeLink");
        const mediaFiles = data.getAll("media");

        // Validation
        if (!title || !description || !duration) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Title, description, and duration are required" 
                },
                { status: 400 }
            );
        }

        // Handle media uploads
        let media = [];
        if (mediaFiles && mediaFiles.length > 0) {
            try {
                const uploadPromises = mediaFiles.map(file => uploadToCloudinary(file));
                media = await Promise.all(uploadPromises);
                console.log(`✅ ${media.length} files uploaded to Cloudinary`);
            } catch (uploadError) {
                console.error("Media upload error:", uploadError);
                return NextResponse.json(
                    { 
                        success: false, 
                        message: "Failed to upload media files",
                        error: uploadError.message 
                    },
                    { status: 500 }
                );
            }
        }

        // Create project in database
        const project = await Projects.create({
            title,
            description,
            duration,
            proj_Link: proj_Link || "",
            githubcodeLink: githubcodeLink || "",
            media,
        });

        console.log("✅ Project created:", project._id);

        return NextResponse.json(
            { 
                success: true, 
                message: "Project created successfully", 
                project 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("❌ Server error:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return NextResponse.json(
            { 
                success: false, 
                message: "Internal Server Error",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const projects = await Projects.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json(
            { 
                success: true, 
                projects 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Internal Server Error" 
            },
            { status: 500 }
        );
    }
}