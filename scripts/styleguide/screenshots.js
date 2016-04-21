var glob = require('glob')
var Pageres = require('pageres')

var pages = glob.sync('dist/pages/**/*.html')

function shoot (index) {
  index = index || 0
  var page = pages[index]
  if (page) {
    var url = page.replace('dist/pages', 'http://localhost:8080/pages')
    new Pageres({delay: 1})
      .src(url, ['1366x768', '768x1024', '320x568'])
      .dest('dist/screenshots')
      .run()
      .then(function () {
        shoot(index + 1)
      })
  }
}

shoot()
