const core = require('@actions/core')
const template = require('./template')
const fetchBangumi = require('./fetch-bangumi')

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
    template(targetPath, templatePath, data)
  }).catch(err => {
    throw err
  })
} catch (error) {
  core.setFailed(error.message)
}
