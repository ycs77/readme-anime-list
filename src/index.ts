import { getInput, setFailed } from '@actions/core'
import { fetchBangumi } from './fetch-bangumi'
import { renderTemplate, insertTemplate } from './template'

try {
  const targetPath = getInput('target')
  const templatePath = getInput('template')
  const render_mode = getInput('render_mode') as 'default' | 'insert'
  const bangumi_username = getInput('bangumi_username')
  const bangumi_limit = parseInt(getInput('bangumi_limit'))
  const user_agent = getInput('user_agent')

  fetchBangumi({
    username: bangumi_username,
    limit: bangumi_limit,
    user_agent,
  }).then(data => {
    if (render_mode === 'insert') {
      insertTemplate(targetPath, templatePath, data)
    } else {
      renderTemplate(targetPath, templatePath, data)
    }
  }).catch(error => {
    throw error
  })
} catch (error) {
  setFailed(error.message)
}
