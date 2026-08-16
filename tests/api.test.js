/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
    <form id="weather-form">
        <input id="city" />
        <button type="submit">Buscar</button>
    </form>

    <div id="result"></div>
`;

const {
    getWeather,
    getWeatherDescription
} = require("../assets/js/api.js");


describe("getWeather", () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("cidade válida retorna dados meteorológicos", async () => {

        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    results: [
                        {
                            name: "Resende",
                            latitude: -22.47,
                            longitude: -44.45
                        }
                    ]
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    current: {
                        temperature_2m: 22.5,
                        weather_code: 2,
                        is_day: 1,
                        time: "2026-08-15T15:00"
                    }
                })
            });

        const result = await getWeather("Resende");

        expect(result).toEqual({
            city: "Resende",
            temperature: 22.5,
            weatherCode: 2,
            isDay: 1,
            time: "2026-08-15T15:00"
        });

        expect(fetch).toHaveBeenCalledTimes(2);
    });


    test("cidade inexistente lança exceção", async () => {

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                results: []
            })
        });

        await expect(
            getWeather("CidadeQueNaoExiste123")
        ).rejects.toThrow("Cidade não encontrada.");
    });


    test("entrada vazia retorna erro de validação", async () => {

        await expect(
            getWeather("")
        ).rejects.toThrow("Digite uma cidade.");

        expect(fetch).not.toHaveBeenCalled();
    });


    test("falha da API de localização gera erro", async () => {

        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        await expect(
            getWeather("Resende")
        ).rejects.toThrow(
            "Erro ao consultar a localização."
        );
    });


    test("limite da API gera erro", async () => {

        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 429
        });

        await expect(
            getWeather("Resende")
        ).rejects.toThrow(
            "Erro ao consultar a localização."
        );
    });


    test("falha de rede gera erro", async () => {

        global.fetch.mockRejectedValueOnce(
            new Error("Network Error")
        );

        await expect(
            getWeather("Resende")
        ).rejects.toThrow("Network Error");
    });


    test("resposta JSON inesperada gera erro", async () => {

        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    results: [
                        {
                            name: "Resende",
                            latitude: -22.47,
                            longitude: -44.45
                        }
                    ]
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    current: {}
                })
            });

        await expect(
            getWeather("Resende")
        ).rejects.toThrow(
            "Formato de resposta inválido."
        );
    });

});


describe("getWeatherDescription", () => {

    test("código 0 retorna céu limpo", () => {
        expect(
            getWeatherDescription(0)
        ).toBe("Céu limpo");
    });


    test("código 2 retorna parcialmente nublado", () => {
        expect(
            getWeatherDescription(2)
        ).toBe("Parcialmente nublado");
    });


    test("código desconhecido retorna condição desconhecida", () => {
        expect(
            getWeatherDescription(999)
        ).toBe("Condição desconhecida");
    });

});