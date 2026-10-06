import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(process.argv[2] || fileURLToPath(new URL('..', import.meta.url)))
try {
  const manifest = JSON.parse(readFileSync(resolve(root, 'originals/manifest.json'), 'utf8'))
  if (!Array.isArray(manifest.files) || !manifest.files.length) throw new Error('Empty manifest')
  for (const entry of manifest.files) {
    const target = resolve(root, entry.path)
    const rel = relative(root, target)
    if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Manifest path escapes project')
    const bytes = readFileSync(target)
    const hash = createHash('sha256').update(bytes).digest('hex')
    if (bytes.length !== entry.bytes || hash !== entry.sha256) {
      throw new Error(`Original changed: ${entry.path}`)
    }
  }
  console.log(`Verified ${manifest.files.length} original files (SHA-256 + byte size).`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
