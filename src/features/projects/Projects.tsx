import React from 'react'
import ProjectCard from '../../components/ProjectCard'
import { projectList } from '../../data/projects'

const Projects: React.FC = () => {
  return (
    <section className="animate-fade-in text-left">
      <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight mb-8">
        Projects
      </h1>

      <div className="flex flex-col gap-10">
        {projectList.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
