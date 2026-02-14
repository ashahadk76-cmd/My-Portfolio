import connectDB from "@/db/connectDB";
import Projects from "@/model/Projects";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.formData();

        const title = data.get("title");
        const description = data.get("description");
        const duration = data.get("duration");
        const proj_Link = data.get("proj_Link");
        const githubcodeLink = data.get("githubcodeLink");
        const mediaFiles = data.getAll("media"); // ✅ multiple files

        if (!title || !description || !duration || !proj_Link || !githubcodeLink || mediaFiles.length === 0) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        let media = [];

        for (const file of mediaFiles) {
            if (!file || typeof file.arrayBuffer !== "function") continue;

            const buffer = Buffer.from(await file.arrayBuffer());

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "portfolio_projects",
                        resource_type: "auto",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buffer);
            });

            media.push({
                url: result.secure_url,
                publicID: result.public_id,
            });
        }

        const project = await Projects.create({
            title,
            description,
            duration,
            proj_Link,
            githubcodeLink,
            media,
        });

        return NextResponse.json(
            { success: true, message: "Project created successfully", project },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}




export async function GET() {
    try {
        await connectDB();
        const projects = await Projects.find({});
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
