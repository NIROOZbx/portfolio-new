import React from 'react'

interface DesignsSkeletonProps {
    showHeader?: boolean
    count?: number
}

export const getCachedFolderCount = (): number => {
    try {
        const cached = localStorage.getItem('portfolio_folder_count')
        if (cached) {
            const parsed = parseInt(cached, 10)
            if (!isNaN(parsed) && parsed > 0) return parsed
        }
    } catch {
        // ignore localStorage errors
    }
    return 8
}

const DesignsSkeleton: React.FC<DesignsSkeletonProps> = ({ showHeader = false, count }) => {
    const itemCount = count ?? getCachedFolderCount()

    return (
        <div className="w-full min-h-[50vh] text-left">
            {showHeader && (
                <div className="mb-6 min-h-[56px]">
                    <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight">
                        Designs
                    </h1>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-10">
                {Array.from({ length: itemCount }).map((_, idx) => (
                    <div key={`folder-skel-${idx}`} className="w-full shrink-0 animate-pulse flex flex-col items-center">
                        <div className="w-[70%] aspect-[457/406] bg-black/5 rounded-2xl mb-3" />
                        <div className="h-3 w-20 bg-black/5 rounded mb-1" />
                        <div className="h-2 w-12 bg-black/5 rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DesignsSkeleton

