const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Require Express framework
const app = express()
const port = process.env.PORT || 3000   // to use if heroku or localhost

//Define Paths for Express configs
const publicDirPath = path.join(__dirname, '../public')
const partialDirPath = path.join(__dirname, '../views/partials')

//Setup handlebars engine (npm module)
app.set('view engine', 'hbs')
hbs.registerPartials(partialDirPath)

//Setup static dir to serve
app.use(express.static(publicDirPath))

//Render app different pages
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mohamed Attia"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mohamed Attia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mohamed Attia'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Mohamed Attia',
        errorMSG: 'Help article not Found'
    })
})

app.get('/getWeather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Mohamed Attia',
        errorMSG: 'Page not found'
    })
})

//set port to 3000 if using on localhost 'localhost://3000'
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})