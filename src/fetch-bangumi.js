const axios = require('axios')
const {
  throughTransformers,
  patchEmptyCnNameTransformer,
  replaceCustomNameTransformer,
  injectIndexTransformer,
} = require('./transformers')

/**
 * @typedef Options
 * @type {Object}
 * @property {string} username - Bangumi username or uid.
 * @property {number} [limit] -  Fetch list item limit.
 * @property {string} [user_agent] - User agent for Bangumi api.
 * @property {Object.<string,string|number|boolean>} [headers] - Http headers.
 * @property {string} [config] - readme-anime-list config name.
 */

/**
 * @function
 * @param {(string|Options)} options
 * @returns {Promise}
 */
module.exports = function (options) {
  const base = 'https://api.bgm.tv'

  let url
  let user_agent
  let headers = {}
  let config
  if (typeof options === 'object') {
    url = `${base}/v0/users/${options.username}/collections?type=3&limit=${options.limit}`
    user_agent = options.user_agent
    headers = options.headers || {}
    config = options.config
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
        ...headers,
      },
      ...(options || {}),
    })
      .then(res => {
        /** @type {import('./types').Data} */
        const data = res.data
        resolve(throughTransformers(data, { config }, [
          injectIndexTransformer,
          patchEmptyCnNameTransformer,
          replaceCustomNameTransformer,
        ]))
      })
      .catch(err => {
        reject(err)
      })
  })
}
