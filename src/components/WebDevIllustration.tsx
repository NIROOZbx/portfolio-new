import React from 'react'

const WebDevIllustration: React.FC = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-card-bg p-4 overflow-hidden select-none">
      {/* Soft blue-indigo gradient backdrop blob */}
      <div className="absolute w-[180px] h-[180px] bg-gradient-to-tr from-blue-300/15 to-indigo-300/15 rounded-full blur-2xl top-[10%] right-[10%] z-0" />

      {/* Browser Window Mockup Container */}
      <div className="w-[265px] h-[185px] rounded-2xl bg-white border border-[#e5e4e7] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden relative z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
        {/* Gloss Screen Reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 rotate-[25deg] -translate-y-[45%] z-20" />

        {/* Window header (Browser Chrome) */}
        <div className="h-[28px] px-3 border-b border-[#e5e4e7]/60 flex items-center relative bg-white/40 z-10">
          {/* Close/Min/Max Dots */}
          <div className="flex gap-1 absolute left-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
          </div>

          {/* Address Bar */}
          <div className="w-[125px] h-[14px] bg-[#e5e4e7]/50 rounded-md mx-auto flex items-center justify-center my-1">
            <span className="text-[7.5px] font-sans text-text-subheading/45 font-medium tracking-wide">hello.js</span>
          </div>
        </div>

        {/* Window Body (Webpage content) */}
        <div className="grow p-3 flex flex-col gap-2 relative bg-white/85 z-10 text-left">
          {/* Webpage Header */}
          <div className="flex justify-between items-center mb-1">
            <div className="w-3.5 h-3.5 rounded-full bg-[#e5e4e7]" />
            <div className="flex gap-2">
              <div className="w-6 h-1 bg-[#e5e4e7]/70 rounded" />
              <div className="w-6 h-1 bg-[#e5e4e7]/70 rounded" />
              <div className="w-6 h-1 bg-[#e5e4e7]/70 rounded" />
            </div>
          </div>

          {/* Webpage Hero Container */}
          <div className="flex items-center gap-3.5 grow">
            {/* Left text column */}
            <div className="flex flex-col gap-1.5 w-[55%]">
              <div className="h-2 w-full bg-[#e5e4e7] rounded-full" />
              <div className="h-2 w-[80%] bg-[#e5e4e7] rounded-full" />
              <div className="h-1 w-[90%] bg-[#e5e4e7]/60 rounded-full mt-0.5" />
              <div className="h-1 w-[70%] bg-[#e5e4e7]/40 rounded-full" />
              <div className="h-3 w-[45px] bg-[#1a1a1a] rounded-full mt-2" />
            </div>

            {/* Right mockup card */}
            <div className="w-[45%] aspect-[1.1] bg-[#e5e4e7]/50 border border-[#e5e4e7]/40 rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="w-[75%] h-[75%] rounded-[8px] border border-dashed border-[#cfcaca]/80" />
            </div>
          </div>

          {/* Webpage bottom cards grid */}
          <div className="flex gap-2 mt-1">
            <div className="flex-1 h-[22px] bg-[#e5e4e7]/35 rounded-md" />
            <div className="flex-1 h-[22px] bg-[#e5e4e7]/35 rounded-md" />
            <div className="flex-1 h-[22px] bg-[#e5e4e7]/35 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebDevIllustration
