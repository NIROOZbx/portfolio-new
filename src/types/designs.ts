export interface DesignFolder {
  id: string
  title: string
  description?: string
  display_order: number
}

export interface DesignItem {
  id: string
  folder_id: string
  title: string
  image_url: string
  likes_count: number
  dislikes_count: number
}
