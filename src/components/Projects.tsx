import React from 'react'
import ProjectCard from './ProjectCard'
import type { ProjectItem } from './ProjectCard'
import { SITE_CONFIG } from '../config/constants'
import jerseyHubCover from '../assets/jerseyhub-cover.png'
import envoyCover from '../assets/envoy-cover-2.png'
import relayCover from '../assets/relay-cover.png'
const Projects: React.FC = () => {
  const projectList: ProjectItem[] = [
    {
      title: 'Envoy — Notification engine',
      description1: 'Most apps hardcode a single email provider and pray it never goes down. Envoy abstracts all of that — one API that routes notifications across email and SMS, automatically fails over to a backup provider if one drops, queues high-volume sends through Kafka, and gives you full delivery analytics without touching your application code.',
      description2: 'Built as a production-grade multi-tenant SaaS with workspace isolation, RBAC, scheduled sends, and a gRPC billing service. Deployed on Kubernetes with Prometheus and Grafana observability.',
      tags: ['Go', 'Fiber v3', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Zustand', 'Docker', 'Stripe', 'Grafana', 'Helm', 'Prometheus', 'TypeScript', 'React', 'Redis'],
      githubUrl: SITE_CONFIG.projects.envoy.github,
      liveUrl: SITE_CONFIG.projects.envoy.live,
      imageUrl: envoyCover
    },
    {
      title: 'Relay — Real-time Distributed chat',
      description1: "Most chat apps break the moment you scale beyond one server. This one doesn't. Built a real-time group chat platform where messages broadcast instantly across multiple server instances using Redis pub/sub — so horizontal scaling works out of the box without dropping a single message.",
      description2: 'Clean layered Go backend with WebSocket hub pattern, PostgreSQL for persistence, and a fully animated React frontend with GSAP and Motion.',
      tags: ['Go', 'Gin', 'PostgreSQL', 'WebSockets', 'TypeScript', 'GSAP', 'React', 'Redis Pub/Sub', 'Vercel', 'Tailwind'],
      githubUrl: SITE_CONFIG.projects.relay.github,
      liveUrl: SITE_CONFIG.projects.relay.live,
      imageUrl: relayCover
    },
    {
      title: 'Jersey Hub — E-Commerce',
      description1: 'A high-performance RESTful backend built with Go for a complete modern e-commerce platform. Handles user authentication, product catalog, shopping cart, order management, wishlist, reviews, and address handling with production-grade security and scalability.',
      description2: 'Designed with clean architecture, it features JWT authentication, PostgreSQL persistence, Redis caching & rate limiting, and seamless integrations with Cloudinary for image uploads and SendGrid for transactional emails.',
      tags: ['Go', 'Gin', 'PostgreSQL', 'AWS EC2', 'CI/CD', 'Docker', 'React', 'Nginx', 'GitHub Actions', 'Redis'],
      githubUrl: SITE_CONFIG.projects.jerseyHub.github,
      liveUrl: SITE_CONFIG.projects.jerseyHub.live,
      imageUrl: jerseyHubCover
    },
  ]

  return (
    <section className="animate-fade-in text-left">
      <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-tight tracking-tight mb-8">
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
