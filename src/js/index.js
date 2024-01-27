const key = "fb5dabe48ffbfd75aaf5e01cc720e335";

async function getCurrentLocation() {
    try {
        showLoadingMessage();

        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`);
        const data = await response.json();

        insertData(data);
    } catch (error) {
        showError("Erro ao obter a localização.");
    }
}

async function searchCity(city) {
    try {
        showLoadingMessage();

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
        const data = await response.json();
        insertData(data);
    } catch (error) {
        showError("Erro ao buscar dados da cidade.");
        getCurrentLocation();
    }
}

function showLoadingMessage() {
    const weatherElement = document.querySelector(".weather");
    weatherElement.innerHTML = "Carregando...";
}

function showError(message) {
    const weatherElement = document.querySelector(".weather");
    weatherElement.innerHTML = message;
}

function interactionBtn() {
    const city = document.querySelector(".input-city").value.trim();
    if (city !== "") {
        searchCity(city);
    } else {
        getCurrentLocation();
    }
}

function insertData(dados) {
    document.querySelector(".title-city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".weather").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".text-forecast").innerHTML = dados.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".forecast").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.querySelector(".weather-min").innerHTML = Math.floor(dados.main.temp_min) + "°C";
    document.querySelector(".weather-max").innerHTML = Math.floor(dados.main.temp_max) + "°C";
}
