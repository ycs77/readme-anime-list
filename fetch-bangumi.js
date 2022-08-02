const axios = require('axios').default
const {
  throughTransformers,
  patchEmptyCnNameTransformer,
  replaceCustomNameTransformer,
} = require('./transformers')

module.exports = function (options) {
  const base = 'https://api.bgm.tv'

  let url
  let user_agent
  if (typeof options === 'object') {
    url = `${base}/v0/users/${options.username}/collections?type=3&limit=${options.limit}`
    user_agent = options.user_agent
  } else {
    url = `${base}${options}`
    user_agent = 'ycs77/readme-anime-list'
  }

  return new Promise((resolve, reject) => {
    axios(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': user_agent,
        ...options.headers,
      },
      ...options,
    })
      .then(res => {
        resolve(throughTransformers(res.data, [
          patchEmptyCnNameTransformer,
          replaceCustomNameTransformer,
        ]))
      })
      .catch(err => {
        reject(err)
      })
  })
}
