import React from 'react'
import { X, ArrowRight } from 'lucide-react'

interface AnnouncementBarProps {
    onAuditClick: () => void
    onDismiss: () => void
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onAuditClick, onDismiss }) => {
    return (
        <aside
            aria-label="Announcement"
            onClick={onAuditClick}
            className="w-full bg-primary-bg/95 hover:bg-card-bg/60 backdrop-blur-md text-text-subheading hover:text-element-black h-9 px-3 sm:px-4 flex items-center justify-between text-xs sm:text-sm font-medium z-30 shrink-0 select-none border-b border-border cursor-pointer transition-colors duration-200 group"
        >
            {/* Left balance spacer */}
            <div className="w-7 shrink-0" />

            {/* Centered message */}
            <div className="flex items-center justify-center gap-2 text-center font-sans tracking-tight">
        
                <span className="font-medium text-text-heading group-hover:text-element-black transition-colors">
                    Get a free audit for your website
                </span>
                <ArrowRight
                    size={13}
                    className="text-text-subheading group-hover:text-element-black transition-all duration-200 group-hover:translate-x-1 shrink-0"
                />
            </div>

            {/* Right dismiss button */}
            <div className="w-7 flex justify-end shrink-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDismiss()
                    }}
                    aria-label="Dismiss announcement"
                    className="text-text-subheading/50 hover:text-element-black hover:bg-black/[0.05] transition-colors cursor-pointer p-1 rounded border-0 bg-transparent flex items-center justify-center"
                >
                    <X size={13} strokeWidth={2} />
                </button>
            </div>
        </aside>
    )
}

export default AnnouncementBar
