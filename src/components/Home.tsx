import React from 'react'
import { ArrowLeft } from 'lucide-react'
import GithubContributionCard from './GitHub'

interface HomeProps {
  onViewProjects: () => void
  onGetInTouch: () => void
}

const Home: React.FC<HomeProps> = ({ onViewProjects, onGetInTouch }) => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center py-6 md:py-20 overflow-hidden box-border">

      {/* Centered Hero Content */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10 w-full">
        <h1 className="font-heading font-bold text-5xl md:text-[48px] leading-[1.05] tracking-tight bg-[linear-gradient(3.65deg,var(--color-gradient-start),var(--color-gradient-end))] bg-clip-text text-transparent mb-4 md:mb-6 text-center">
          Hi I'm Nirooz
        </h1>
        <p className="font-sans text-xl md:text-[28px] leading-[1.3] text-text-subheading max-w-2xl mb-6 md:mb-12 text-center">
          I craft high converting websites that align with your brand
        </p>

        {/* Central CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-6 md:mb-8">
          {/* Get in touch CTA (Black Pill Button) */}
          <button
            onClick={onGetInTouch}
            className="w-[180px] h-[44px] rounded-[100px] bg-element-black hover:bg-neutral-800 text-white flex items-center justify-between pl-6 pr-2.5 font-sans text-[14px] font-bold transition-all active:scale-[0.98] cursor-pointer shadow-sm relative group select-none border-0"
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
            className="px-6 py-2.5 bg-transparent hover:bg-card-bg text-element-black border border-element-black/25 rounded-full font-sans text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer shadow-sm"
          >
            View Projects
          </button>
        </div>

        {/* GitHub Contributions Card on Mobile only (No page scroll needed) */}
        <div className="block md:hidden w-full max-w-md mx-auto">
          <GithubContributionCard />
        </div>
      </div>
    </section>
  )
}

export default Home
