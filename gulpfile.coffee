babelify = require 'babelify'
browserify = require 'browserify'
del = require 'del'
g = require 'gulp'
jade = require 'gulp-jade'
livereload = require 'gulp-livereload'
plumber = require 'gulp-plumber'
react_jade = require 'react-jade'
sass = require 'gulp-sass'
source = require 'vinyl-source-stream'
sourcemaps = require 'gulp-sourcemaps'
webserver = require 'gulp-webserver'

path =
	src:
		css: 'src/**/*.sass'
		js: 'src/**/*.js'
		js_entry: 'src/entry.js'
		html: 'src/**/*.jade'
		lib: [
			# 'node_modules/react/dist/react.js'
			# 'node_modules/react-dom/dist/react-dom.js'
		]
	dest:
		public: 'public'
		js_bundle: 'bundle.js'

g.task 'clean', ->
	del "#{path.dest.public}/*"

g.task 'css', ->
	g.src path.src.css
		.pipe plumber()
		.pipe sourcemaps.init()
		.pipe sass( style:'minify' )
		.pipe sourcemaps.write()
		.pipe g.dest(path.dest.public)
		.pipe livereload()

g.task 'js', ->
	return browserify({ entries:[path.src.js_entry] })
		# .pipe plumber()
		# .pipe sourcemaps.init()
		.transform babelify, { presets: ['react','es2015']}
		.transform react_jade
		.bundle()
		# .pipe sourcemaps.write()
		.pipe source(path.dest.js_bundle)
		.pipe g.dest(path.dest.public)
		.pipe livereload()

g.task 'html', ['build_html'], ->
	g.src ''
		.pipe livereload()

# divide to assure loaded HTML that it's updated
g.task 'build_html', ->
	g.src path.src.html
		.pipe plumber()
		.pipe sourcemaps.init()
		.pipe jade(client:false)
		.pipe sourcemaps.write()
		.pipe g.dest(path.dest.public)

g.task 'lib', ->
	# g.src path.src.lib
	# 	.pipe g.dest(path.dest.public)

g.task 'watch', ->
	livereload.listen()
	g.watch path.src.css, ['css']
	g.watch path.src.js, ['js']
	g.watch path.src.html, ['html']

g.task 'webserver', ['build'], ->
	g.src 'public'
		.pipe webserver
			host: '0.0.0.0'
			port: 3000

g.task 'build', [
	'css'
	'js'
	'html'
	'lib'
]

g.task 'default', [ 'watch', 'webserver' ]

