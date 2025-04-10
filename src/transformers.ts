import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Data, UserConfig } from './types'

export interface TransformerOptions {
  config: string
}

export function throughTransformers(
  data: Data,
  options: TransformerOptions,
  transformers: ((data: Data, options: TransformerOptions) => Data)[]
): Data {
  return transformers.reduce((curData, transform) => transform(curData, options), data)
}

export function patchEmptyCnNameTransformer(data: Data): Data {
  if (Array.isArray(data.data)) {
    data.data = data.data.map(anime => {
      if (anime.subject.name && !anime.subject.name_cn) {
        anime.subject.name_cn = anime.subject.name
      }
      return anime
    })
  }

  return data
}

export function replaceCustomNameTransformer(data: Data, options: TransformerOptions): Data {
  const configPath = join(process.cwd(), options.config)

  if (existsSync(configPath) && Array.isArray(data.data)) {
    const config: UserConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

    data.data = data.data.map(anime => {
      if (anime.subject.name_cn) {
        for (const originalText of Object.keys(config.replace)) {
          const replaceText = config.replace[originalText]

          if (anime.subject.name_cn.indexOf(originalText) !== -1) {
            anime.subject.name_cn = anime.subject.name_cn.replace(originalText, replaceText)
            break
          }
        }
      }

      return anime
    })
  }

  return data
}

export function injectIndexTransformer(data: Data): Data {
  if (Array.isArray(data.data)) {
    data.data = data.data.map((anime, index) => {
      anime.index = index + 1
      return anime
    })
  }

  return data
}
