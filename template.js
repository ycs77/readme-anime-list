const fs = require('fs')
const path = require('path')
const Eta = require('eta')

module.exports = function (target, template, data) {
  const templateContent = fs.readFileSync(path.resolve(process.cwd(), template), { encoding: 'utf-8' })
  const result = Eta.render(templateContent, data)
  fs.writeFileSync(path.resolve(process.cwd(), target), result)
}
