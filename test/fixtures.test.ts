import { join, resolve } from 'path'
import type { ConfigItem, OptionsConfig } from 'src/types'
import { beforeAll, it } from 'vitest'
import fs from 'fs-extra'
import { execa } from 'execa'
import fg from 'fast-glob'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('all', {
  typescript: true,
})

function runWithConfig(name: string, configs: OptionsConfig, ...items: ConfigItem[]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    await fs.copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })

    await fs.writeFile(join(target, 'eslint.config.js'), `
      import Zeus from '../../dist/index.js'

      export default Zeus(${JSON.stringify(configs)},${(items ?? []).map(v => JSON.stringify(v)).join(',')})
    `)

    await execa('npx', ['eslint', '.', '--fix'], { cwd: target, stdio: 'pipe' })

    const files = await fg('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      let content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      if (content === source)
        content = '// unchanged\n'

      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, 30_000)
}
