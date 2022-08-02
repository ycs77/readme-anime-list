const template = require('../template')
const fetch = require('../fetch-bangumi')

fetch({
  username: '715333',
  limit: 10,
  user_agent: 'ycs77/ycs77 README',
  config: 'example/config.json',
}).then(data => {
  template('example/README.md', 'example/template/README-eta.md', data)
})
