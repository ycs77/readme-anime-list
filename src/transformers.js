const fs = require('fs')
const path = require('path')

/**
 * @typedef {{ config?: string }} Options
 * @typedef {import('./types').Data} Data
 */

/**
 * @function
 * @param {Data} data
 * @param {Options} options
 * @param {((data: Data, options: Options) => Data)[]} transformers
 * @returns {Data}
 */
module.exports.throughTransformers = function (data, options, transformers) {
  return transformers.reduce((curData, transform) => transform(curData, options), data)
}

/**
 * @function
 * @param {Data} data
 * @returns {Data}
 */
module.exports.patchEmptyCnNameTransformer = function (data) {
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

/**
 * @function
 * @param {Data} data
 * @param {Options} options
 * @returns {Data}
 */
module.exports.replaceCustomNameTransformer = function (data, options) {
  const configFilename = options.config ? options.config : 'readme-anime-list.config.json'
  const configPath = path.join(process.cwd(), configFilename)

  if (fs.existsSync(configPath) && Array.isArray(data.data)) {
    /** @type {import('./types').Config} */
    const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }))

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

/**
 * @function
 * @param {Data} data
 * @returns {Data}
 */
module.exports.injectIndexTransformer = function (data) {
  if (Array.isArray(data.data)) {
    data.data = data.data.map((anime, index) => {
      anime.index = index + 1
      return anime
    })
  }

  return data
}
