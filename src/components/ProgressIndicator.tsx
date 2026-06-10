import React from 'react'
import { Lightbulb, Laptop, Code, Cpu } from 'lucide-react'

const ProgressIndicator: React.FC = () => {
  const steps = [
    {
      icon: <Lightbulb size={24} className="text-text-heading" />,
      title: 'Initial idea',
      description: 'We start with a conversation. I learn about your business, your goals, and what you actually need — then turn that into a clear plan we both agree on'
    },
    {
      icon: <Laptop size={24} className="text-text-heading" />,
      title: 'Sprint planning',
      description: 'Before anything is built, we map it out. Low-fidelity wireframes, a project roadmap, and a timeline — so there are no surprises halfway through'
    },
    {
      icon: <Code size={24} className="text-text-heading" />,
      title: 'Creation',
      description: 'This is where the work happens. Design, code, animation, automation — executed sprint by sprint with regular check-ins so you always know where things stand'
    },
    {
      icon: <Cpu size={24} className="text-text-heading" />,
      title: 'Launch',
      description: "When everything is finished ,we go live. I handle the deployment and hand everything over cleanly — files, credentials, documentation — so you're never dependent on me to keep things running."
    }
  ]

  return (
    <div className="w-full max-w-[1215px] mx-auto text-center">
      <h1 className="font-heading font-semibold text-3xl md:text-[42px] text-text-heading mb-10 text-center">
        Clear steps. Clean delivery
      </h1>

      <div className="relative w-full">
        {/* Horizontal Dashed Line (connector) */}
        <div className="absolute top-[30px] left-[126px] right-[126px] h-0 border-t-2 border-dashed border-text-subheading/35 hidden lg:block" />

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-6 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="w-full max-w-[260px] lg:w-[201px] flex flex-col items-center gap-3 relative z-10"
            >
              {/* Icon Circle */}
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-white rounded-[30px] border-2 border-text-subheading p-4 shadow-sm hover:scale-105 transition-all duration-300 select-none">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-sans font-semibold text-[20px] text-black leading-tight mt-1">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[14px] text-text-heading leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressIndicator
