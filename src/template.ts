import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Eta } from 'eta'

export function renderTemplate(target: string, template: string, data: Record<string, any>) {
  const targetPath = resolve(process.cwd(), target)
  const templatePath = resolve(process.cwd(), template)
  const templateContent = readFileSync(templatePath, 'utf-8')

  const eta = new Eta()
  const result = eta.renderString(templateContent, data)

  writeFileSync(targetPath, result)
}
