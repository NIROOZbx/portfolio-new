import React from 'react'
import avatarImg from '/avatar.jpg'

interface NavbarBrandProps {
  onNavigateHome: () => void
}

const NavbarBrand: React.FC<NavbarBrandProps> = ({ onNavigateHome }) => {
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
        <h2 className="font-heading font-bold text-[17px] text-element-black leading-none tracking-tight uppercase transition-colors duration-200 group-hover:text-text-heading/85">
          NIROOZ.DEV
        </h2>
        <span className="font-sans text-[13px] font-normal text-text-subheading mt-1">Full Stack Developer</span>
      </div>
    </div>
  )
}

export default NavbarBrand
