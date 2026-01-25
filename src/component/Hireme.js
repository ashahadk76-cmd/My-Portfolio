// "use client";

// const platforms = [
//   {
//     name: "Upwork",
//     url: "https://www.upwork.com/",
//     short: "U",
//     subtitle: "Top Rated Freelancer",
//     bg: "bg-emerald-500",
//   },
//   {
//     name: "Fiverr",
//     url: "https://www.fiverr.com/",
//     short: "F",
//     subtitle: "Creative Services",
//     bg: "bg-emerald-600",
//   },
//   {
//     name: "LinkedIn",
//     url: "https://www.linkedin.com/in/ashahad-khan-0b89ab374/",
//     short: "in",
//     subtitle: "Professional Network",
//     bg: "bg-sky-600",
//   },
// ];

// const HireMe = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
//       onClick={onClose}
//     >
//       {/* Modal */}
//       <div
//         className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="px-6 pt-5 pb-4 border-b border-white/5">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h2 className="text-lg font-semibold text-white">
//                 Hire Me
//               </h2>
//               <p className="mt-1 text-sm text-white/60">
//                 Pick a platform you’re comfortable with and reach out.
//               </p>
//             </div>

//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 text-lg leading-none hover:bg-white/20 hover:text-white transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Platforms */}
//         <div className="space-y-3 px-6 py-5">
//           {platforms.map((p) => (
//             <a
//               key={p.name}
//               href={p.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] hover:border-white/25 transition"
//             >
//               <div
//                 className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.bg} text-white font-semibold text-sm`}
//               >
//                 {p.short}
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-white">
//                   {p.name}
//                 </h3>
//                 <p className="text-xs text-white/55 mt-0.5">
//                   {p.subtitle}
//                 </p>
//               </div>

//               <span className="text-white/40 group-hover:text-white transition text-base">
//                 ↗
//               </span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HireMe;



"use client";
import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react"; // ✅ Icons import karo

const platforms = [
  {
    name: "Upwork",
    url: "https://www.upwork.com/",
    short: "U",
    subtitle: "Top Rated Freelancer",
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    border: "border-emerald-500/20",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/",
    short: "F",
    subtitle: "Creative Services Marketplace",
    bg: "bg-gradient-to-br from-green-400 to-green-600",
    border: "border-green-500/20",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ashahad-khan-0b89ab374/",
    short: "in",
    subtitle: "Professional Network Profile",
    bg: "bg-gradient-to-br from-blue-600 to-blue-800",
    border: "border-blue-500/20",
  },
];

const HireMe = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key se close karne ke liye
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${animate ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={`relative w-full max-w-md mx-4 transform transition-all duration-300 ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Modal - Compact aur Clean */}
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Hire Me</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Pick a platform to start our conversation
                </p>
              </div>

              {/* ✅ FIXED CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-white/70 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Platforms - Simple Grid */}
          <div className="p-5">
            <div className="space-y-3">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                >
                  {/* Platform Icon */}
                  <div className={`flex-shrink-0 h-12 w-12 rounded-xl ${p.bg} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold">{p.short}</span>
                  </div>

                  {/* Platform Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{p.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{p.subtitle}</p>
                  </div>

                  {/* ✅ FIXED ARROW - Ab overflow nahi karega */}
                  <div className="flex-shrink-0">
                    <ArrowUpRight
                      size={20}
                      className="text-gray-500 group-hover:text-white transition-colors"
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Direct Contact Option */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-center text-gray-400 text-sm">
                Or email directly at{" "}
                <a
                  href="mailto:your.email@example.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                 ashahadkhanind@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-t from-black/30 to-transparent border-t border-white/10">
            <div className="text-center text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;