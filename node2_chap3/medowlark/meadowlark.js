//project entrypoint
//handlebars for html framework, Pug is another

//added for express
//adding this handlebars line after we install
//then adding/configure Handlebars view engine
const express = require('express')
//newer in handlebars, needed the below
// const expressHandlebars = require('express-handlebars') does not work

// NOTE: this is based on version 3.x of express-handlebars.
// express-handlebars is now on version 6.x, so this is rather
// out-of-date, but reflects what's in the book.  if you want
// to use a newer version of express-handlebars, import it as so:
// const { engine: expressHandlebars } = require('express-handlebars')
const { engine: expressHandlebars } = require('express-handlebars')

const fortune = require('./lib/fortune.js')

const app = express()
const port = process.env.PORT || 3000

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))
app.set('view engine', 'handlebars')

//ADDING STATIC

//404 page and 500 page from 00, adding two routes 01

// This brings us to an important point: in Express, the order in which routes and middleware are added is significant. If we put the 404 handler above the routes, the home page and About page would stop working; instead, those URLs would result in a 404. Right now, our routes are pretty simple, but they also support wildcards, which can lead to problems with ordering.

// app.get('/', (req, res) => {
//     res.type('text/plain')
//     res.send('Meadowlark Travel')
// })

// app.get('/about', (req, res) => {
//     res.type('text/plain')
//     res.send('About Meadowlark Travel')
// })

// //custom 404 page
// app.use((req, res) => {
//     res.type('text/plain')
//     res.status(404)
//     res.send('404 - Not Found')
// })

// //custom 500 page
// app.use((err, req, res, next) => {
//     console.error(err.message)
//     res.type('text/plain')
//     res.status(500)
//     res.send('500 - Server Error')
// })
//////// replacing the above with new routes using handlebars

app.use(express.static(__dirname + '/public'))
////^^^^^^^ app.usestatic here
/// Remember that middleware is processed in order, and static middleware—which is usually declared first or at least very early—will override other routes. For example, if you put an index.html file in the public directory (try it!), you’ll find that the contents of that file get served instead of the route you configured! So if you’re getting confusing results, check your static files and make sure there’s nothing unexpected matching the route.


app.get('/', (req, res) => res.render('home'))

// app.get('/about', (req, res) => {
//   const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
//   res.render('about', {fortune: randomFortune})
// })
// removed the above, and removed below fortunes variable into making it a module

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune()})
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`
))

// const fortunes = [
//   "Do good.",
//   "Do better.",
//   "Do your best.",
//   "Vagabond.",
//   "Yeehaw.",
// ]