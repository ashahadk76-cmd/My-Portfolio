import replay from "@/model/replay";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(request) {
    try {
        await connectDB();
        const { useremail, replaymessage } = await request.json();

        const newReplay = new replay({
            useremail,
            replaymessage,
        });
        await newReplay.save();


        // Email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: useremail,
            subject: "Replay Received",
            text: replaymessage,
            html:`
            <p>${replaymessage}</p>
            <p>— Team Ashahad</p>
            <P>Thank you for reaching out to us.</P>
            <P>We appreciate your interest and will be happy to assist you further.</P>
            <P>Best regards,</P>
            <P>Ashahad Portfolio Team</P> `
        });

        return NextResponse.json(
            { success: true, message: "Replay saved successfully", replay: newReplay },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving replay:", error);
        return NextResponse.json(
            { message: "Failed to save replay" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const replays = await replay.find().sort({ createdAt: -1 });
        return NextResponse.json({ replays }, { status: 200 });
    } catch (error) {
        console.error("Error fetching replays:", error);
        return NextResponse.json(
            { message: "Failed to fetch replays" },
            { status: 500 }
        );
    }
}