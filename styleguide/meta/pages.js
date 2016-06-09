module.exports = function pageify (path) {
  var glob = require('glob')
  var fs = require('fs-extra')

  var titleRegEx = /<title[^>]*>((.|[\n\r])*)<\/title>/im
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
        contents: pageify(path + '/*')
      }
    } else {
      var file = fs.readFileSync(path, 'utf8')
      var title = titleRegEx.exec(file)[1]
      var description = descriptionRegEx.exec(file) ? descriptionRegEx.exec(file)[1] : ''
      var fileName = path.split('/').pop()
      var name = fileName.split('.')
      name.pop()
      name = name.join('')
      name = name.replace(/_/g, ' ')

      item = {
        id: id,
        isFile: true,
        url: path.replace('./dist/', ''),
        path: path,
        fileName: fileName,
        screenshots: {
          small: 'screenshots/' + path.replace('./dist', 'localhost!8080').replace(/\//g, '!') + '-320x568.png',
          medium: 'screenshots/' + path.replace('./dist', 'localhost!8080').replace(/\//g, '!') + '-768x1024.png',
          large: 'screenshots/' + path.replace('./dist', 'localhost!8080').replace(/\//g, '!') + '-1366x768.png'
        },
        name: name,
        title: title,
        description: description
      }
    }

    return item
  })
}
