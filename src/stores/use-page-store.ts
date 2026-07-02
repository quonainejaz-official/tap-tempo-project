import { create } from "zustand"

interface PageItem {
  _id: string
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
  allowHtml?: boolean
}

interface PageStore {
  items: PageItem[]
  loading: boolean
  error: string | null
  fetched: boolean
  fetch: () => Promise<void>
  refresh: () => Promise<void>
}

export const usePageStore = create<PageStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  fetched: false,

  fetch: async () => {
    if (get().fetched) return
    set({ loading: true, error: null })
    try {
      const res = await fetch("/api/pages")
      const data = await res.json()
      set({ items: data.pages || data || [], loading: false, fetched: true })
    } catch {
      set({ error: "Failed to load pages", loading: false })
    }
  },

  refresh: async () => {
    set({ loading: true, error: null, fetched: false })
    try {
      const res = await fetch("/api/pages")
      const data = await res.json()
      set({ items: data.pages || data || [], loading: false, fetched: true })
    } catch {
      set({ error: "Failed to load pages", loading: false })
    }
  },
}))
