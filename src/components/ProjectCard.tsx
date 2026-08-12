import React from 'react'
import { ExternalLink } from 'lucide-react'
import githubIcon from '../assets/square-github-brands-solid-full.svg'
import type { ProjectItem } from '../types'

export type { ProjectItem }

interface ProjectCardProps {
    project: ProjectItem
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="group bg-card-bg px-5 py-5 md:p-8 rounded-[20px] border border-border/40 flex flex-col md:flex-row gap-8 items-stretch max-w-[1215px] mx-auto hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300">
            {/* Left Column: Portrait Image */}
            <div className="w-full md:w-[42%] min-h-[320px] md:min-h-[440px] rounded-xl overflow-hidden relative select-none">
                <img
                    src={project.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Right Column: Text Content */}
            <div className="flex-grow flex flex-col justify-between py-2 md:w-[58%] text-left">
                <div>
                    <h2 className="font-heading font-semibold text-2xl md:text-3xl text-text-heading mb-4 leading-[1.1]">
                        {project.title}
                    </h2>

                    <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed mb-4">
                        {project.description1}
                    </p>

                    <p className="font-sans text-sm md:text-base text-text-subheading leading-relaxed mb-6">
                        {project.description2}
                    </p>
                </div>

                <div>
                    {/* Tech Badges (White BG, Gray borders, Pill shape) */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-white border border-border text-text-subheading rounded-full text-[11px] font-medium transition-all duration-200 hover:bg-neutral-50 select-none"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Visit buttons */}
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Visit Github Button */}
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-element-black hover:bg-neutral-800 text-white rounded-full font-sans text-xs font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
                        >
                            <img src={githubIcon} width={24} height={24} className="w-[24px] h-[24px] invert" alt="GitHub repository" />
                            Visit GitHub
                        </a>

                        {/* Live Site Button (if exists) */}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-b from-white to-[#f0f0f0] border border-[#d2d2d5] hover:to-[#e4e4e6] text-text-heading rounded-full font-sans text-xs font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
                            >
                                <ExternalLink size={16} strokeWidth={2.2} />
                                Live Site
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
