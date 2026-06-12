import { motion } from "framer-motion";
import {
  FiMapPin,
  FiUsers,
  FiCheckCircle,
  FiArrowUpRight,
  FiExternalLink,
  FiMail,
  FiStar,
} from "react-icons/fi";

export default function CompanyCard({ company }) {
  const data = company || {};
  const initials = (data.name || "Co")
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ y: 0, opacity: 0.95 }}
      whileHover={{ y: -8, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-px shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_28px_60px_-20px_rgba(0,0,0,0.25)]"
    >
      {/* Gradient ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 140deg at 50% 50%, oklch(0.7 0.18 160 / 0.35), oklch(0.65 0.22 260 / 0.25), oklch(0.75 0.18 30 / 0.3), oklch(0.7 0.18 160 / 0.35))",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative rounded-3xl bg-card">
        {/* Top banner */}
        <div className="relative h-24 overflow-hidden rounded-t-3xl">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, oklch(0.72 0.17 160) 0%, oklch(0.6 0.2 220) 50%, oklch(0.65 0.22 300) 100%)",
            }}
          />
          {/* Soft grid texture */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Decorative glow */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-black/20 blur-3xl" />

          {/* Floating chip */}
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md ring-1 ring-white/20">
            <FiStar size={12} />
            Featured
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Logo + verified */}
          <div className="-mt-10 flex items-start justify-between">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card p-1 shadow-lg ring-1 ring-border">
                {data.logoUrl ? (
                  <img
                    src={data.logoUrl}
                    alt={`${data.name || "Company"} logo`}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center rounded-xl text-xl font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.6 0.2 220), oklch(0.65 0.22 300))",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>
            </div>

            {data.isApproved && (
              <div className="mt-12 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                <FiCheckCircle size={14} />
                Verified
              </div>
            )}
          </div>

          {/* Name + tagline */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {data.name || "Loading Company..."}
              </h3>
              {data.website && (
                <a
                  href={data.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Visit website"
                >
                  <FiExternalLink size={15} />
                </a>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {data.company || "Innovation & Tech"}
            </p>
          </div>

          {/* Info grid */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-sm text-foreground/80 ring-1 ring-border/60">
              <FiMapPin size={15} className="text-muted-foreground" />
              <span className="truncate">{data.location || "Global"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-sm text-foreground/80 ring-1 ring-border/60">
              <FiUsers size={15} className="text-muted-foreground" />
              <span className="truncate">{data.size || "1-10"} Team</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {data.description ||
              "A forward-thinking company building the future of digital experiences and high-quality solutions."}
          </p>

          {/* Divider */}
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Footer */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Contact Admin
              </p>
              <div className="mt-0.5 flex items-center gap-1.5 text-sm text-foreground">
                <FiMail size={13} className="shrink-0 text-muted-foreground" />
                <span className="truncate">
                  {data.ownerEmail || "support@company.com"}
                </span>
              </div>
            </div>

            <button
              className="group/btn relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-foreground text-background shadow-lg transition-all duration-300 hover:w-28"
              aria-label="View company"
            >
              <span className="absolute left-3 hidden text-sm font-medium group-hover/btn:inline">
                View
              </span>
              <FiArrowUpRight
                size={18}
                className="absolute right-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
