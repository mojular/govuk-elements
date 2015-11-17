# Mojular GOV.UK Elements

This is the implementation of [GOV.UK elements](http://govuk-elements.herokuapp.com/) for use with Mojular.

## Installation

Install via NPM:

```js
npm install mojular/govuk-elements --save
```

To use in your project with Gulp add the following to your `gulpfile.js`:

### Sass

**Gulp**

```js
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var loadPaths = require('mojular/sass-paths')([
  require('mojular-govuk-elements/package.json')
]);

gulp.task('sass', function() {
  var result = gulp.src('path/to/your/local/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: loadPaths }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + 'css/'));
```

Each Mojular module containing Sass files exposes its paths in `package.json` file.
These then can be passed to Sass compiler via `includePaths` and allows to import them
directly by file names as if they were local. Each module should have a property `sassPaths`
that collects Sass paths defined in its `package.json`.

**Rails**

In `config/initializers/sass.rb`

```ruby
JSON.parse(IO.read("node_modules/mojular-govuk-elements/package.json"))['sassPaths'].each do |p|
  Sass.load_paths << File.expand_path("node_modules/mojular-govuk-elements/#{p}")
end
```

Module’s import paths are defined in its `package.json` file. Import the into project’s `load_paths`.


### Images

One option is to copy this module’s assets into your local assets folder via Gulp task:

```js
gulp.task('images', function() {
  return gulp.src('node_modules/mojular-govuk-elements/images/*')
    .pipe(gulp.dest('assets/images/'));
});
```

Alternatively add their location to your projects assets settings.

**Django**

In project settings file:

```py
project_root = abspath(root('..'))
STATICFILES_DIRS = (
    root('assets'),
    abspath(root(project_root, 'node_modules', 'govuk-template'))
)
```

**Rails**

In `config/initializers/assets.rb`:

```ruby
Rails.application.config.assets.paths << Rails.root.join('node_modules', 'mojular-govuk-elements', 'images')
Rails.application.config.assets.precompile += %w(*.js *.png *.jpg *.ico)
```


## Usage

See [examples](https://github.com/mojular/examples) of using GOV.UK Elements with different frameworks.

The whole module can be imported in your Sass file:

```scss
@import 'govuk';
```

Or individual modules can be imported:

```scss
@import 'govuk/fonts';
@import 'govuk/base';
@import 'govuk/typography';
@import 'govuk/layout';

@import 'govuk/elements/global-header';
@import 'govuk/elements/global-subheader';
@import 'govuk/elements/global-footer';
@import 'govuk/elements/phase-banner';
```

`$image-dir` is used to prefix all images referenced in elements. This should be path to project’s built assets directory and should be included before any other imports.

```scss
$images-dir: '/static/images/';
```

See the list of Sass modules in [`sass/govuk`](https://github.com/mojular/govuk-elements/tree/master/sass/govuk).

HTML Examples can be found on [GOV.UK generated styleguide](http://ministryofjustice.github.io/bower-playground/GOV.UK/).
