const XLSX = require('xlsx')

module.exports = {
  process: (src, filename) => {
    const content = XLSX.readFile(filename)
    return `module.exports = ${JSON.stringify(content)}`
  }
}
