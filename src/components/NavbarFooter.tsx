import React from 'react'
import { Mail } from 'lucide-react'
import { SITE_CONFIG } from '../config/constants'

// Import custom brand SVGs
import githubIcon from '../assets/square-github-brands-solid-full.svg'
import linkedinIcon from '../assets/linkedin-brands-solid-full.svg'
import discordIcon from '../assets/discord-brands-solid-full.svg'
import xIcon from '../assets/x-twitter-brands-solid-full.svg'

const NavbarFooter: React.FC = () => {
  const socialLinks = [
    {
      url: SITE_CONFIG.socials.github,
      icon: <img src={githubIcon} className="w-[18px] h-[18px]" alt="GitHub" />,
      label: 'GitHub'
    },
    {
      url: SITE_CONFIG.socials.linkedin,
      icon: <img src={linkedinIcon} className="w-[18px] h-[18px]" alt="LinkedIn" />,
      label: 'LinkedIn'
    },
    {
      url: SITE_CONFIG.socials.discord,
      icon: <img src={discordIcon} className="w-[18px] h-[18px]" alt="Discord" />,
      label: 'Discord'
    },
    {
      url: SITE_CONFIG.socials.x,
      icon: <img src={xIcon} className="w-[18px] h-[18px]" alt="X / Twitter" />,
      label: 'X'
    },
    {
      url: `https://mail.google.com/mail/?view=cm&to=${SITE_CONFIG.email}`,
      icon: <Mail size={18} strokeWidth={2.2} />,
      label: 'Email'
    }
  ]

  return (
    <div className=" flex flex-col gap-4 md:mt-auto items-center md:items-start">
      <div className="flex gap-4">
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-all duration-250 hover:-translate-y-0.5 flex items-center justify-center"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="font-sans text-[12px] text-text-subheading opacity-80">Made with love © 2026 Nirooz</p>
    </div>
  )
}

export default NavbarFooter
