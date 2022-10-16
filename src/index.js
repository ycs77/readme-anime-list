const core = require('@actions/core')
const fetchBangumi = require('./fetch-bangumi')
const renderTemplate = require('./template')

try {
  const bangumi_username = core.getInput('bangumi_username')
  const bangumi_limit = parseInt(core.getInput('bangumi_limit'))
  const user_agent = core.getInput('user_agent')
  const targetPath = core.getInput('target')
  const templatePath = core.getInput('template')

  fetchBangumi({
    username: bangumi_username,
    limit: bangumi_limit,
    user_agent,
  }).then(data => {
    renderTemplate(targetPath, templatePath, data)
  }).catch(err => {
    throw err
  })
} catch (error) {
  core.setFailed(error.message)
}
