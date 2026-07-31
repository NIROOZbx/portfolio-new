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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.03] border border-black/[0.06] text-text-subheading/80 text-[11px] font-sans font-medium transition-all select-none hover:bg-black/[0.05]">
            <Eye size={12} className="opacity-70 text-element-black" strokeWidth={2.2} />

            <span className="inline-flex items-baseline font-sans text-[11px] font-medium text-text-subheading/85 gap-1">
                Visitor #
                <CountUp
                    from={0}
                    to={views}
                    separator=","
                    direction="up"
                    duration={1.2}
                    enableBlur={true}
                    className="inline-block tracking-tight font-medium"
                />
            </span>
        </div>
    )
}
