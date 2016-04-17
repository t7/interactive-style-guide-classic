var fs = require('fs-extra')
var glob = require('glob')
var matter = require('gray-matter')
var handlebars = require('handlebars')
var layouts = require('handlebars-layouts')

handlebars.registerHelper(layouts(handlebars))

glob.sync('./src/templates/helpers/**/*.js').forEach(function (path) {
  var name = path.split('/').pop().replace('.js', '')
  var fn = require(process.cwd() + '/' + path)
  handlebars.registerHelper(name, fn)
})

glob.sync('./src/templates/partials/**/*.hbs').forEach(function (path) {
  var name = path.split('/').pop().replace('.hbs', '')
  var template = fs.readFileSync(path, 'utf8')
  handlebars.registerPartial(name, template)
})

glob.sync('./src/templates/pages/**/*.hbs').forEach(function (path) {
  var file = fs.readFileSync(path, 'utf8')
  var processed = matter(file)
  var distPath = path.replace('./src/templates/pages/', './dist/').replace('.hbs', '.html')
  var template = handlebars.compile(processed.content)
  processed.data.$root = '../'.repeat(distPath.split('/').length - 3)
  var html = template(processed.data)
  fs.outputFileSync(distPath, html)
})
