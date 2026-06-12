export interface Blog {
  _id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  coverImagePublicId?: string
  metaTitle?: string
  metaDescription?: string
  author: string
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}
