import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { fetchDesigns } from '../../services/designs'
import { supabase } from '../../services/supabaseClient'
import FolderCard from '../../components/FolderCard'
import DesignModal from './DesignModal'
import type { DesignFolder, DesignItem } from '../../types/designs'

// In-memory cache to prevent re-fetching from Supabase when returning to this tab or folder
let cachedFolders: DesignFolder[] | null = null
let cachedCounts: Record<string, number> | null = null
let cachedPreviews: Record<string, string[]> | null = null
const cachedDesigns: Record<string, DesignItem[]> = {}

const Designs: React.FC = () => {
  const [folders, setFolders] = useState<DesignFolder[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [previews, setPreviews] = useState<Record<string, string[]>>({})
  const [activeFolder, setActiveFolder] = useState<DesignFolder | null>(null)
  
  const [designs, setDesigns] = useState<DesignItem[]>([])
  const [activeDesign, setActiveDesign] = useState<DesignItem | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(false)

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!activeDesign || designs.length === 0) return
    const currentIndex = designs.findIndex(d => d.id === activeDesign.id)
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % designs.length
      setActiveDesign(designs[nextIndex])
    } else {
      const prevIndex = (currentIndex - 1 + designs.length) % designs.length
      setActiveDesign(designs[prevIndex])
    }
  }

  // Fetch folders and counts on mount
  useEffect(() => {
    const fetchFoldersAndCounts = async () => {
      if (cachedFolders && cachedCounts && cachedPreviews) {
        setFolders(cachedFolders)
        setCounts(cachedCounts)
        setPreviews(cachedPreviews)
        setIsLoading(false)
        return
      }

      try {
        const [{ data: fData, error: fErr }, { data: dData }] = await Promise.all([
          supabase.from('design_folders').select('*').order('display_order', { ascending: true }),
          supabase.from('designs').select('folder_id, image_url').order('created_at', { ascending: false })
        ])
        
        if (fErr) throw fErr
        cachedFolders = fData || []
        setFolders(cachedFolders)

        if (dData) {
          const newCounts: Record<string, number> = {}
          const newPreviews: Record<string, string[]> = {}
          
          dData.forEach(d => {
            newCounts[d.folder_id] = (newCounts[d.folder_id] || 0) + 1
            
            if (!newPreviews[d.folder_id]) {
              newPreviews[d.folder_id] = []
            }
            if (newPreviews[d.folder_id].length < 3 && d.image_url) {
              newPreviews[d.folder_id].push(d.image_url)
            }
          })
          
          cachedCounts = newCounts
          cachedPreviews = newPreviews
          setCounts(cachedCounts)
          setPreviews(cachedPreviews)
        }
      } catch (err) {
        console.error('Error fetching folders:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchFoldersAndCounts()
  }, [])

  // Fetch designs when a folder is selected
  useEffect(() => {
    if (!activeFolder) return
    
    if (cachedDesigns[activeFolder.id]) {
      setDesigns(cachedDesigns[activeFolder.id])
      setIsLoadingDesigns(false)
      return
    }

    setIsLoadingDesigns(true)
    fetchDesigns(activeFolder.id)
      .then((data) => {
        cachedDesigns[activeFolder.id] = data
        setDesigns(data)
      })
      .catch((err) => console.error('Error fetching designs:', err))
      .finally(() => setIsLoadingDesigns(false))
  }, [activeFolder])

  return (
    <section className="animate-fade-in text-left ">
      <div className="mb-8 min-h-[56px]">
        {activeFolder ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-text-subheading font-sans text-sm">
              <button 
                onClick={() => setActiveFolder(null)}
                className="flex items-center gap-1 hover:text-element-black transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <span className="opacity-50">/</span>
              <span className="text-element-black font-medium">{activeFolder.title}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
              <div>
                <h1 className="font-heading font-semibold text-3xl md:text-5xl text-text-heading leading-[1.1] tracking-tight uppercase">
                  {activeFolder.title}
                </h1>
                {activeFolder.description && (
                  <p className="font-sans text-text-subheading mt-3 max-w-xl leading-relaxed">
                    {activeFolder.description}
                  </p>
                )}
              </div>
              <span className="font-sans text-xs font-semibold text-text-subheading uppercase tracking-widest whitespace-nowrap">
                {designs.length} {designs.length === 1 ? 'Design' : 'Designs'}
              </span>
            </div>
          </motion.div>
        ) : (
          <h1 className="font-heading font-semibold text-4xl md:text-[56px] text-text-heading leading-[1.1] tracking-tight">
            Designs
          </h1>
        )}
      </div>

      <div className="-mx-6 px-6 md:mx-0 md:px-0">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full min-h-[50vh]"
            >
              <div className="flex flex-wrap gap-6 md:gap-10 pb-10">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="w-[140px] md:w-[180px] shrink-0 animate-pulse">
                    <div className="w-full aspect-square md:aspect-[4/3] bg-black/5 rounded-2xl mb-3"></div>
                    <div className="h-5 bg-black/5 rounded-full w-2/3 mx-auto"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : !activeFolder ? (
            /* FOLDERS GRID */
            <motion.div 
              key="folders"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap gap-6 md:gap-10 pb-10"
            >
              {folders.map((folder) => (
                <motion.div
                  key={folder.id}
                  className="w-[140px] md:w-[180px] shrink-0"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                  }}
                >
                  <FolderCard 
                    folder={folder} 
                    itemCount={counts[folder.id] || 0}
                    previews={previews[folder.id] || []}
                    onClick={() => setActiveFolder(folder)} 
                  />
                </motion.div>
              ))}
              {folders.length === 0 && (
                <div className="col-span-full w-full max-w-sm mx-auto mt-10 pointer-events-none opacity-60">
                  <FolderCard 
                    folder={{ id: 'empty', title: 'Empty', display_order: 0 }} 
                    itemCount={0} 
                    onClick={() => {}} 
                  />
                  <p className="text-center mt-6 text-text-subheading font-sans">No folders found.</p>
                </div>
              )}
            </motion.div>
          ) : (
            /* DESIGNS GRID */
            <motion.div
              key="designs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLoadingDesigns ? (
                <div className="w-full min-h-[50vh]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="rounded-2xl bg-white border border-black/5 p-3 flex flex-col animate-pulse">
                        <div className="rounded-xl bg-black/5 aspect-[4/3] shrink-0 w-full mb-4"></div>
                        <div className="h-5 bg-black/5 rounded w-3/4 mb-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : designs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                  {designs.map((design) => (
                    <motion.div
                      key={design.id}
                      className="cursor-pointer group rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 transition-all p-3 flex flex-col"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveDesign(design)}
                    >
                      <div className="relative rounded-xl overflow-hidden bg-[#f5f5f5] aspect-[4/3] shrink-0 flex items-center justify-center p-2">
                        <img 
                          src={design.image_url || 'https://placehold.co/600x400/1e1e1e/565353?text=No+Image'} 
                          alt={design.title} 
                          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1e1e1e/565353?text=No+Image' }}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                      <div className="mt-4 px-1 flex flex-col pb-1">
                        <h3 className=" text-element-black  text-[12px]">
                          {design.title}
                        </h3>
                        <p className="text-[11px] font-sans text-text-subheading max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 group-hover:mt-1 transition-all duration-300 overflow-hidden">
                          Click to view design
                        </p>
                      </div>
                    </motion.div>
                  ))}
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
        designs={designs}
        onClose={() => setActiveDesign(null)} 
        onNavigate={handleNavigate}
      />
    </section>
  )
}

export default Designs
