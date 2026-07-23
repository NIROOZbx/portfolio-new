import { supabase } from './supabaseClient'
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

export async function voteDesign(
  designId: string,
  type: 'like' | 'dislike',
  action: 'add' | 'remove' = 'add'
): Promise<void> {
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
