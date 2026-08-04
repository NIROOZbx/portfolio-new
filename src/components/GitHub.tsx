import { useEffect, useState } from "react";
import { fetchContributions } from '../services/github';
import { useDragScroll } from '../hooks/useDragScroll'

interface Contribution {
    date: string;
    contributionCount: number;
    color: string;
}

export default function GithubContributionCard() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [total, setTotal] = useState(0);

    const { scrollRef, dragHandlers } = useDragScroll()

    useEffect(() => {
        const requestTimer = window.setTimeout(() => {
            fetchContributions()
                .then(({ contributions: c, total: t }) => {
                    setContributions(c);
                    setTotal(t);
                })
                .catch((err) => {
                    console.warn("Unable to load GitHub contributions:", err);
                });
        }, 2500)

        return () => window.clearTimeout(requestTimer)
    }, []);

    // Scroll to the end (most recent contributions) when data is loaded
    useEffect(() => {
        if (contributions.length > 0 && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [contributions, scrollRef]);

    // Custom light-theme green color mapping for premium monochromatic/green design
    const getContributionColor = (count: number) => {
        if (count === 0) return '#f5f5f7'; // Empty cell color matching secondary bg
        if (count <= 2) return '#dcfce7';  // Light green
        if (count <= 4) return '#bbf7d0';  // Medium-light green
        if (count <= 6) return '#86efac';  // Medium green
        return '#4ade80';                 // Darker green
    };

    return (
        <div className="w-full mt-0 rounded-[20px] border border-border/60 bg-white p-3.5 select-none transition-all duration-200 hover:border-border/80 hover:shadow-sm">
            {/* Header section */}
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <h2 className="text-xs font-heading font-bold text-text-heading">
                        GitHub Contributions
                    </h2>
                    <p className="text-[10px] font-sans text-text-subheading/70">
                        {total.toLocaleString()} in the last year
                    </p>
                </div>

                <a
                    href="https://github.com/NIROOZbx"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-sans font-medium text-text-subheading/60 hover:text-element-black transition-colors"
                >
                    View Profile →
                </a>
            </div>

            {/* Drag-to-swipe Scroll Container (Hides native scrollbar, supports grab-to-scroll) */}
            <div
                ref={scrollRef}
                className="overflow-x-auto cursor-grab active:cursor-grabbing select-none w-full overscroll-x-contain [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                {...dragHandlers}
            >
                <div
                    className="grid grid-flow-col grid-rows-7 gap-[2px] py-1"
                    style={{ width: "max-content" }}
                >
                    {contributions.map((day) => (
                        <div
                            key={day.date}
                            className="h-[8px] w-[8px] rounded-[1.5px] border border-black/5"
                            style={{ backgroundColor: getContributionColor(day.contributionCount) }}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                        />
                    ))}
                </div>
            </div>

            {/* Color scale legend */}
            <div className="mt-2.5 flex items-center justify-end gap-1 text-[9px] text-text-subheading/50">
                <span>Less</span>
                <div className="h-2 w-2 rounded-[1px] bg-[#f5f5f7] border border-border/40" />
                <div className="h-2 w-2 rounded-[1px] bg-[#dcfce7]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#bbf7d0]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#86efac]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#4ade80]" />
                <span>More</span>
            </div>
        </div>
    );
}
