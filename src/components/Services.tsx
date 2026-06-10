import React from 'react'
import ServiceCard from './ServiceCard'
import type { ServiceItem } from './ServiceCard'

const Services: React.FC = () => {
  const serviceList: ServiceItem[] = [
    {
      title: 'UI/UX Design',
      badge: "Your product's first impression",
      description: 'Most users decide in seconds whether to stay or leave. I design interfaces that feel intuitive, look polished, and guide people exactly where you want them to go — no confusion, no friction.'
    },
    {
      title: 'Web Development',
      badge: 'Your idea, live on the internet',
      description: "A great design means nothing if it doesn't work. I build fast, clean websites and web apps that look exactly like the design — and hold up under real users, real devices, and real traffic."
    },
    {
      title: 'Automation & AI',
      badge: 'Stop doing the same thing twice',
      description: "Copy-pasting data, chasing invoices, scheduling posts, sending the same reply for the hundredth time. I'll handle all of it — so you spend less time managing tools and more time doing what you're actually good at."
    }
  ]

  return (
    <section className="animate-fade-in text-left">
      <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-tight tracking-tight">
        From idea to reality
      </h1>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mt-8">
        {serviceList.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </section>
  )
}

export default Services

