import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { voteDesign } from '../../services/designs'

import type { DesignItem } from '../../types/designs'

interface DesignModalProps {
  design: DesignItem | null
  designs?: DesignItem[]
  onClose: () => void
  onNavigate?: (direction: 'next' | 'prev') => void
}

const DesignModal: React.FC<DesignModalProps> = ({ design, designs = [], onClose, onNavigate }) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    if (design) {
      setLikes(design.likes_count || 0)
      setDislikes(design.dislikes_count || 0)
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' && onNavigate) onNavigate('next')
        if (e.key === 'ArrowLeft' && onNavigate) onNavigate('prev')
        if (e.key === 'Escape') onClose()
      }
      
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
      }
    }
  }, [design, onNavigate, onClose])

  if (!design) return null

  const totalVotes = likes + dislikes
  const approvalRating = totalVotes > 0 ? Math.round((likes / totalVotes) * 100) : 0

  const handleVote = async (type: 'like' | 'dislike') => {
    const currentVote = localStorage.getItem(`voted_${design.id}`)

    // Retract vote if clicking the same one again
    if (currentVote === type) {
      if (type === 'like') setLikes(prev => prev - 1)
      else setDislikes(prev => prev - 1)
      
      localStorage.removeItem(`voted_${design.id}`)
      
      try {
        await voteDesign(design.id, type, 'remove')
      } catch (err) {
        console.error('Error removing vote:', err)
      }
      return
    }

    // Switch vote if they already voted for the other type
    if (currentVote) {
      if (currentVote === 'like') setLikes(prev => prev - 1)
      else setDislikes(prev => prev - 1)
      
      try {
        await voteDesign(design.id, currentVote as 'like' | 'dislike', 'remove')
      } catch (err) {
        console.error('Error removing old vote:', err)
      }
    }

    // Add new vote
    if (type === 'like') setLikes(prev => prev + 1)
    else setDislikes(prev => prev + 1)
    
    localStorage.setItem(`voted_${design.id}`, type)

    try {
      await voteDesign(design.id, type, 'add')
    } catch (err) {
      console.error('Error voting:', err)
    }
  }

  const modalContent = (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-8 md:p-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Floating Close Button (Outside Card) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <motion.div 
          className="relative w-fit h-fit max-h-[90vh] max-w-[90vw] bg-[#fafafa] rounded-2xl shadow-2xl flex flex-col p-2 md:p-4"
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Navigation Arrows (Outside Card) */}
          {onNavigate && designs.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
                className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 md:opacity-100 hover:-translate-x-2"
              >
                <ChevronLeft size={40} strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
                className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 md:opacity-100 hover:translate-x-2"
              >
                <ChevronRight size={40} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative rounded-xl bg-[#f5f5f5] overflow-hidden flex justify-center items-center [transform:translateZ(0)]">
             <img 
               src={design.image_url || 'https://placehold.co/1200x800/1e1e1e/565353?text=No+Image'} 
               alt={design.title}
               onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x800/1e1e1e/565353?text=No+Image' }}
               className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-xl block"
             />
          </div>

          {/* Rating Footer Integrated into Card */}
          <div className="mt-4 px-4 pb-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl text-element-black leading-none">
                {totalVotes > 0 ? `${approvalRating}%` : '---'}
              </span>
              <span className="text-[10px] text-text-subheading font-sans uppercase tracking-wider mt-1">
                Community Approval
              </span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleVote('like')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
                  localStorage.getItem(`voted_${design.id}`) === 'like'
                    ? 'bg-element-black text-white border-element-black'
                    : 'bg-white hover:bg-[#f5f5f5] text-element-black border-border'
                }`}
              >
                <ThumbsUp size={16} />
                <span className="font-medium text-sm">{likes}</span>
              </button>

              <button 
                onClick={() => handleVote('dislike')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
                  localStorage.getItem(`voted_${design.id}`) === 'dislike'
                    ? 'bg-element-black text-white border-element-black'
                    : 'bg-white hover:bg-[#f5f5f5] text-element-black border-border'
                }`}
              >
                <ThumbsDown size={16} />
                <span className="font-medium text-sm">{dislikes}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
  return createPortal(modalContent, document.body)
}

export default DesignModal
