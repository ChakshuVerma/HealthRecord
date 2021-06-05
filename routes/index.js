const route = require('express').Router()
const path  = require('path')

route.get('/', (req,res) => res.render('welcome'))
route.get('/status', (req,res) => res.render('graph'))
route.get('/addData', (req,res) => res.render('add_data'))
route.get('/faq', (req,res) => res.render('faq'))

exports = module.exports = route;  