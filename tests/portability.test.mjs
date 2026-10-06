import assert from 'node:assert/strict'
import { test } from 'node:test'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('../auto-commit.ps1', import.meta.url))
test('maintenance helper resolves its repository from its own location', () => {
  assert.match(readFileSync(script, 'utf8'), /\$repoPath\s*=\s*\$PSScriptRoot/)
  assert.doesNotMatch(readFileSync(script, 'utf8'), /[A-Z]:[\\/]/i)
})
