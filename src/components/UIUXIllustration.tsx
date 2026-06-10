import React from 'react'

const UIUXIllustration: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-card-bg overflow-hidden select-none">
      {/* Soft warm/pink gradient backdrop blob */}
      <div className="absolute w-[180px] h-[180px] bg-gradient-to-tr from-orange-200/20 to-pink-300/30 rounded-full blur-2xl top-[15%] left-[15%] z-0" />


      {/* Phone Outline Mockup */}
      <div className="w-[210px] h-[340px] border-[2.5px] border-[#1a1a1a] rounded-t-[36px] bg-white absolute top-[35px] left-1/2 -translate-x-1/2 shadow-[inset_0_0_12px_rgba(0,0,0,0.06),0_16px_40px_-16px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col pt-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[inset_0_0_12px_rgba(0,0,0,0.08),0_24px_48px_-12px_rgba(0,0,0,0.2)]">
        {/* Dynamic Island */}
        <div className="w-[56px] h-[15px] bg-[#1a1a1a] rounded-full absolute top-[10px] left-1/2 -translate-x-1/2 z-20" />

        {/* Gloss Screen Reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20 rotate-[25deg] -translate-y-[40%] z-20" />

        {/* Feed Header */}
        <div className="flex items-center gap-2.5 px-4 mb-4 text-left relative z-10">
          {/* Avatar circle */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e5e4e7] to-[#d2d1d4] shrink-0 shadow-inner" />
          {/* Content title lines */}
          <div className="flex flex-col gap-1.5 grow">
            <div className="h-2 w-[90px] bg-[#e5e4e7] rounded-full" />
            <div className="h-2 w-[55px] bg-[#e5e4e7]/70 rounded-full" />
          </div>
        </div>

        {/* Large Rounded Content Box (Floating Card style with shadow) */}
        <div className="mx-4 aspect-[1.1] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f7] border border-[#e5e4e7]/50 rounded-[16px] mb-4 shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative z-10 flex items-center justify-center">
          <div className="w-[85%] h-[85%] rounded-[12px] bg-[#e5e4e7]/40 border border-dashed border-[#cfcaca]" />
        </div>

        {/* Bottom Overflow Box */}
        <div className="mx-4 h-[80px] bg-gradient-to-b from-[#f5f5f7]/70 to-[#e5e4e7]/20 rounded-t-[16px] border-t border-x border-[#e5e4e7]/40 shrink-0 relative z-10" />
      </div>
    </div>
  )
}

export default UIUXIllustration
