export interface Page {
  _id?: string
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}
