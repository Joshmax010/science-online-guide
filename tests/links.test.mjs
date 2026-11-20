import assert from 'node:assert/strict'
import { test } from 'node:test'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 链接与图片自动检查：扫 README 与 docs/ 全部 Markdown，
// 保证相对链接、图片引用都指向真实存在的文件，
// 且 README 与第四章的机场推荐表保持一致。
// 外部网址（http/https）不在这里查：离线测试不访问网络，
// 外链可用性靠人工与线上核查。

const root = fileURLToPath(new URL('..', import.meta.url))
const docsDir = join(root, 'docs')

const markdownFiles = [
  join(root, 'README.md'),
  ...readdirSync(docsDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => join(docsDir, name)),
]

const isExternal = (target) => /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//')

function decode(target) {
  try {
    return decodeURIComponent(target)
  } catch {
    return target
  }
}

// 去掉 #锚点与 ?查询后的纯路径
function pathPart(target) {
  return decode(target.split('#')[0].split('?')[0])
}

function markdownTargets(text) {
  const out = []
  for (const m of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) out.push(m[1])
  return out
}

function htmlTargets(text) {
  const out = []
  for (const m of text.matchAll(/(?:href|src)="([^"]+)"/g)) out.push(m[1])
  return out
}

test('relative markdown links and images resolve to existing files', () => {
  const problems = []
  for (const file of markdownFiles) {
    const text = readFileSync(file, 'utf8')
    const rel = file.slice(root.length)
    for (const target of markdownTargets(text)) {
      if (isExternal(target) || target.startsWith('#')) continue
      if (target.startsWith('/')) {
        problems.push(`${rel}: 根绝对路径不允许出现在正文链接里：${target}`)
        continue
      }
      const p = pathPart(target)
      if (!p) continue
      if (p.endsWith('.html')) {
        problems.push(`${rel}: 章节互链应使用 .md 后缀，不要用 .html：${target}`)
        continue
      }
      const resolved = join(dirname(file), p)
      if (!existsSync(resolved)) problems.push(`${rel}: 链接目标不存在：${target}`)
    }
    // 正文里手写的 HTML 链接/脚本：./x.html 对应同目录 x.md；/x 对应 docs/public/x
    for (const target of htmlTargets(text)) {
      if (isExternal(target) || target.startsWith('#')) continue
      const p = pathPart(target)
      if (!p) continue
      if (p.startsWith('/')) {
        if (!existsSync(join(docsDir, 'public', p))) {
          problems.push(`${rel}: 站点静态文件不存在：${target}（应放在 docs/public/）`)
        }
        continue
      }
      const asSource = p.endsWith('.html') ? `${p.slice(0, -'.html'.length)}.md` : p
      const resolved = join(dirname(file), asSource)
      if (!existsSync(resolved)) problems.push(`${rel}: HTML 链接目标不存在：${target}`)
    }
  }
  assert.deepEqual(problems, [])
})

test('every image in docs/images is referenced by a chapter', () => {
  const referenced = new Set()
  for (const file of markdownFiles) {
    if (!file.startsWith(docsDir)) continue
    for (const target of markdownTargets(readFileSync(file, 'utf8'))) {
      const p = pathPart(target)
      if (p.startsWith('./images/')) referenced.add(p.slice('./images/'.length))
    }
  }
  const orphans = readdirSync(join(docsDir, 'images')).filter(
    (name) => statSync(join(docsDir, 'images', name)).isFile() && !referenced.has(name),
  )
  assert.deepEqual(orphans, [])
})

function airportRows(file) {
  return readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('|') && line.includes('register'))
    .map((line) => line.trim().replace(/\s+/g, ' '))
}

test('airport table in README matches chapter 04', () => {
  const fromReadme = airportRows(join(root, 'README.md'))
  const fromChapter = airportRows(join(docsDir, '04-airports.md'))
  assert.ok(fromReadme.length > 0, 'README 里没有扫到机场推荐行，检查规则可能失效')
  assert.ok(fromChapter.length > 0, '第四章里没有扫到机场推荐行，检查规则可能失效')
  assert.deepEqual(fromReadme, fromChapter)
})

test('homepage comments anchor has a target in the theme', () => {
  const index = readFileSync(join(docsDir, 'index.md'), 'utf8')
  assert.ok(index.includes('#comments'), '首页评论按钮应指向 #comments')
  const theme = readFileSync(join(docsDir, '.vitepress', 'theme', 'index.ts'), 'utf8')
  assert.match(theme, /id:\s*'comments'/, '主题的评论容器需要 id=comments，首页按钮才能定位到评论区')
})
