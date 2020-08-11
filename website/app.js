// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=d109e2d57b182e6a92eceb76d26eb5f4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

/* Function called by event listener */
function generateWeather(e) {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    getWeather(baseURL, zip, apiKey);
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
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
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}