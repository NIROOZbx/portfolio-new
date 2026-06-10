import React from 'react'
import TechStack from './TechStack'

const About: React.FC = () => {
  return (
    <div className="animate-fade-in flex flex-col gap-20 max-w-5xl">
      {/* Top Split Row: Story and Experience */}
      <section className="text-left flex flex-col md:flex-row gap-12 w-full">
        {/* Left Column: About copy */}
        <div className="flex-grow md:w-[60%] flex flex-col gap-6">
          <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-none tracking-tight mb-2">
            About
          </h1>
          
          <p className="font-sans font-semibold text-lg md:text-xl text-text-heading leading-relaxed">
            Hey, I'm Nirooz. A full-stack developer who likes to build and break things.
          </p>
          
          <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed">
            I design interfaces, build end-to-end systems, bring motion to things that deserve it, and automate the parts nobody wants to do manually. I don't just write code — I take a rough idea and own the entire journey. Design, frontend, backend, deployment. No handoffs, no gaps.
          </p>
          
          <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed">
            Working deep in backend architecture reshaped how I think about software. I don't just build features — I dig into how things work at the internal level, understand the tradeoffs, then make the right call.
          </p>
          
          <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed">
            While interning I was shipping real production systems on the side — not tutorials, not demos. Real things, deployed, running.
          </p>
          
          <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed">
            Currently open to full-time full-stack roles at a startup where ownership is real and the problems are worth solving.
          </p>
        </div>

        {/* Right Column: Experience */}
        <div className="w-full md:w-[40%] flex flex-col">
          <h2 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-none tracking-tight mb-8">
            Experience
          </h2>
          
          {/* Experience Card */}
          <div className="border border-[#e5e4e7] rounded-xl p-5 bg-white flex justify-between items-start hover:shadow-sm transition-all duration-300">
            <div className="flex flex-col text-left">
              <h3 className="font-heading font-bold text-lg text-text-heading leading-tight">
                Bridgeon
              </h3>
              <span className="font-sans text-sm text-text-subheading mt-1.5">
                Full stack Intern
              </span>
            </div>
            <span className="font-sans text-[13px] text-text-subheading/60 font-medium select-none">
              Present
            </span>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStack />
    </div>
  )
}

export default About
