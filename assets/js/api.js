const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        result.innerHTML = "<p>Digite o nome de uma cidade.</p>";
        return;
    }

    try {
        result.innerHTML = "<p>Buscando informações...</p>";

        // Busca a localização da cidade
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Não foi possível consultar a localização.");
        }

        const locationData = await locationResponse.json();

        // Verifica se a cidade foi encontrada
        if (!locationData.results || locationData.results.length === 0) {
            result.innerHTML = "<p>Cidade não encontrada.</p>";
            return;
        }

        const location = locationData.results[0];

        // Busca os dados meteorológicos
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Não foi possível consultar o clima.");
        }

        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        // Converte o código meteorológico em uma descrição
        const description = getWeatherDescription(
            currentWeather.weather_code
        );

        // Verifica se é dia ou noite
        if (currentWeather.is_day === 1) {
            document.body.classList.remove("night");
        } else {
            document.body.classList.add("night");
        }

        // Data e hora da consulta
        const date = new Date(currentWeather.time);

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

        // Exibe os dados
        result.innerHTML = `
            <h2>${location.name}</h2>

            <p class="temperature">
                ${currentWeather.temperature_2m} °C
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

    } catch (error) {
        console.error(error);

        result.innerHTML = `
            <p>
                Não foi possível obter os dados do clima.
            </p>
            <p>
                Verifique sua conexão e tente novamente.
            </p>
        `;
    }
});


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