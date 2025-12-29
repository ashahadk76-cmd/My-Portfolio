import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import nodemailer from "nodemailer";
import query from "@/model/query";

export async function POST(req) {
    try {
        await connectDB();

        const data = await req.json();
        const { name, email, message } = data;

        // Save to DB
        const newQuery = new query({ name, email, message });
        await newQuery.save();

        // Email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // App Password
            },
        });

        // 📩 Email to YOU (Admin)
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email, // ⭐ reply goes to user
            subject: "📩 New Contact Form Submission",
            text: `
           Name: ${name}
           Email: ${email}

         Message: ${message}
      `,
        });

        // 📩 Confirmation email to USER
        await transporter.sendMail({
            from: `Ashahad Portfolio <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "✅ We received your message",
            html: `
        <h2>Thank you ${name}!</h2>
        <p>We’ve received your message and will get back to you soon.</p>
        <p><b>Your Message:</b></p>
        <blockquote>${message}</blockquote>
        <p>— Team Ashahad</p>
      `,
        });

        return NextResponse.json(
            { success: true, message: "Query submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const queries = await query.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, queries }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
