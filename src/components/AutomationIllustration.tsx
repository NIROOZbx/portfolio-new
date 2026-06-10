import React from 'react'
import { Bot, Mail, FileText, Clock, Send } from 'lucide-react'

interface PillProps {
  icon: React.ReactNode
  label: string
  className?: string
}

const Pill: React.FC<PillProps> = ({ icon, label, className }) => {
  return (
    <div
      className={`absolute h-[30px] rounded-[20px] shadow-[0px_2px_20px_0px_rgba(207,198,198,0.25)] ${className}`}
    >
      {/* glassmorphism background */}
      <div
        aria-hidden
        className="absolute backdrop-blur-[10px] bg-gradient-to-r from-[rgba(217,217,217,0.08)] to-[rgba(153,153,153,0.16)] inset-0 pointer-events-none rounded-[20px]"
      />
      {/* inner border */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_#cfd1d5]" />
      
      {/* content */}
      <div className="relative flex flex-row items-center gap-[7px] px-[13px] h-full whitespace-nowrap">
        <span className="text-text-heading w-[18px] h-[18px] flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="text-text-heading text-[12px] font-sans tracking-[0.04em]">
          {label}
        </span>
      </div>
    </div>
  )
}

const AutomationIllustration: React.FC = () => {
  return (
    <div className="w-[360px] h-[360px] bg-card-bg rounded-[17px] overflow-hidden relative select-none">
      {/* Teal glow blob */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 100,
          height: 73,
        }}
      >
        <svg
          className="absolute"
          style={{ inset: "-192% -140%", width: "380%", height: "353%" }}
          fill="none"
          viewBox="0 0 380 353"
          preserveAspectRatio="none"
        >
          <g filter="url(#glow)">
            <ellipse cx="190" cy="176.5" rx="50" ry="36.5" fill="#25E4EB" />
          </g>
          <defs>
            <filter
              id="glow"
              x="0"
              y="0"
              width="380"
              height="353"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur stdDeviation="70" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Diagonal dashed line ↘ */}
      <div
        className="absolute"
        style={{
          left: 86,
          top: 81,
          width: 205,
          height: 195,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "rotate(43.57deg)", width: 283, height: 0 }}>
          <svg width="283" height="1" viewBox="0 0 283 1" fill="none" style={{ display: "block" }}>
            <line
              x1="0" y1="0.5" x2="283" y2="0.5"
              stroke="#CFCACA"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>

      {/* Diagonal dashed line ↙ */}
      <div
        className="absolute"
        style={{
          left: 75,
          top: 78,
          width: 204,
          height: 194,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "rotate(136.44deg)", width: 282, height: 0 }}>
          <svg width="282" height="1" viewBox="0 0 282 1" fill="none" style={{ display: "block" }}>
            <line
              x1="0" y1="0.5" x2="282" y2="0.5"
              stroke="#CFCACA"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>

      {/* Center pill — AGENTS */}
      <Pill
        icon={<Bot size={16} strokeWidth={1.5} />}
        label="AGENTS"
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Top-left — Send email */}
      <Pill
        icon={<Mail size={15} strokeWidth={1.5} />}
        label="Send email"
        className="left-[27px] top-[50px]"
      />

      {/* Top-right — Send invoice */}
      <Pill
        icon={<FileText size={15} strokeWidth={1.5} />}
        label="Send invoice"
        className="right-[13px] top-[50px]"
      />

      {/* Bottom-left — Scheduling */}
      <Pill
        icon={<Clock size={15} strokeWidth={1.5} />}
        label="Scheduling"
        className="left-[27px] top-[280px]"
      />

      {/* Bottom-right — Replies */}
      <Pill
        icon={<Send size={14} strokeWidth={1.5} />}
        label="Replies"
        className="left-[241px] top-[280px]"
      />
    </div>
  )
}

export default AutomationIllustration
