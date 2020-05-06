const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYXR0aWEiLCJhIjoiY2s5bmNjdzk1MDBxMTNrcHNybzdsbm1rNiJ9.9_YKk4BQFKwQbRViSQLDJg&limit=1`

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('No internet connection', undefined)
        } else if (body.features.length === 0) {
            callback('Location not Found', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
