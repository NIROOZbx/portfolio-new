import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye } from 'lucide-react'
import { supabase } from '../../services/supabaseClient'
import FolderCard from '../../components/FolderCard'
import DesignModal from './DesignModal'
import DesignsSkeleton from './DesignsSkeleton'
import type { DesignFolder, DesignItem } from '../../types/designs'

interface LazyDesignImageProps {
    src?: string
    alt: string
}

const LazyDesignImage: React.FC<LazyDesignImageProps> = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHasError(false)
        setIsLoaded(false)
    }, [src])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        if (!('IntersectionObserver' in window)) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: '250px 0px',
                threshold: 0.01
            }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const fallbackSrc = 'https://placehold.co/600x400/1e1e1e/565353?text=No+Image'
    const finalSrc = hasError || !src ? fallbackSrc : src

    return (
        <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-black/[0.04] animate-pulse rounded-lg" />
            )}
            {isVisible && (
                <img
                    src={finalSrc}
                    alt={alt}
                    onError={() => {
                        setHasError(true)
                        setIsLoaded(true)
                    }}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-contain transition-all duration-300 lg:group-hover:scale-105 lg:group-hover:blur-[0.5px] ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    )
}

const DesignCardSkeleton: React.FC<{ innerRef?: React.Ref<HTMLDivElement> }> = ({ innerRef }) => {
    return (
        <div
            ref={innerRef}
            className="rounded-2xl bg-primary-bg border border-black/5 p-3 flex flex-col overflow-hidden select-none"
        >
            <div className="relative rounded-xl overflow-hidden bg-black/[0.04] aspect-[4/3] shrink-0">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
            </div>
            <div className="mt-4 px-1 flex flex-col pb-1">
                <div className="relative h-3.5 w-3/4 rounded bg-black/[0.04] overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    )
}

// Stale-While-Revalidate cache variables for 0ms instant loading
let memoryFolders: DesignFolder[] | null = null
let memoryCounts: Record<string, number> = {}
let memoryPreviews: Record<string, string[]> = {}
let memoryDesignsMap: Record<string, DesignItem[]> = {}

try {
    const cachedFoldersStr = localStorage.getItem('portfolio_cached_folders')
    if (cachedFoldersStr && !memoryFolders) {
        memoryFolders = JSON.parse(cachedFoldersStr)
    }
} catch {
    // ignore localStorage read error
}

interface DesignsProps {
    onHideFooter?: (hide: boolean) => void
}

const Designs: React.FC<DesignsProps> = ({ onHideFooter }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    // Initialize with cached data if available (0ms instant render)
    const [folders, setFolders] = useState<DesignFolder[]>(memoryFolders || [])
    const [counts, setCounts] = useState<Record<string, number>>(memoryCounts)
    const [previews, setPreviews] = useState<Record<string, string[]>>(memoryPreviews)
    const [cachedDesigns, setCachedDesigns] = useState<Record<string, DesignItem[]>>(memoryDesignsMap)
    const [isAnimating, setIsAnimating] = useState(true)
    const [isLoading, setIsLoading] = useState(!memoryFolders)

    useEffect(() => {
        let isMounted = true
        // Revalidate from Supabase in the background
        const fetchData = async () => {
            try {
                const [{ data: fData }, { data: dData }] = await Promise.all([
                    supabase.from('design_folders').select('*').order('display_order', { ascending: true }),
                    supabase.from('designs').select('*').order('created_at', { ascending: false })
                ])

                if (!isMounted) return
                const freshFolders = fData || []
                memoryFolders = freshFolders
                try {
                    localStorage.setItem('portfolio_folder_count', String(freshFolders.length))
                    localStorage.setItem('portfolio_cached_folders', JSON.stringify(freshFolders))
                } catch {
                    // ignore localStorage write error
                }
                setFolders(freshFolders)

                const newCounts: Record<string, number> = {}
                const newPreviews: Record<string, string[]> = {}
                const newDesignsMap: Record<string, DesignItem[]> = {}

                if (dData) {
                    dData.forEach(d => {
                        newCounts[d.folder_id] = (newCounts[d.folder_id] || 0) + 1

                        if (!newPreviews[d.folder_id]) {
                            newPreviews[d.folder_id] = []
                        }
                        if (newPreviews[d.folder_id].length < 3 && d.image_url) {
                            newPreviews[d.folder_id].push(d.image_url)
                        }

                        if (!newDesignsMap[d.folder_id]) {
                            newDesignsMap[d.folder_id] = []
                        }
                        newDesignsMap[d.folder_id].push(d)
                    })
                }

                memoryCounts = newCounts
                memoryPreviews = newPreviews
                memoryDesignsMap = newDesignsMap

                setCounts(newCounts)
                setPreviews(newPreviews)
                setCachedDesigns(newDesignsMap)
            } catch (err) {
                console.error('Error fetching designs:', err)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchData()
        return () => {
            isMounted = false
        }
    }, [])

    const folderIdParam = searchParams.get('folder')
    const designIdParam = searchParams.get('design')

    const activeFolder = folderIdParam ? (folders.find(f => f.id === folderIdParam) || null) : null
    const designs = activeFolder ? (cachedDesigns[activeFolder.id] || []) : []
    const activeDesign = designIdParam ? (designs.find(d => d.id === designIdParam) || null) : null

    const handleNavigate = (direction: 'next' | 'prev') => {
        if (!activeDesign || !activeFolder) return
        
        // Flatten all designs across all folders to allow seamless cross-folder navigation
        const allDesignsFlattened: { folderId: string, design: DesignItem }[] = []
        folders.forEach(f => {
            const fDesigns = cachedDesigns[f.id] || []
            fDesigns.forEach(d => allDesignsFlattened.push({ folderId: f.id, design: d }))
        })

        if (allDesignsFlattened.length === 0) return

        const currentIndex = allDesignsFlattened.findIndex(item => item.design.id === activeDesign.id)
        if (currentIndex === -1) return

        let nextIndex: number
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % allDesignsFlattened.length
        } else {
            nextIndex = (currentIndex - 1 + allDesignsFlattened.length) % allDesignsFlattened.length
        }
        
        const nextItem = allDesignsFlattened[nextIndex]
        if (nextItem) {
            setSearchParams(
                { folder: nextItem.folderId, design: nextItem.design.id },
                { replace: true }
            )
        }
    }

    useEffect(() => {
        if (onHideFooter) {
            // Hide footer if activeFolder is present or if we are loading a specific folder URL
            onHideFooter(!!activeFolder || (!!folderIdParam && isLoading))
        }
    }, [activeFolder, folderIdParam, isLoading, onHideFooter])

    const INITIAL_BATCH = 8
    const BATCH_SIZE = 4
    const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
    const isLoadingRef = useRef(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    // Decoupled loader that CANNOT be cancelled prematurely by React state re-renders
    const loadMore = useCallback(() => {
        if (isLoadingRef.current) return
        if (visibleCount >= designs.length) return

        isLoadingRef.current = true

        window.setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + BATCH_SIZE, designs.length))
            isLoadingRef.current = false
        }, 350)
    }, [visibleCount, designs.length])

    // Reset when folder changes
    useEffect(() => {
        if (activeFolder) {
            const mainEl = document.querySelector('main')
            if (mainEl) mainEl.scrollTop = 0
            window.scrollTo({ top: 0 })

            isLoadingRef.current = false

            if (designIdParam) {
                const targetIdx = designs.findIndex(d => d.id === designIdParam)
                if (targetIdx !== -1 && targetIdx >= INITIAL_BATCH) {
                    setVisibleCount(Math.ceil((targetIdx + 1) / BATCH_SIZE) * BATCH_SIZE)
                    return
                }
            }

            setVisibleCount(INITIAL_BATCH)
        }
    }, [activeFolder?.id])

    // Expand visible count if user navigates to a design beyond current batch
    useEffect(() => {
        if (designIdParam && activeFolder) {
            const targetIdx = designs.findIndex(d => d.id === designIdParam)
            if (targetIdx !== -1 && targetIdx >= visibleCount) {
                setVisibleCount(Math.ceil((targetIdx + 1) / BATCH_SIZE) * BATCH_SIZE)
            }
        }
    }, [designIdParam, activeFolder, designs, visibleCount])

    const visibleDesigns = designs.slice(0, visibleCount)

    // Primary: IntersectionObserver on sentinel
    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore()
                }
            },
            {
                rootMargin: '200px 0px',
                threshold: 0
            }
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [loadMore, visibleDesigns.length])

    // Secondary: Direct scroll listener on <main> scroll container for instant guaranteed trigger
    useEffect(() => {
        const mainEl = document.querySelector('main')
        if (!mainEl) return

        const handleScroll = () => {
            if (isLoadingRef.current) return
            if (visibleCount >= designs.length) return

            const { scrollTop, scrollHeight, clientHeight } = mainEl
            if (scrollHeight - scrollTop - clientHeight < 350) {
                loadMore()
            }
        }

        mainEl.addEventListener('scroll', handleScroll, { passive: true })
        return () => mainEl.removeEventListener('scroll', handleScroll)
    }, [loadMore, visibleCount, designs.length])




    return (
        <section className="text-left w-full">
            <div className="mb-6 min-h-[56px]">
                {activeFolder ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3"
                    >
                        {/* ANIMATION START: Header title and back button fading in and dropping down slightly when opening a folder */}
                        <div className="flex items-center text-text-subheading font-sans text-sm">
                            <button
                                onClick={() => setSearchParams({})}
                                className="flex items-center gap-1.5 hover:text-element-black transition-colors group font-medium"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                View All Folders
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="flex items-baseline justify-between gap-4">
                                <h1 className="font-heading font-semibold text-3xl md:text-5xl text-text-heading leading-[1.1] tracking-tight ">
                                    {activeFolder.title}
                                </h1>
                                <span className="font-sans text-xs font-semibold text-text-subheading uppercase tracking-widest whitespace-nowrap shrink-0">
                                    {designs.length} {designs.length === 1 ? 'Design' : 'Designs'}
                                </span>
                            </div>
                            {activeFolder.description && (
                                <p className="font-sans text-text-subheading mt-3 max-w-xl leading-relaxed">
                                    {activeFolder.description}
                                </p>
                            )}
                        </div>

                        {/* FOLDER TABS - Segmented Control (iOS Style) */}
                        {folders.length > 1 && (
                            <div className="mt-3 -mx-6 px-6 md:mx-0 md:px-0 flex">
                                <div className="inline-flex items-center bg-[#f0f0f0] p-1 rounded-full border border-black/5 overflow-x-auto no-scrollbar max-w-full">
                                    {folders.map(f => {
                                        const isActive = f.id === activeFolder.id;
                                        return (
                                            <button
                                                key={`tab-${f.id}`}
                                                onClick={() => setSearchParams({ folder: f.id })}
                                                className={`relative px-5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                                                    isActive
                                                        ? 'text-element-black'
                                                        : 'text-text-subheading hover:text-element-black'
                                                }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-folder-tab"
                                                        className="absolute inset-0 bg-primary-bg rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-black/[0.04]"
                                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{f.title}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight">
                        Designs
                    </h1>
                )}
            </div>

            <div className="-mx-6 px-6 md:mx-0 md:px-0">
                <AnimatePresence mode="wait">
                    {isLoading && folders.length === 0 ? (
                        <DesignsSkeleton showHeader={false} />
                    ) : !activeFolder ? (
                        /* FOLDERS GRID */
                        <motion.div
                            key="folders"
                            variants={{
                                hidden: { opacity: 1 },
                                show: { opacity: 1, transition: { staggerChildren: 0.08 } }
                            }}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.2, ease: 'easeIn' } }}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-10"
                            onAnimationStart={() => setIsAnimating(true)}
                            onAnimationComplete={() => setIsAnimating(false)}
                        >
                            {/* ANIMATION START: The stagger for folders loading. */}
                            {folders.map((folder) => (
                                <motion.div
                                    key={folder.id}
                                    className="w-full shrink-0"
                                    style={{ willChange: isAnimating ? 'transform, opacity' : 'auto' }}
                                    variants={{
                                        hidden: { opacity: 0, y: 16 },
                                        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
                                    }}
                                >
                                    {/* ANIMATION START: The spring animation for each individual folder card rising up from the bottom when loaded. */}
                                    <FolderCard
                                        folder={folder}
                                        itemCount={counts[folder.id] || 0}
                                        previews={previews[folder.id] || []}
                                        onClick={() => {
                                            setSearchParams({ folder: folder.id })
                                        }}
                                    />
                                </motion.div>
                            ))}
                            {folders.length === 0 && !isLoading && (
                                <div className="col-span-full w-full max-w-sm mx-auto mt-10 pointer-events-none opacity-60">
                                    <FolderCard
                                        folder={{ id: 'empty', title: 'Empty', display_order: 0 }}
                                        itemCount={0}
                                        onClick={() => { }}
                                    />
                                    <p className="text-center mt-6 text-text-subheading font-sans">No folders found.</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        /* DESIGNS GRID */
                        <motion.div
                            key="designs"
                            style={{ willChange: isAnimating ? 'transform, opacity' : 'auto' }}
                            variants={{
                                hidden: { opacity: 0, scale: 0.95, y: 15 },
                                show: {
                                    opacity: 1, scale: 1, y: 0,
                                    transition: { type: 'spring', stiffness: 150, damping: 25, staggerChildren: 0.02 }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            onAnimationStart={() => setIsAnimating(true)}
                            onAnimationComplete={() => setIsAnimating(false)}
                        >
                            {/* ANIMATION START: The designs grid popping up without expensive scaling. */}
                            {designs.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-10 min-h-[50vh] items-start">
                                    {visibleDesigns.map((design) => (
                                        <motion.div
                                            key={design.id}
                                            style={{ willChange: isAnimating ? 'transform, opacity' : 'auto' }}
                                            className="cursor-pointer group rounded-2xl bg-primary-bg hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 transition-shadow duration-300 p-3 flex flex-col"
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                            }}
                                            onClick={() => {
                                                if (activeFolder) {
                                                    setSearchParams({ folder: activeFolder.id, design: design.id })
                                                }
                                            }}
                                        >
                                            <div className="relative rounded-xl overflow-hidden bg-[#f5f5f5] aspect-[4/3] shrink-0 flex items-center justify-center p-2">
                                                <LazyDesignImage
                                                    src={design.image_url}
                                                    alt={design.title}
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                                                    <p className="flex items-center gap-1 text-white text-[13px] font-sans font-medium tracking-wide opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                        <Eye size={12} /> Click to view design
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4 px-1 flex flex-col pb-1">
                                                <h3 className=" text-element-black  text-[12px]">
                                                    {design.title}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Skeleton loading cards when scrolling */}
                                    {visibleDesigns.length < designs.length && (
                                        <>
                                            {Array.from({ length: Math.min(BATCH_SIZE, designs.length - visibleDesigns.length) }).map((_, idx) => (
                                                <DesignCardSkeleton
                                                    key={`scroll-skel-${idx}`}
                                                    innerRef={idx === 0 ? sentinelRef : undefined}
                                                />
                                            ))}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-md mx-auto px-4"
                                >
                                    <div className="w-24 h-24 mb-6 rounded-full bg-card-bg border border-border flex items-center justify-center opacity-50 shadow-inner">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-subheading">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <path d="M21 15l-5-5L5 21" />
                                        </svg>
                                    </div>
                                    <h3 className="font-heading font-medium text-2xl text-element-black mb-2 tracking-tight">No designs here yet</h3>
                                    <p className="font-sans text-text-subheading leading-relaxed">
                                        New designs will appear in this collection soon. Check back later to see updates!
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <DesignModal
                design={activeDesign}
                onClose={() => {
                    if (activeFolder) {
                        setSearchParams({ folder: activeFolder.id })
                    } else {
                        setSearchParams({})
                    }
                }}
                onNavigate={handleNavigate}
            />
        </section>
    )
}

export default Designs
