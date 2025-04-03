import { getInput, setFailed } from '@actions/core'
import { fetchBangumi } from './fetch-bangumi'
import { renderTemplate } from './template'

try {
  const bangumi_username = getInput('bangumi_username')
  const bangumi_limit = parseInt(getInput('bangumi_limit'))
  const user_agent = getInput('user_agent')
  const targetPath = getInput('target')
  const templatePath = getInput('template')

  fetchBangumi({
    username: bangumi_username,
    limit: bangumi_limit,
    user_agent,
  }).then(data => {
    renderTemplate(targetPath, templatePath, data)
  }).catch(error => {
    throw error
  })
} catch (error) {
  setFailed(error.message)
}
