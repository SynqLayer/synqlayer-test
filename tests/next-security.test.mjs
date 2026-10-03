import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'

const require = createRequire(import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'))

const nextVersion = manifest.dependencies.next
const configVersion = manifest.devDependencies['eslint-config-next']

function securityPatchOrLater(version) {
  const [major, minor, patch] = version.split('.').map(Number)
  return major === 16 && (minor > 3 || (minor === 3 && patch >= 8))
}

test('Next and ESLint config are aligned on the supported patched major', () => {
  assert.ok(securityPatchOrLater(nextVersion))
  assert.equal(configVersion, nextVersion)
  assert.equal(lock.packages[''].dependencies.next, nextVersion)
  assert.equal(lock.packages[''].devDependencies['eslint-config-next'], nextVersion)
  assert.equal(lock.packages['node_modules/next'].version, nextVersion)
  assert.equal(lock.packages['node_modules/eslint-config-next'].version, nextVersion)
})

test('image remote host allowlist remains explicit', () => {
  const config = require('../next.config.js')
  assert.deepEqual(config.images.remotePatterns.map((pattern) => pattern.hostname), ['github.com', 'vercel.com'])
})
