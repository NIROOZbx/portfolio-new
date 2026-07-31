import React, { useState, useEffect } from 'react'
import avatarImg from '/avatar.jpg'
import { TextAnimate } from '@/components/ui/text-animate'

interface NavbarBrandProps {
  onNavigateHome: () => void
}

const TITLES = [
  'Full Stack Engineer',
  'UI/UX Developer',
  'Software Engineer'
]

const NavbarBrand: React.FC<NavbarBrandProps> = ({ onNavigateHome }) => {
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      onClick={onNavigateHome}
      className="flex items-center gap-3 md:mb-10 cursor-pointer select-none group"
    >
      <img
        src={avatarImg}
        className="w-12 h-12 rounded-xl object-cover bg-card-bg transition-transform duration-300 group-hover:scale-105"
        alt="Nirooz avatar"
      />
      <div className="flex flex-col justify-center">
        <h2 className="font-heading font-semibold text-[17px] text-element-black leading-none tracking-tight uppercase transition-colors duration-200 group-hover:text-text-heading/85">
          NIROOZ.DEV
        </h2>
        <div className="h-5 mt-1 overflow-hidden flex items-center">
          <TextAnimate
            key={TITLES[titleIndex]}
            animation="blurInUp"
            by="character"
            duration={0.5}
            startOnView={false}
            className="font-sans text-[12px] font-normal text-text-subheading"
          >
            {TITLES[titleIndex]}
          </TextAnimate>
        </div>
      </div>
    </div>
  )
}

export default NavbarBrand
