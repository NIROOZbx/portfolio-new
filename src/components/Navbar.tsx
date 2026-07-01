import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NavbarBrand from './NavbarBrand'
import NavItems from './NavItems'
import NavbarFooter from './NavbarFooter'
import GithubContributionCard from './GitHub'
import { Home, Briefcase, User, Folder, Mail } from 'lucide-react'

interface NavbarProps {
    currentTab: string
    setCurrentTab: (tab: string) => void
    scrollRef?: React.RefObject<HTMLElement | null>
}

const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={16} strokeWidth={2} /> },
    { id: 'services', label: 'Services', icon: <Briefcase size={16} strokeWidth={2} /> },
    { id: 'about', label: 'About', icon: <User size={16} strokeWidth={2} /> },
    { id: 'projects', label: 'Projects', icon: <Folder size={16} strokeWidth={2} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} strokeWidth={2} /> },
]

const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, scrollRef }) => {
    const [hidden, setHidden] = useState(false)
    const [tapped, setTapped] = useState<string | null>(null)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const el = scrollRef?.current ?? window

        const handleScroll = () => {
            const currentY = scrollRef?.current
                ? scrollRef.current.scrollTop
                : window.scrollY

            if (currentY > lastScrollY.current && currentY > 10) {
                setHidden(true)
            } else {
                setHidden(false)
            }
            lastScrollY.current = currentY
        }

        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [scrollRef])

    return (
        <>
            {/* Mobile Top Header */}
            <header
                className={`md:hidden w-full px-5 py-2 bg-primary-bg/90 backdrop-blur-xl border-b border-[#e5e4e7]/80 flex items-center fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'
                    }`}
            >
                <NavbarBrand onNavigateHome={() => setCurrentTab('home')} />
            </header>

            {/* Mobile Bottom Nav */}
            <nav
                className={`
          fixed left-1/2 -translate-x-1/2 z-50
          flex md:hidden items-center
          p-1 gap-1 rounded-4xl
          bg-white/20 backdrop-blur-xl
          border border-white/30
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          w-[calc(100%-3rem)]
          transition-transform duration-300 ease-in-out
        `}
                style={{
                    WebkitBackdropFilter: 'blur(20px)',
                    bottom: 'calc(env(safe-area-inset-bottom) + 15px)',
                }}
            >
                {navItems.map((item) => {
                    const active = currentTab === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setCurrentTab(item.id)
                                setTapped(item.id)
                            }}
                            onAnimationEnd={() => setTapped(null)}
                            aria-current={active ? 'page' : undefined}
                            aria-label={item.label}
                            className={`
                relative flex flex-col items-center justify-center gap-[3px]
                flex-1 h-10 rounded-4xl
                cursor-pointer border-0 outline-none bg-transparent
                focus-visible:ring-2 focus-visible:ring-element-black/40
                ${tapped === item.id ? 'nav-pop' : ''}
              `}
                        >
                            {/* Framer Motion sliding pill — shared layoutId causes it to animate between buttons */}
                            {active && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-4xl bg-element-black shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 420,
                                        damping: 34,
                                        mass: 0.75,
                                    }}
                                />
                            )}
                            {/* Icon sits above the pill */}
                            <motion.span
                                className="relative z-10"
                                animate={{ color: active ? '#ffffff' : '#565353' }}
                                transition={{ duration: 0.15 }}
                            >
                                {item.icon}
                            </motion.span>
                            {/* Label below the icon */}
                            <motion.span
                                className="relative z-10 text-[9px] font-medium leading-none tracking-wide"
                                animate={{ color: active ? '#ffffff' : '#565353' }}
                                transition={{ duration: 0.15 }}
                            >
                                {item.label}
                            </motion.span>
                        </button>
                    )
                })}
            </nav>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-[280px] min-w-[280px] h-screen py-6 px-6 bg-primary-bg border-r border-[#e5e4e7] box-border sticky top-0 z-30">
                <NavbarBrand onNavigateHome={() => setCurrentTab('home')} />
                <NavItems currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <div className="flex-grow flex items-center justify-center my-6 w-full overflow-hidden">
                    <GithubContributionCard />
                </div>
                <NavbarFooter />
            </aside>
        </>
    )
}

export default Navbar