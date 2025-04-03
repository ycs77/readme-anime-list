import { fetchBangumi } from '../src/fetch-bangumi'
import { renderTemplate } from '../src/template'

fetchBangumi({
  username: '715333',
  limit: 10,
  user_agent: 'ycs77/ycs77 README',
  config: 'example/config.json',
}).then(data => {
  renderTemplate(
    'example/README.md',
    'example/template/README-eta.md',
    data
  )
})
