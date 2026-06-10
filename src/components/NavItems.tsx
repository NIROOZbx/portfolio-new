import React from 'react'
import { Home, Briefcase, User, Folder, Mail } from 'lucide-react'

interface NavItemsProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

const NavItems: React.FC<NavItemsProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} strokeWidth={2} /> },
    { id: 'services', label: 'Services', icon: <Briefcase size={20} strokeWidth={2} /> },
    { id: 'about', label: 'About', icon: <User size={20} strokeWidth={2} /> },
    { id: 'projects', label: 'Projects', icon: <Folder size={20} strokeWidth={2} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} strokeWidth={2} /> },
  ]

  return (
    <nav className="flex flex-col justify-start gap-1.5 w-full">
      {navItems.map((item) => {
        const active = currentTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            aria-current={active ? 'page' : undefined}
            className={`
              flex flex-row items-center gap-3
              px-3.5 py-2.5
              border-0 rounded-lg cursor-pointer text-left font-sans
              text-[15px] font-medium transition-all duration-200 ease-out select-none
              ${active
                ? 'bg-element-black text-primary-bg'
                : 'text-text-subheading bg-transparent hover:text-element-black hover:bg-card-bg hover:translate-x-1 active:scale-[0.98]'}
            `}
          >
            {item.icon}
            <span className="leading-none">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default NavItems