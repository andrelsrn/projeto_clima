const { getWeather, getWeatherDescription } = require("../assets/js/api");

global.fetch = jest.fn();

describe("getWeatherDescription", () => {
    test("deve retornar 'Céu limpo' para o código 0", () => {
        expect(getWeatherDescription(0)).toBe("Céu limpo");
    });

    test("deve retornar 'Condição desconhecida' para um código inexistente", () => {
        expect(getWeatherDescription(999)).toBe("Condição desconhecida");
    });
});

describe("getWeather", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test("deve lançar erro se a cidade for vazia", async () => {
        await expect(getWeather("")).rejects.toThrow("Digite uma cidade.");
    });

    test("deve lançar erro se a cidade não for encontrada", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ results: [] })
        });

        await expect(getWeather("CidadeInexistente")).rejects.toThrow("Cidade não encontrada.");
    });

    test("deve retornar os dados formatados corretamente incluindo variáveis adicionais em caso de sucesso", async () => {
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    results: [{ name: "Rio de Janeiro", latitude: -22.9, longitude: -43.1 }]
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    current: {
                        temperature_2m: 25.5,
                        relative_humidity_2m: 65,
                        wind_speed_10m: 12.3,
                        precipitation_probability: 10,
                        weather_code: 0,
                        is_day: 1,
                        time: "2026-05-07T12:00"
                    }
                })
            });

        const result = await getWeather("Rio de Janeiro");

        expect(result).toEqual({
            city: "Rio de Janeiro",
            temperature: 25.5,
            humidity: 65,
            windSpeed: 12.3,
            precipitation: 10,
            weatherCode: 0,
            isDay: 1,
            time: "2026-05-07T12:00"
        });
    });
});