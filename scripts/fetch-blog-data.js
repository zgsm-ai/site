import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import matter from 'gray-matter'

const CONTENT_REPO_URL =
  process.env.BLOG_CONTENT_REPO_URL || 'https://github.com/xiaojingming/costrict-blog-content.git'
const CONTENT_DIR = path.resolve('scripts', '.blog-content-cache')
const PUBLIC_DIR = path.resolve('public')
const ARTICLES_SRC = path.join(CONTENT_DIR, 'articles')
const MEDIA_SRC = path.join(CONTENT_DIR, 'media')
const META_SRC = path.join(CONTENT_DIR, 'meta.json')
const ARTICLES_OUT_DIR = path.join(PUBLIC_DIR, 'blog-articles')
const MEDIA_OUT_DIR = path.join(PUBLIC_DIR, 'blog-media')
const LIST_OUT = path.join(PUBLIC_DIR, 'blog-list.json')

function log(msg) {
  console.log(`[blog-data] ${msg}`)
}

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { stdio: 'pipe', ...opts })
      .toString()
      .trim()
  } catch (err) {
    if (opts.ignoreError) return ''
    throw err
  }
}

function syncContentRepo() {
  // If the content repo is a local path (not a URL), use it directly
  if (!CONTENT_REPO_URL.startsWith('http')) {
    if (fs.existsSync(path.join(CONTENT_REPO_URL, '.git'))) {
      log(`Using local content repo at ${CONTENT_REPO_URL}`)
      fs.mkdirSync(CONTENT_DIR, { recursive: true })
      // Copy only content directories, not .git internals
      const contentSubs = ['articles', 'media']
      for (const sub of contentSubs) {
        const src = path.join(CONTENT_REPO_URL, sub)
        if (fs.existsSync(src)) {
          copyDir(src, path.join(CONTENT_DIR, sub))
        }
      }
      // Copy meta.json
      const metaSrc = path.join(CONTENT_REPO_URL, 'meta.json')
      if (fs.existsSync(metaSrc)) {
        fs.copyFileSync(metaSrc, path.join(CONTENT_DIR, 'meta.json'))
      }
      return
    }
    throw new Error(`Local content repo not found at ${CONTENT_REPO_URL}`)
  }

  if (fs.existsSync(path.join(CONTENT_DIR, '.git'))) {
    log('Pulling latest content...')
    run('git pull origin main', { cwd: CONTENT_DIR })
  } else {
    log('Cloning content repo...')
    fs.mkdirSync(path.dirname(CONTENT_DIR), { recursive: true })
    run(`git clone --depth 1 "${CONTENT_REPO_URL}" "${CONTENT_DIR}"`)
  }
}

function loadMeta() {
  if (!fs.existsSync(META_SRC)) {
    throw new Error(`meta.json not found at ${META_SRC}`)
  }
  return JSON.parse(fs.readFileSync(META_SRC, 'utf-8'))
}

function parseArticles() {
  const files = fs.readdirSync(ARTICLES_SRC).filter((f) => f.endsWith('.md'))
  const articles = []

  for (const file of files) {
    const filePath = path.join(ARTICLES_SRC, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const processedContent = content.replace(
      /\.\.\/media\/(images|videos|covers)\/(.+)/g,
      '/blog-media/$1/$2',
    )

    articles.push({ ...data, content: processedContent })
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return articles
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function outputFiles(articles, meta) {
  fs.mkdirSync(ARTICLES_OUT_DIR, { recursive: true })
  fs.mkdirSync(MEDIA_OUT_DIR, { recursive: true })

  // blog-list.json — metadata only, no content
  const listData = articles.map((article) => {
    const rest = { ...article }
    delete rest.content
    return {
      ...rest,
      coverImage: meta.coverImageMap[rest.cover] || '',
    }
  })
  fs.writeFileSync(LIST_OUT, JSON.stringify(listData, null, 2))
  log(`Written ${LIST_OUT} (${listData.length} articles)`)

  // Per-article JSON with content
  for (const article of articles) {
    const outPath = path.join(ARTICLES_OUT_DIR, `${article.id}.json`)
    fs.writeFileSync(
      outPath,
      JSON.stringify(
        {
          ...article,
          coverImage: meta.coverImageMap[article.cover] || '',
        },
        null,
        2,
      ),
    )
  }
  log(`Written ${articles.length} article files to ${ARTICLES_OUT_DIR}`)

  // Copy meta.json for runtime
  fs.writeFileSync(path.join(MEDIA_OUT_DIR, 'meta.json'), JSON.stringify(meta, null, 2))

  // Copy media files
  if (fs.existsSync(MEDIA_SRC)) {
    copyDir(MEDIA_SRC, MEDIA_OUT_DIR)
    log(`Copied media files to ${MEDIA_OUT_DIR}`)
  }
}

function main() {
  try {
    log('Starting blog data fetch...')

    let contentAvailable = true
    try {
      syncContentRepo()
    } catch (err) {
      log(`Content repo unavailable: ${err.message}`)
      contentAvailable = false
      if (!fs.existsSync(LIST_OUT)) {
        throw new Error(
          'Content repo unavailable and no cached data found. ' +
            'Ensure the blog content repo is accessible or set BLOG_CONTENT_REPO_URL env var.',
        )
      }
      log('Using cached data from previous fetch.')
      return
    }

    if (contentAvailable) {
      const meta = loadMeta()
      const articles = parseArticles()
      outputFiles(articles, meta)
      log('Blog data fetch complete!')
    }
  } catch (err) {
    console.error(`[blog-data] ERROR: ${err.message}`)
    process.exit(1)
  }
}

main()
