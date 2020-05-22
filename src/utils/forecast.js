const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = `https://api.weatherapi.com/v1/current.json?key=f5fcd9fdea1243aba63194039203004&q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`
    const url = `http://api.weatherapi.com/v1/forecast.json?key=f5fcd9fdea1243aba63194039203004&q=${latitude},${longitude}&days=3`

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('No internet connection', undefined)
        } else if (body.error) {
            callback(body.error.message, undefined)
        } else {
            callback(undefined, `Today:
            -It's currently ${body.current.condition.text}.
            -Now is ${body.current.temp_c}\u2103.
            -It feels like ${body.current.feelslike_c}\u2103.
            Tomorrow:
            -Max: ${body.forecast.forecastday[1].day.maxtemp_c}\u2103.
            -Min: ${body.forecast.forecastday[1].day.mintemp_c}\u2103`.
        }
    })
}

module.exports = forecast
