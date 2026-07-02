import { create } from "zustand"

interface BlogItem {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  author?: string
  createdAt?: string
  readTime?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
}

interface BlogStore {
  items: BlogItem[]
  loading: boolean
  error: string | null
  fetched: boolean
  fetch: () => Promise<void>
  refresh: () => Promise<void>
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  fetched: false,

  fetch: async () => {
    if (get().fetched) return
    set({ loading: true, error: null })
    try {
      const res = await fetch("/api/blogs")
      const data = await res.json()
      set({ items: data.blogs || data || [], loading: false, fetched: true })
    } catch {
      set({ error: "Failed to load blogs", loading: false })
    }
  },

  refresh: async () => {
    set({ loading: true, error: null, fetched: false })
    try {
      const res = await fetch("/api/blogs")
      const data = await res.json()
      set({ items: data.blogs || data || [], loading: false, fetched: true })
    } catch {
      set({ error: "Failed to load blogs", loading: false })
    }
  },
}))
