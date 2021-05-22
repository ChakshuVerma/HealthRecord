const express = require('express');
const app = express();
const path  = require('path')
const http = require('http').createServer(app)
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname ,'views')));


// EJS
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views/ejs')


// Express body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// So that page renders again when we press the backbutton
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


// Routes
app.use('/', require('./routes/index.js'));
app.use('*', (req,res) => {
  res.render('404')
})

app.listen(port, console.log(`Server running on ` + port));
