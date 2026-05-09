import { ref, computed, onMounted } from 'vue'
import { fetchArticles, fetchCategories } from '@/services/blogApi'
import type { BlogArticle, BlogCategory } from '@/services/blogApi'

export type { BlogArticle, BlogCategory } from '@/services/blogApi'
export { tagClassMap, tagNameMap } from '@/services/blogApi'

function calculateReadTime(content: string): number {
  if (!content) return 3
  let text = content
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/`[^`]+`/g, '')
  text = text.replace(/[#*|>\-_=\[\]!`]/g, '')
  text = text.replace(/\s+/g, '')
  const charCount = text.length
  return Math.max(3, Math.ceil((charCount / 1000) * 3))
}

export function useBlogData() {
  const articles = ref<BlogArticle[]>([])
  const categories = ref<BlogCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const selectedCategory = ref<string>('all')
  const currentPage = ref<number>(1)
  const pageSize = 12

  async function loadData() {
    loading.value = true
    error.value = null
    try {
      const [articleList, categoryList] = await Promise.all([fetchArticles(), fetchCategories()])
      articles.value = articleList.map((article) => ({
        ...article,
        readTime: article.readTime ?? calculateReadTime(article.content || article.excerpt || ''),
      }))
      categories.value = categoryList
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load blog data'
    } finally {
      loading.value = false
    }
  }

  onMounted(loadData)

  const filteredArticles = computed(() => {
    if (selectedCategory.value === 'all') return articles.value
    return articles.value.filter((article) => article.category === selectedCategory.value)
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredArticles.value.length / pageSize)),
  )

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return filteredArticles.value.slice(start, start + pageSize)
  })

  function getCategoryName(categoryId: string): string {
    const category = categories.value.find((c) => c.id === categoryId)
    return category?.name || ''
  }

  function getCategoryDesc(categoryId: string): string {
    const category = categories.value.find((c) => c.id === categoryId)
    return category?.desc || ''
  }

  function getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') return articles.value.length
    return articles.value.filter((a) => a.category === categoryId).length
  }

  function changeCategory(categoryId: string): void {
    selectedCategory.value = categoryId
    currentPage.value = 1
  }

  function changePage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y} 年 ${m} 月 ${day} 日`
  }

  function getArticleById(id: number): BlogArticle | undefined {
    return articles.value.find((a) => a.id === id)
  }

  function getRelatedArticles(id: number, limit = 3): BlogArticle[] {
    const current = articles.value.find((a) => a.id === id)
    if (!current) return []
    return articles.value
      .filter((a) => a.id !== id && a.category === current.category)
      .slice(0, limit)
  }

  return {
    articles,
    categories,
    loading,
    error,
    loadData,
    currentPage,
    selectedCategory,
    filteredArticles,
    paginatedArticles,
    totalPages,
    totalArticles: computed(() => filteredArticles.value.length),
    changeCategory,
    changePage,
    getCategoryName,
    getCategoryDesc,
    getCategoryCount,
    formatDate,
    getArticleById,
    getRelatedArticles,
  }
}
