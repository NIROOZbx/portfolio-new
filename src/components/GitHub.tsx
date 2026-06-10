import { useEffect, useState, useRef } from "react";

interface Contribution {
    date: string;
    contributionCount: number;
    color: string;
}

export default function GithubContributionCard() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [total, setTotal] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);

    useEffect(() => {
        fetch("https://github-contributions-api.deno.dev/NIROOZbx.json")
            .then((res) => res.json())
            .then((data) => {
                const rawContributions = data.contributions;
                const flattened = Array.isArray(rawContributions)
                    ? (Array.isArray(rawContributions[0]) ? rawContributions.flat() : rawContributions)
                    : [];
                setContributions(flattened);
                setTotal(data.totalContributions || 0);
            })
            .catch((err) => {
                console.warn("Unable to load GitHub contributions:", err);
            });
    }, []);

    // Scroll to the end (most recent contributions) when data is loaded
    useEffect(() => {
        if (contributions.length > 0 && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [contributions]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsMouseDown(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftState(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    };

    // Custom light-theme green color mapping for premium monochromatic/green design
    const getContributionColor = (count: number) => {
        if (count === 0) return '#f5f5f7'; // Empty cell color matching secondary bg
        if (count <= 2) return '#dcfce7';  // Light green
        if (count <= 4) return '#bbf7d0';  // Medium-light green
        if (count <= 6) return '#86efac';  // Medium green
        return '#4ade80';                 // Darker green
    };

    return (
        <div className="w-full rounded-xl border border-[#e5e4e7]/60 bg-white p-3.5 select-none transition-all duration-300 hover:border-[#e5e4e7]/80 hover:shadow-sm">
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
                ref={scrollContainerRef}
                className="overflow-x-auto cursor-grab active:cursor-grabbing select-none w-full overscroll-x-contain [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
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
                <div className="h-2 w-2 rounded-[1px] bg-[#f5f5f7] border border-[#e5e4e7]/40" />
                <div className="h-2 w-2 rounded-[1px] bg-[#dcfce7]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#bbf7d0]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#86efac]" />
                <div className="h-2 w-2 rounded-[1px] bg-[#4ade80]" />
                <span>More</span>
            </div>
        </div>
    );
}