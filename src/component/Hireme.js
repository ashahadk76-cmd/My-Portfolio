"use client";

const platforms = [
  {
    name: "Upwork",
    url: "https://www.upwork.com/",
    short: "U",
    subtitle: "Top Rated Freelancer",
    bg: "bg-emerald-500",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/",
    short: "F",
    subtitle: "Creative Services",
    bg: "bg-emerald-600",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    short: "in",
    subtitle: "Professional Network",
    bg: "bg-sky-600",
  },
];

const HireMe = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Hire Me
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Pick a platform you’re comfortable with and reach out.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 text-lg leading-none hover:bg-white/20 hover:text-white transition"
            >
              ×
            </button>
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-3 px-6 py-5">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] hover:border-white/25 transition"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.bg} text-white font-semibold text-sm`}
              >
                {p.short}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">
                  {p.name}
                </h3>
                <p className="text-xs text-white/55 mt-0.5">
                  {p.subtitle}
                </p>
              </div>

              <span className="text-white/40 group-hover:text-white transition text-base">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HireMe;