const fs = require('fs')
const path = require('path')

module.exports.throughTransformers = function (data, transformers) {
  return transformers.reduce((curData, transform) => transform(curData), data)
}

module.exports.patchEmptyCnNameTransformer = function (data) {
  if (data.data) {
    data.data = data.data.map(anime => {
      if (anime.subject.name && !anime.subject.name_cn) {
        anime.subject.name_cn = anime.subject.name
      }
      return anime
    })
  }

  return data
}

module.exports.replaceCustomNameTransformer = function (data) {
  const configPath = path.join(process.cwd(), 'readme-anime-list.config.json')

  if (fs.existsSync(configPath) && data.data) {
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
