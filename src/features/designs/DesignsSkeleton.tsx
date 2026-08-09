import React from 'react'

interface DesignsSkeletonProps {
    showHeader?: boolean
}

const DesignsSkeleton: React.FC<DesignsSkeletonProps> = ({ showHeader = false }) => {
    return (
        <div className="w-full min-h-[50vh] text-left">
            {showHeader && (
                <div className="mb-8 min-h-[56px]">
                    <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight">
                        Designs
                    </h1>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-10">
                {Array.from({ length: 7 }).map((_, idx) => (
                    <div key={idx} className="w-full shrink-0 animate-pulse">
                        <div className="w-full aspect-square md:aspect-[4/3] bg-black/5 rounded-2xl mb-3" />
                        <div className="h-5 bg-black/5 rounded-full w-2/3 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DesignsSkeleton
