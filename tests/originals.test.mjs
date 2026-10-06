import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const verifier = fileURLToPath(new URL('../scripts/verify-originals.mjs', import.meta.url))
test('original integrity verification succeeds only for matching bytes', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-originals-test-'))
  try {
    mkdirSync(join(root, 'originals'))
    const file = join(root, 'originals', 'document.md')
    writeFileSync(file, 'unchanged source')
    writeFileSync(join(root, 'originals', 'manifest.json'), JSON.stringify({ files: [{
      path: 'originals/document.md', bytes: 16,
      sha256: createHash('sha256').update('unchanged source').digest('hex'),
    }] }))
    assert.equal(spawnSync(process.execPath, [verifier, root]).status, 0)
    writeFileSync(file, 'changed source')
    assert.equal(spawnSync(process.execPath, [verifier, root]).status, 1)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
