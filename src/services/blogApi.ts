export interface BlogArticle {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
  author: string
  authorInitial: string
  cover: string
  readTime?: number
  content?: string
  coverImage?: string
}

export interface BlogCategory {
  id: string
  name: string
  icon: string
  desc: string
}

export interface BlogMeta {
  tagClassMap: Record<string, string>
  tagNameMap: Record<string, string>
  coverImageMap: Record<string, string>
  categories: BlogCategory[]
}

let metaCache: BlogMeta | null = null

export const tagClassMap: Record<string, string> = {
  tech: 'tag-tech',
  case: 'tag-case',
  deep: 'tag-deep',
  oss: 'tag-oss',
}

export const tagNameMap: Record<string, string> = {
  tech: '技术进展',
  case: '实践案例',
  deep: '深度解析',
  oss: '开源社区',
}

async function fetchMeta(): Promise<BlogMeta> {
  if (metaCache) return metaCache
  const res = await fetch('/blog-media/meta.json')
  if (!res.ok) throw new Error(`Failed to load blog meta: ${res.status}`)
  metaCache = (await res.json()) as BlogMeta
  return metaCache
}

export async function fetchArticles(): Promise<BlogArticle[]> {
  const res = await fetch('/blog-list.json')
  if (!res.ok) throw new Error(`Failed to load blog list: ${res.status}`)
  return res.json()
}

export async function fetchArticleById(id: number): Promise<BlogArticle | null> {
  try {
    const res = await fetch(`/blog-articles/${id}.json`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function fetchCategories(): Promise<BlogCategory[]> {
  const meta = await fetchMeta()
  return meta.categories
}

export async function getCoverImageUrl(cover: string): Promise<string> {
  const meta = await fetchMeta()
  return meta.coverImageMap[cover] || ''
}
