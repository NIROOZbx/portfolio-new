import { supabase } from './supabaseClient'
import { getOrCreateVisitorId } from './visitorStats'
import type { DesignFolder, DesignItem } from '../types/designs'

export async function fetchFolders(): Promise<DesignFolder[]> {
  const { data, error } = await supabase
    .from('design_folders')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data || []
}

export async function fetchDesigns(folderId: string): Promise<DesignItem[]> {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('folder_id', folderId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function fetchUserVote(designId: string): Promise<'like' | 'dislike' | null> {
  try {
    const visitorId = getOrCreateVisitorId()
    const { data, error } = await supabase
      .from('design_votes')
      .select('vote_type')
      .eq('design_id', designId)
      .eq('visitor_id', visitorId)
      .maybeSingle()

    if (!error && data && data.vote_type) {
      return data.vote_type as 'like' | 'dislike'
    }
  } catch {
    // Fallback if table doesn't exist yet
  }

  const localVote = localStorage.getItem(`voted_${designId}`)
  return (localVote === 'like' || localVote === 'dislike') ? localVote : null
}

export async function voteDesign(
  designId: string,
  type: 'like' | 'dislike',
  action: 'add' | 'remove' = 'add'
): Promise<void> {
  const visitorId = getOrCreateVisitorId()

  // 1. Try atomic Supabase RPC with visitor_id (if user has run the SQL script)
  const { error: rpcErr } = await supabase.rpc('vote_on_design', {
    p_design_id: designId,
    p_visitor_id: visitorId,
    p_vote_type: type,
    p_action: action
  })

  // 2. If RPC succeeded, we are done
  if (!rpcErr) {
    return
  }

  // 3. Fallback client update if SQL migration hasn't been executed yet
  const { data, error: fetchErr } = await supabase
    .from('designs')
    .select('likes_count, dislikes_count')
    .eq('id', designId)
    .single()

  if (!fetchErr && data) {
    const change = action === 'add' ? 1 : -1
    await supabase
      .from('designs')
      .update({
        likes_count: type === 'like' ? Math.max(0, data.likes_count + change) : data.likes_count,
        dislikes_count: type === 'dislike' ? Math.max(0, data.dislikes_count + change) : data.dislikes_count
      })
      .eq('id', designId)
  }
}

