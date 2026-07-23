import React from 'react'
import ServiceCard from '../../components/ServiceCard'
import { serviceList } from '../../data/services'

const Services: React.FC = () => {
  return (
    <section className="animate-fade-in text-left">
      <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight">
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
