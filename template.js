const fs = require('fs')
const path = require('path')
const tpl = require('node-tpl')

module.exports = function (target, template, data) {
  tpl.setcwd(process.cwd())

  for (const key of Object.keys(data)) {
    tpl.assign(key, data[key])
  }

  const result = tpl.fetch(template)
  fs.writeFileSync(path.resolve(process.cwd(), target), result)
}
