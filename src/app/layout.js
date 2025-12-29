import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: {
    default: "Ashahad Khan | Full-Stack Developer",
    template: "%s | Ashahad Khan",
  },

  description:
    "Ashahad Khan is a full-stack web developer specializing in Next.js, React, Node.js, and modern web technologies. Explore projects, skills, and experience.",

  keywords: [
    "Ashahad Khan",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Portfolio",
    "JavaScript Developer",
    "Node.js Developer",
    "MongoDB",
    "Tailwind CSS",
    "Frontend Developer",
    "Backend Developer",
  ],

  authors: [{ name: "Ashahad Khan" }],
  creator: "Ashahad Khan",
  publisher: "Ashahad Khan",

  metadataBase: new URL("https://ashahadkhan.vercel.app"), // ⚠️ apna real domain daalna

  openGraph: {
    title: "Ashahad Khan | Full-Stack Developer",
    description:
      "Portfolio of Ashahad Khan — Full-Stack Developer skilled in Next.js, React, Node.js, and scalable web applications.",
    url: "https://ashahadkhan.vercel.app",
    siteName: "Ashahad Khan Portfolio",
    images: [
      {
        url: "/og-image.png", // public folder me image honi chahiye
        width: 1200,
        height: 630,
        alt: "Ashahad Khan Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ashahad Khan | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Next.js, React, Node.js, and modern web development.",
    images: ["/og-image.png"],
    creator: "@ashahadkhan", // optional
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://ashahadkhan.vercel.app",
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
