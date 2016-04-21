# T7 Interactive Style Guide (Version 1)

This guide contains all HTML markup and CSS styling necessary to create and Interactive Style Guide.

### Demo

http://t7.github.io/Interactive-Style-Guide-Classic/

### Prerequisites
- Git [http://git-scm.com](http://git-scm.com)
- Node & NPM [http://nodejs.org](http://nodejs.org)

### Installation

#### Download Source from GitHub
```
$ git clone https://github.com/t7/Interactive-Style-Guide-Classic
$ cd Interactive-Style-Guide-Classic
```

#### Install Dependencies
```
$ npm install
```

#### Build
```
$ npm run build
$ npm run styleguide
```

### Start Development Server
```
$ npm start
```
**NOTE:** This will start a server that automatically reloads the browser when code is updated. Automatically generates a new version of the style guide anytime changes made to files in the [src/](src/) folder. No need to manually build everytime you make a change!

The Style guide will be accessible from [http://localhost:8080](http://localhost:8080)


### Repository Structure

#### [scripts/](scripts/)
It contains the code that handles asset bundling and styleguide generation.

#### [src/](src/)
All source code for the application prototype

##### css
You are encouraged to split out your CSS into as many small, modular files as possible. The build process will combine all CSS in this folder and files in the [dist/css/]() folder...

##### static
Any static assets such as images, icons, PDF's, or anything else that can be downloaded.

##### js

Custom javascript goes here.

##### templates

Contains HTML templates. We use [http://handlebarsjs.com](Handlebars) as our templating system.

Templates can be thought of as one of three types...
###### Partials
Fragment of markup that can be included by other template

###### Pages
Stand alone HTML pages that represent an entire screen or screen template.


### How To

#### Create a partial

**Before**

*src/templates/partial/button.html*
```
<button type="button" class="{{className}}">{{label}}</button>
```

*src/templates/partial/buttons/label_button.html*

    ---
    title: Button
    ---

    {{#extend 'document'}}

    {{#content 'main'}}

      {{include 'button'
        label='Label Button
        className='btn j-btn-label btn-sm'
      }}

    {{/content}}

    {{/extend}}


**After**

*dist/patterns/buttons/label_button.html*

    <!doctype html>
    <html lang="en">
    <head>

    <title>Button</title>

    <meta name="description" content="">
    <meta charset="UTF-8">

    <link rel="stylesheet" href="../../../../css/main.css">

    <script src="../../../../bower_components/jquery/dist/jquery.min.js"></script>
    <script src="../../../../js/main.js"></script>

    </head>
    <body>

      <button type="button" class="btn j-btn-label btn-sm">Label Button</button>

    </body>
    </html>
