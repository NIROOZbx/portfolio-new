import React from 'react'
import { motion } from 'framer-motion'

import type { DesignFolder } from '../types/designs'

interface FolderCardProps {
  folder: DesignFolder
  onClick: () => void
  itemCount?: number
  previews?: string[]
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick, itemCount = 0, previews = [] }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group flex flex-col items-center cursor-pointer w-full"
      initial="hidden"
      animate="show"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Folder Graphic Container */}
      <div className="relative w-[70%] drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300" style={{ aspectRatio: '457/406' }}>
      
      {/* Folder Back Panel (SVG) */}
      <svg viewBox="0 0 457 406" className="absolute inset-0 w-full h-full z-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0238481 26.0805C-0.591211 11.8627 10.7694 0 25.0005 0H108.5C115.394 0 122.078 2.37456 127.427 6.72418L154.859 29.0316C159.317 32.6563 164.887 34.6351 170.632 34.6351H267.982H370.706H431.791C446.022 34.6351 457.383 46.4973 456.768 60.7148L450.379 208.5L442.006 382.204C441.363 395.527 430.374 406 417.035 406H40.3788C26.9906 406 15.9789 395.453 15.402 382.077L7.91526 208.5L0.0238481 26.0805Z" fill="url(#backGradient)" filter="url(#innerShadow)" />
        <defs>
          <linearGradient id="backGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="80%" stopColor="#F9F9F9" />
            <stop offset="100%" stopColor="#CDD0D3" />
          </linearGradient>
          <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="4" />
            <feGaussianBlur stdDeviation="6" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.08" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Dynamic images sticking out of the folder */}
      {previews && previews.length > 0 && (
        <div className="absolute inset-x-4 top-2 bottom-[15%] flex justify-center items-center z-10 perspective-1000">
  <div className="relative w-full h-full">

    {/* Left Image */}
    {previews.length >= 2 && (
      <motion.div
        className="
          absolute
          w-[55%] h-[70%]
          left-[5%] top-[18%]
          rounded-lg
          shadow-md
          border border-black/10
          origin-bottom
          overflow-hidden
          z-10
        "
        initial={{ opacity: 0, y: 18, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -8 }}
        whileHover={{ rotate: -14, x: -10, y: -5 }}
        transition={{ type: "spring", stiffness: 350, damping: 24, delay: 0.1 }}
      >
        <img
          src={previews[1]}
          className="w-full h-full object-cover object-top"
          alt=""
        />
      </motion.div>
    )}

    {/* Right Image */}
    {previews.length >= 3 && (
      <motion.div
        className="
          absolute
          w-[55%] h-[70%]
          right-[5%] top-[18%]
          rounded-lg
          shadow-md
          border border-black/10
          origin-bottom
          overflow-hidden
          z-20
        "
        initial={{ opacity: 0, y: 18, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        whileHover={{ rotate: 14, x: 10, y: -5 }}
        transition={{ type: "spring", stiffness: 350, damping: 24, delay: 0.12 }}
      >
        <img
          src={previews[2]}
          className="w-full h-full object-cover object-top"
          alt=""
        />
      </motion.div>
    )}

    {/* Center Image */}
    {previews.length >= 1 && (
      <motion.div
        className="
          absolute
          w-[60%] h-[78%]
          left-1/2
          top-[10%]
          -translate-x-1/2
          rounded-lg
          shadow-lg
          border border-black/10
          origin-bottom
          overflow-hidden
          z-30
        "
        initial={{ opacity: 0, y: 22, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 350, damping: 24, delay: 0.15 }}
      >
        <img
          src={previews[0]}
          className="w-full h-full object-cover object-top"
          alt=""
        />
      </motion.div>
    )}

  </div>
</div>
      )}
      
      {/* Folder Front Panel (SVG) */}
      <svg viewBox="0 0 456 268" className="absolute bottom-0 inset-x-0 w-full h-auto z-20 drop-shadow-[0_-4px_15px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0482152 26.5363C-0.837373 12.1522 10.5896 0 25.001 0H430.679C445.146 0 456.592 12.2413 455.623 26.6753L440.981 244.675C440.099 257.803 429.194 268 416.037 268H38.4226C25.2121 268 14.2817 257.722 13.4699 244.536L0.0482152 26.5363Z" fill="url(#frontGradient)" filter="url(#frontInnerShadow)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="frontGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEFFFF" />
            <stop offset="100%" stopColor="#F3F3F3" />
          </linearGradient>
          <filter id="frontInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="5" />
            <feGaussianBlur stdDeviation="8" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.06" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      </div>

      {/* Text UNDER the folder */}
      <div className="mt-3 flex flex-col items-center text-center px-1">
        <h3 className="font-sans font-medium text-[13px] md:text-[14px] text-element-black tracking-wide leading-tight line-clamp-1">
          {folder.title}
        </h3>
        <span className="font-sans text-[10px] md:text-[11px] text-text-subheading mt-0.5">
          {itemCount} {itemCount === 1 ? 'Design' : 'Designs'}
        </span>
      </div>
    </motion.div>
  )
}

export default FolderCard
