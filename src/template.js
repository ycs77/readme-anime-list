const fs = require('fs')
const path = require('path')
const { Eta } = require('eta')

/**
 * @function
 * @param {string} target
 * @param {string} template
 * @param {Object.<string,*>} data
 */
module.exports = function (target, template, data) {
  const targetPath = path.resolve(process.cwd(), target)
  const templatePath = path.resolve(process.cwd(), template)
  const templateContent = fs.readFileSync(templatePath, { encoding: 'utf-8' })

  const eta = new Eta()
  const result = eta.renderString(templateContent, data)

  fs.writeFileSync(targetPath, result)
}
