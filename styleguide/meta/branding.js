module.exports = function () {
  var glob = require('glob')

  var colors = [
    {
      'title': 'Lighter Gray',
      'value': '#F5F5F6',
      'description': 'Right rale light gray'
    },
    {
      'title': 'Light Gray',
      'value': '#D4D8DB',
      'description': 'Stroke gray'
    },
    {
      'title': 'Middle Gray',
      'value': '#7A8C98',
      'description': 'Topic Header gray'
    },
    {
      'title': 'Dark Gray',
      'value': '#4C565E',
      'description': 'Footer/mega menu dark gray'
    },
    {
      'title': 'Darkest Gray',
      'value': '#444F57',
      'description': 'Footer/mega menu/body copy darkest gray'
    },
    {
      'title': 'Black',
      'value': '#000000',
      'description': 'Headlines'
    },
    {
      'title': 'White',
      'value': '#FFFFFF',
      'description': 'Background color'
    },
    {
      'title': 'Lighter Blue',
      'value': '#EBF3F9',
      'description': 'Background color'
    },
    {
      'title': 'Light Blue',
      'value': '#3A89C3',
      'description': 'Text links/Button'
    },
    {
      'title': 'Blue',
      'value': '#44658E',
      'description': 'Equities POV dark blue'
    },
    {
      'title': 'Dark Blue',
      'value': '#304969',
      'description': 'Equities POV darkest blue'
    },
    {
      'title': 'Green',
      'value': '#5C9631',
      'description': 'Fixed Income POV green'
    },
    {
      'title': 'Lime Green',
      'value': '#BBCD3A',
      'description': 'Chart promo lime green'
    },
    {
      'title': 'Light Green',
      'value': '#7FB124',
      'description': 'Chart promo green'
    },
    {
      'title': 'Dark Green',
      'value': '#4C7D29',
      'description': 'Fixed Income POV darkest green'
    },
    {
      'title': 'Orange',
      'value': '#E38B37',
      'description': 'Badges'
    },
    {
      'title': 'Red',
      'value': '#D8471C',
      'description': 'Error text'
    }
  ]

  var typography = [
    {
      'title': 'Raleway',
      'font-family': 'Raleway',
      'description': 'Google Web font - approx 59k'
    },
    {
      'title': 'Verdana',
      'font-family': 'verdana',
      'description': 'System font. Available on 99% of operating systems'
    },
    {
      'title': 'sans-serif',
      'font-family': 'sans-serif',
      'description': 'Fallback to system default sans-serif font if other fonts are not available.'
    }
  ]

  var icons = glob.sync('src/static/images/icons/**.svg').map(function (path) {
    return {
      src: path.replace('src/', ''),
      fileName: path.split('/').pop(),
      className: path.split('/').pop().replace('.svg', ''),
      title: path.split('/').pop().replace('.svg', '')
    }
  })

  return {
    colors: colors,
    typography: typography,
    icons: icons
  }
}
