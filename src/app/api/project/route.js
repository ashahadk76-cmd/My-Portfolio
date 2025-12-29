import connectDB from "@/db/connectDB";
import Projects from "@/model/Projects";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        await connectDB();
        const data = await req.formData();  // CORRECT - lowercase 'f'
        const project = new Projects({
            title: data.get("title"),
            description: data.get("description"),
            imageUrl: data.get("imageUrl")?.trim(),
            proj_Link: data.get("proj_Link"),
            githubcodeLink: data.get("githubcodeLink"),
            duration: data.get("duration")
        });
        if (!project.title || !project.description || !project.duration || !project.proj_Link || !project.githubcodeLink || !project.imageUrl) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        await project.save();
        return NextResponse.json({ success: true, message: "Project created successfully" }, { status: 201 });
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
