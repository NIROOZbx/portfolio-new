import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import GithubContributionCard from '../../components/GitHub'
import NavbarFooter from '../navigation/NavbarFooter'
import VisitorCounter from '../../components/VisitorCounter'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface HomeProps {
    onViewProjects: () => void
    onGetInTouch: () => void
}

const Home: React.FC<HomeProps> = ({ onViewProjects, onGetInTouch }) => {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    return (
        <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center pt-24 pb-12 md:py-20 overflow-hidden box-border">

            {/* Centered Hero Content */}
            <div className="max-w-[800px] mx-auto px-4 py-12 text-center relative z-10 w-full flex flex-col items-center justify-center">
                {/* Line 1 (eyebrow) */}
                
                <p className="text-[16px] font-medium mb-3 bg-[linear-gradient(3.65deg,var(--color-gradient-start),var(--color-gradient-end))] bg-clip-text text-transparent inline-block">
                    Hi, I'm Nirooz
                </p>

                {/* Line 2 (headline) */}
                <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-[38px] leading-[1.1] tracking-tight text-element-black mb-2 md:mb-6 text-center text-balance mx-auto">
                    <span className="md:whitespace-nowrap">Not every business problem needs a website.</span> <br className="hidden md:block" />I figure out <span className="bg-[linear-gradient(3.65deg,var(--color-gradient-start),var(--color-gradient-end))] bg-clip-text text-transparent pb-[2px] inline-block">what does.</span>
                </h1>

                {/* Line 3 (subtext) */}
                <p className="text-[17px] font-normal leading-relaxed text-text-subheading m-0">
                    I find what's slowing you down, then build a fix that{" "}
                    <span className="relative inline-block whitespace-nowrap mx-2">
                        <span className="relative z-10 font-medium text-element-black">converts.</span>
                        <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] -z-10 text-neutral-500/60 pointer-events-none -rotate-2"
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                                d="M 15 20 C 15 5, 85 5, 85 20 C 85 35, 15 35, 18 20 C 20 10, 80 12, 80 20"
                            />
                        </motion.svg>
                    </span>
                </p>

                {/* Central CTA Buttons */}
                <div className="flex flex-row gap-3 sm:gap-4 items-center justify-center w-full mt-8 mb-8">
                    {/* Get in touch CTA (Black Pill Button) */}
                    <button
                        onClick={onGetInTouch}
                        className="w-fit h-[44px] rounded-[100px] bg-element-black hover:bg-neutral-800 text-white flex items-center gap-3 pl-5 pr-2 text-[14px] font-bold transition-all active:scale-[0.98] cursor-pointer shadow-sm relative group select-none border-0"
                        aria-label="Get in touch"
                    >
                        <span>Get in touch</span>
                        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-element-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowLeft size={14} className="rotate-[135deg]" strokeWidth={2.8} />
                        </span>
                    </button>

                    {/* View Projects Link Button */}
                    <button
                        onClick={onViewProjects}
                        className="h-[44px] px-6 bg-black/[0.03] backdrop-blur-lg border border-black/[0.08] hover:bg-black/[0.06] hover:border-black/[0.15] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] text-element-black rounded-[100px] text-[14px] font-semibold transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center"
                    >
                        View Designs
                    </button>
                </div>

                {/* Central Visitor Counter */}
                <div className="flex justify-center items-center mb-6">
                    <VisitorCounter />
                </div>

                {/* GitHub Contributions Card on Mobile only (No page scroll needed) */}
                <div className="block md:hidden w-full max-w-md mx-auto mb-8">
                    {isDesktop === false && <GithubContributionCard />}
                </div>

                {/* Mobile-only Footer inside Home page wrapper to fit perfectly */}
                <div className="block md:hidden w-full border-t border-border/20 pt-4 mt-2">
                    <NavbarFooter />
                </div>
            </div>
        </section>
    )
}

export default Home
