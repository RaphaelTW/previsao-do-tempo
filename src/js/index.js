const key = "fb5dabe48ffbfd75aaf5e01cc720e335";

async function getCurrentLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`);
        const data = await response.json();

        insertData(data);
    } catch (error) {
        console.error("Erro ao obter a localização: ", error);
    }
}

async function searchCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
        const data = await response.json();
        insertData(data);
    } catch (error) {
        console.error("Erro ao buscar dados da cidade: ", error);
        // Aqui você pode exibir uma mensagem de erro ao usuário ou então
        // fallback para a localização atual do usuário, chamando a função getCurrentLocation()
        getCurrentLocation();
    }
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
