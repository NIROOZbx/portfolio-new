import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import CountUp from './CountUp'
import { getAndIncrementTotalViews } from '../services/visitorStats'

export default function VisitorCounter() {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        getAndIncrementTotalViews().then((count) => {
            if (count !== null) {
                setViews(count)
            }
        })
    }, [])

    if (views === null) return null

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
                    className="font-semibold text-element-black text-[10px] tracking-tight group-hover:text-black transition-colors"
                />
                <span>visitors</span>
            </span>
        </div>
    )
}
