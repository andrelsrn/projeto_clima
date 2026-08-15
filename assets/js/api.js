const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const result = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        result.textContent = "Digite o nome de uma cidade.";
        return;
    }

    try {
        result.textContent = "Buscando informações...";

        // 1. Buscar as coordenadas da cidade
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            result.textContent = "Cidade não encontrada.";
            return;
        }

        const location = locationData.results[0];

        // 2. Buscar o clima usando latitude e longitude
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
        );

        const weatherData = await weatherResponse.json();

        // 3. Exibir os dados
        result.innerHTML = `
            <h2>${location.name}</h2>
            <p>Temperatura: ${weatherData.current_weather.temperature} °C</p>
        `;

    } catch (error) {
        console.error(error);
        result.textContent = "Erro ao buscar os dados do clima.";
    }
});