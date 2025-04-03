import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Eta } from 'eta'

export function renderTemplate(target: string, template: string, data: Record<string, any>): void {
  const targetPath = resolve(process.cwd(), target)
  const templatePath = resolve(process.cwd(), template)
  const templateContent = readFileSync(templatePath, 'utf-8')

  const eta = new Eta()
  const result = eta.renderString(templateContent, data)

  writeFileSync(targetPath, result)
}

export function insertTemplate(target: string, template: string, data: Record<string, any>): void {
  const targetPath = resolve(process.cwd(), target)
  let targetContent = readFileSync(targetPath, 'utf-8')

  const templatePath = resolve(process.cwd(), template)
  const templateContent = readFileSync(templatePath, 'utf-8')

  const eta = new Eta()
  const result = eta.renderString(templateContent, data).trim()

  targetContent = targetContent.replace(/(<!-- anime-list start -->)(?:.|\n)*(<!-- anime-list end -->)/, `$1\n${result}\n$2`)

  writeFileSync(targetPath, targetContent)
}
