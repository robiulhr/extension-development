let apiKey = `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=3c79f05c4e9744b99ffbe0c1ed145e31`

fetch(apiKey)
    .then(response => response.json())
    .then(data => {
        // do stuff with the data
        console.log(data);
    })
    .catch(() => {
        msg.textContent = "Please search for a valid city 😩";
    });