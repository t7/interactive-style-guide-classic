module.exports = function patternify (path) {
  var glob = require('glob')
  var fs = require('fs-extra')
  var hljs = require('highlight.js')

  var titleRegEx = /<title[^>]*>((.|[\n\r])*)<\/title>/im
  var bodyRegEx = /<body[^>]*>((.|[\n\r])*)<\/body>/im
  var descriptionRegEx = /<meta[^>]+content="([^")]*)"/im

  return glob.sync(path).map(function (path) {
    var item
    var id = path.replace(/\./g, '_').replace(/\//g, '_').replace(/__/g, '')
    if (fs.lstatSync(path).isDirectory()) {
      var folderName = path.split('/').pop()
      item = {
        id: id,
        isFolder: true,
        path: path,
        folderName: folderName,
        name: folderName.replace(/_/g, ' '),
        contents: patternify(path + '/*')
      }
    } else {
      var file = fs.readFileSync(path, 'utf8')
      var html = bodyRegEx.exec(file)[1].replace(/(?:\.\.\/)+/gi, '')
      var title = titleRegEx.exec(file)[1]
      var description = descriptionRegEx.exec(file) ? descriptionRegEx.exec(file)[1] : ''
      var markup = html.replace(/^\s*\n/gm, '')
      var fileName = path.split('/').pop()
      var name = fileName.split('.')
      name.pop()
      name = name.join('')
      name = name.replace(/_/g, ' ')
      item = {
        id: id,
        isFile: true,
        path: path,
        fileName: fileName,
        name: name,
        url: path.replace('./dist/', ''),
        title: title,
        description: description,
        html: html,
        markup: hljs.highlight('html', markup).value,
        root: '../'.repeat(path.split('/').length - 2)
      }
    }

    return item
  })
}
