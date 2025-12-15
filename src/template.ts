import fs from 'node:fs'
import path from 'node:path'
import { Eta } from 'eta'

export function renderTemplate(target: string, template: string, data: Record<string, any>): void {
  const targetPath = path.resolve(process.cwd(), target)
  const templatePath = path.resolve(process.cwd(), template)
  const templateContent = fs.readFileSync(templatePath, 'utf-8')

  const eta = new Eta()
  const result = eta.renderString(templateContent, data)

  fs.writeFileSync(targetPath, result)
}

export function insertTemplate(target: string, template: string, data: Record<string, any>): void {
  const targetPath = path.resolve(process.cwd(), target)
  let targetContent = fs.readFileSync(targetPath, 'utf-8')

  const templatePath = path.resolve(process.cwd(), template)
  const templateContent = fs.readFileSync(templatePath, 'utf-8')

  const eta = new Eta()
  const result = eta.renderString(templateContent, data).trim()

  targetContent = targetContent.replace(/(<!-- anime-list start -->)(?:.|\n)*(<!-- anime-list end -->)/, `$1\n${result}\n$2`)

  fs.writeFileSync(targetPath, targetContent)
}
