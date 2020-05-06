const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const info1 = document.querySelector('#info1')
const info2 = document.querySelector('#info2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value

    info1.textContent = 'Loading...'
    info2.textContent = ''

    //for localhost port only
    // fetch(`http://localhost:3000/getWeather?address=${location}`).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             info1.textContent = data.error
    //         } else {
    //             info1.textContent = data.location
    //             info2.textContent = data.forecast
    //         }
    //     })
    // })

    //for heroku port or localhost port
    fetch(`/getWeather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                info1.textContent = data.error
            } else {
                info1.textContent = data.location
                info2.textContent = data.forecast
            }
        })
    })
})