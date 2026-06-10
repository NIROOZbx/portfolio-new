import React, { useRef, useState, useEffect } from 'react'
import UIUXIllustration from './UIUXIllustration'
import WebDevIllustration from './WebDevIllustration'
import AutomationIllustration from './AutomationIllustration'

export interface ServiceItem {
  title: string
  badge: string
  description: string
}

interface ServiceCardProps {
  service: ServiceItem
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        setScale(width / 360)
      }
    }
    
    handleResize()
    
    const observer = new ResizeObserver(() => handleResize())
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const renderIllustration = () => {
    const title = service.title.toLowerCase()
    if (title.includes('ui/ux')) {
      return <UIUXIllustration />
    }
    if (title.includes('development') || title.includes('web')) {
      return <WebDevIllustration />
    }
    if (title.includes('automation')) {
      return <AutomationIllustration />
    }
    return <div className="w-full h-full" />
  }

  return (
    <div className="flex flex-col items-center text-center group w-full max-w-[360px] mx-auto">
      {/* Light-Grey Image Container */}
      <div 
        ref={containerRef}
        className="w-full aspect-square bg-card-bg rounded-[17px] mb-6 hover:scale-[1.01] hover:shadow-sm transition-all duration-300 select-none cursor-pointer relative overflow-hidden"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: '360px',
            height: '360px'
          }}
          className="absolute inset-0"
        >
          {renderIllustration()}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-[20px] md:text-[22px] text-text-heading mb-2">
        {service.title}
      </h3>

      <div className="mb-4">
        <span className="px-3 py-1 bg-card-bg border border-[#e5e4e7]/40 text-text-subheading/80 rounded-full text-[11px] font-sans font-medium select-none">
          {service.badge}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-sm md:text-[14.5px] text-text-subheading leading-relaxed max-w-[320px]">
        {service.description}
      </p>
    </div>
  )
}

export default ServiceCard
