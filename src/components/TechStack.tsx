import React from 'react'
import { techStack } from '../data/techStack'

const TechStack: React.FC = () => {
  return (
    <section className="text-center w-full pb-6 md:pb-12">
      <h2 className="font-heading font-semibold text-3xl md:text-[42px] text-text-heading mb-10 text-center leading-[1.1] tracking-tight">
        Tech Stack
      </h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-border/60 rounded-full text-sm font-medium text-text-subheading hover:bg-neutral-50 hover:scale-[1.02] hover:shadow-sm transition-all duration-200 select-none cursor-pointer"
          >
            {tech.image && (
              <img
                src={tech.image}
                alt={tech.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
            )}
            <span>{tech.name}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

export default TechStack
