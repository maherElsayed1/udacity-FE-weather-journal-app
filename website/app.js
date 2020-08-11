// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d109e2d57b182e6a92eceb76d26eb5f4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

/* Function called by event listener */
function generateWeather(e) {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    if(zip !== '') {
        getWeather(baseURL, zip, apiKey)
        .then(function(data) {
            postData('/add', {temp: data.main.temp, date: newDate, feelings: feelings});
            updateUI();
        });
    } else {
        alert('please enter zip code')
    }
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].feelings;
    } catch(error) {
        console.log("error", error);
    }
}