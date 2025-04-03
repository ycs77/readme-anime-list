import { fetchBangumi } from '../src/fetch-bangumi'
import { insertTemplate } from '../src/template'

fetchBangumi({
  username: '715333',
  limit: 10,
  user_agent: 'ycs77/ycs77 README',
  config: 'example/config.json',
}).then(data => {
  insertTemplate(
    'example/README.md',
    'example/template/anime-list.md',
    data
  )
})
