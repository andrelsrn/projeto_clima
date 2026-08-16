async function getWeather(city) {
    if (!city || city.trim() === "") {
        throw new Error("Digite uma cidade.");
    }

    const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
    );

    if (!locationResponse.ok) {
        throw new Error("Erro ao consultar a localização.");
    }

    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
        throw new Error("Cidade não encontrada.");
    }

    const location = locationData.results[0];

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`
    );

    if (!weatherResponse.ok) {
        throw new Error("Erro ao consultar o clima.");
    }

    const weatherData = await weatherResponse.json();

    if (
        !weatherData.current ||
        weatherData.current.temperature_2m === undefined ||
        weatherData.current.weather_code === undefined ||
        weatherData.current.is_day === undefined
    ) {
        throw new Error("Formato de resposta inválido.");
    }

    return {
        city: location.name,
        temperature: weatherData.current.temperature_2m,
        weatherCode: weatherData.current.weather_code,
        isDay: weatherData.current.is_day,
        time: weatherData.current.time
    };
}


function getWeatherDescription(code) {

    const weatherCodes = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",

        45: "Neblina",
        48: "Neblina com geada",

        51: "Chuvisco leve",
        53: "Chuvisco moderado",
        55: "Chuvisco intenso",

        56: "Chuvisco congelante leve",
        57: "Chuvisco congelante intenso",

        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva forte",

        66: "Chuva congelante leve",
        67: "Chuva congelante forte",

        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve forte",

        77: "Granizo",

        80: "Pancadas de chuva leves",
        81: "Pancadas de chuva moderadas",
        82: "Pancadas de chuva fortes",

        85: "Pancadas de neve leves",
        86: "Pancadas de neve fortes",

        95: "Trovoada",
        96: "Trovoada com granizo leve",
        99: "Trovoada com granizo forte"
    };

    return weatherCodes[code] || "Condição desconhecida";
}


function displayWeather(weather) {

    const result = document.querySelector("#result");

    const description = getWeatherDescription(weather.weatherCode);

    if (weather.isDay === 1) {
        document.body.classList.remove("night");
    } else {
        document.body.classList.add("night");
    }

    const date = new Date(weather.time);

    const formattedDate = date.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    result.innerHTML = `
        <h2>${weather.city}</h2>

        <p class="temperature">
            ${weather.temperature} °C
        </p>

        <p class="description">
            ${description}
        </p>

        <p class="date">
            ${formattedDate}
        </p>

        <p class="time">
            ${formattedTime}
        </p>
    `;
}


const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    try {
        result.innerHTML = "<p>Buscando informações...</p>";

        const weather = await getWeather(city);

        displayWeather(weather);

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p>${error.message}</p>
        `;
    }
});


if (typeof module !== "undefined") {
    module.exports = {
        getWeather,
        getWeatherDescription
    };
}