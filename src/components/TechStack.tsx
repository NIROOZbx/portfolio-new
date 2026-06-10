import React from 'react'

// Import SVG Assets
import awsIcon from '../assets/tech-stack/AWS.svg'
import kafkaIcon from '../assets/tech-stack/Apache Kafka.svg'
import dockerIcon from '../assets/tech-stack/Docker.svg'
import gitIcon from '../assets/tech-stack/Git.svg'
import githubActionsIcon from '../assets/tech-stack/GitHub Actions.svg'
import githubIcon from '../assets/tech-stack/GitHub.svg'
import goIcon from '../assets/tech-stack/Go.svg'
import grafanaIcon from '../assets/tech-stack/Grafana.svg'
import helmIcon from '../assets/tech-stack/Helm.svg'
import nginxIcon from '../assets/tech-stack/NGINX.svg'
import postgresIcon from '../assets/tech-stack/PostgresSQL.svg'
import prometheusIcon from '../assets/tech-stack/Prometheus.svg'
import redisIcon from '../assets/tech-stack/Redis.svg'
import tailwindIcon from '../assets/tech-stack/Tailwind CSS.svg'
import typescriptIcon from '../assets/tech-stack/TypeScript.svg'
import k8 from '../assets/tech-stack/kubernetes.png'
import gin from '../assets/tech-stack/gin.png'
import fiber from '../assets/tech-stack/fiber.svg'

export interface TechItem {
  name: string
  image?: string
}

const TechStack: React.FC = () => {
  const techStack: TechItem[] = [
    { name: 'Go', image: goIcon },
    { name: 'Fiber v3', image: fiber },
    { name: 'Gin', image: gin },
    { name: 'Kafka', image: kafkaIcon },
    { name: 'Tailwind', image: tailwindIcon },
    { name: 'TypeScript', image: typescriptIcon },
    { name: 'PostgreSQL', image: postgresIcon },
    { name: 'Kubernetes', image: k8 },
    { name: 'NGINX', image: nginxIcon },
    { name: 'AWS', image: awsIcon },
    { name: 'CI/CD', image: '' },
    { name: 'GitHub Actions', image: githubActionsIcon },
    { name: 'gRPC', image: '' },
    { name: 'Docker', image: dockerIcon },
    { name: 'Grafana', image: grafanaIcon },
    { name: 'Helm', image: helmIcon },
    { name: 'Prometheus', image: prometheusIcon },
    { name: 'React', image: '' },
    { name: 'Redis', image: redisIcon },
    { name: 'Git', image: gitIcon },
    { name: 'GitHub', image: githubIcon }
  ]

  return (
    <section className="text-center w-full pb-6 md:pb-12">
      <h2 className="font-heading font-semibold text-3xl md:text-[42px] text-text-heading mb-10 text-center">
        Tech Stack
      </h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#e5e4e7]/60 rounded-full text-sm font-medium text-text-subheading hover:bg-neutral-50 hover:scale-[1.02] hover:shadow-sm transition-all duration-200 select-none cursor-pointer"
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
