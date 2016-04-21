var fs = require('fs-extra')
var glob = require('glob')
var matter = require('gray-matter')
var handlebars = require('handlebars')
var layouts = require('handlebars-layouts')

handlebars.registerHelper(layouts(handlebars))

glob.sync('./styleguide/helpers/**/*.js').forEach(function (path) {
  var name = path.split('/').pop().replace('.js', '')
  var fn = require(process.cwd() + '/' + path)
  handlebars.registerHelper(name, fn)
})

glob.sync('./styleguide/partials/**/*.hbs').forEach(function (path) {
  var name = path.split('/').pop().replace('.hbs', '')
  var template = fs.readFileSync(path, 'utf8')
  handlebars.registerPartial(name, template)
})

glob.sync('./src/templates/partials/**/*.hbs').forEach(function (path) {
  console.log(path)
  var name = path.split('/').pop().replace('.hbs', '')
  var template = fs.readFileSync(path, 'utf8')
  handlebars.registerPartial(name, template)
})

glob.sync('./styleguide/patterns/**/*.hbs').forEach(function (path) {
  var file = fs.readFileSync(path, 'utf8')
  var processed = matter(file)
  var distPath = path.replace('./styleguide/', './dist/').replace('.hbs', '.html')
  var template = handlebars.compile(processed.content)
  processed.data.$root = '../'.repeat(distPath.split('/').length - 3)
  var html = template(processed.data)
  fs.outputFileSync(distPath, html)
})

var $root = ''
var $styleguide = {
  config: require('../../styleguide/config.json'),
  index: require('../../styleguide/meta')(),
  branding: require('../../styleguide/meta/branding')(),
  patterns: {
    contents: require('../../styleguide/meta/patterns')('./dist/patterns')
  },
  pages: {
    contents: require('../../styleguide/meta/pages')('./dist/pages')
  }
}

var processed = matter(fs.readFileSync('./styleguide/pages/index.hbs', 'utf8'))
var template = handlebars.compile(processed.content)
processed.data.$root = $root
processed.data.$styleguide = $styleguide
fs.outputFileSync('./dist/index.html', template(processed.data))

processed = matter(fs.readFileSync('./styleguide/pages/branding.hbs', 'utf8'))
template = handlebars.compile(processed.content)
processed.data.$root = $root
processed.data.$styleguide = $styleguide
fs.outputFileSync('./dist/branding.html', template(processed.data))

processed = matter(fs.readFileSync('./styleguide/pages/patterns.hbs', 'utf8'))
template = handlebars.compile(processed.content)
processed.data.$root = $root
processed.data.$styleguide = $styleguide
fs.outputFileSync('./dist/patterns.html', template(processed.data))

processed = matter(fs.readFileSync('./styleguide/pages/pages.hbs', 'utf8'))
template = handlebars.compile(processed.content)
processed.data.$root = $root
processed.data.$styleguide = $styleguide
fs.outputFileSync('./dist/pages.html', template(processed.data))
