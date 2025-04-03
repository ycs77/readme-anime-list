import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import {
  throughTransformers,
  patchEmptyCnNameTransformer,
  replaceCustomNameTransformer,
  injectIndexTransformer,
} from './transformers'
import type { TransformerOptions } from './transformers'
import type { Data } from './types'

export interface FetchBangumiOptions extends AxiosRequestConfig {
  username: string
  limit?: number
  user_agent?: string
  config?: string
}

export function fetchBangumi(options: string | FetchBangumiOptions): Promise<Data> {
  const base = 'https://api.bgm.tv'

  let url
  let userAgent: string | undefined
  let axiosOptions: AxiosRequestConfig = {}
  const transformerOptions: TransformerOptions = {}

  if (typeof options === 'object') {
    const { username, limit, user_agent, config: configPath, ..._axiosOptions } = options

    url = `${base}/v0/users/${options.username}/collections?type=3&limit=${options.limit}`
    userAgent = options.user_agent
    transformerOptions.config = configPath
    axiosOptions = _axiosOptions
  } else {
    url = `${base}${options}`
    userAgent = 'ycs77/readme-anime-list'
  }

  return new Promise((resolve, reject) => {
    axios(url, {
      method: 'GET',
      ...axiosOptions,
      headers: {
        'Accept': 'application/json',
        'User-Agent': userAgent,
        ...axiosOptions.headers,
      },
    }).then(res => {
      let data: Data = res.data

      data = throughTransformers(data, transformerOptions, [
        injectIndexTransformer,
        patchEmptyCnNameTransformer,
        replaceCustomNameTransformer,
      ])

      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
