import { useEffect, useState } from 'react'
import CountUp from './CountUp'

export default function VisitorCounter() {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        const requestTimer = window.setTimeout(() => {
            void import('../services/visitorStats').then(({ getAndIncrementTotalViews }) => {
                getAndIncrementTotalViews().then((count) => {
                    if (count !== null) {
                        setViews(count)
                    }
                })
            })
        }, 2500)

        return () => window.clearTimeout(requestTimer)
    }, [])

    if (views === null) {
        return (
            <div className="inline-flex items-center gap-2.5 opacity-60">
                <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-medium text-text-subheading/90">
                    <span className="inline-block h-2.5 w-6 bg-gray-200 dark:bg-gray-800 rounded-sm animate-pulse" />
                    <span>visitors</span>
                </span>
            </div>
        )
    }

    return (
        <div className="inline-flex items-center gap-2.5">
            {/* Live Pulsing Emerald Dot */}
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>

            {/* Counter Text */}
            <span className="inline-flex items-baseline gap-1.5 font-sans text-[10px] font-medium text-text-subheading/90">
                <CountUp
                    from={0}
                    to={views}
                    separator=","
                    direction="up"
                    duration={1.5}
                    enableBlur={true}
                    className="font-semibold text-element-black text-[10px] tabular-nums tracking-tight group-hover:text-black transition-colors"
                />
                <span>visitors</span>
            </span>
        </div>
    )
}
