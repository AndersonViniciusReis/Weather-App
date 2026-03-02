const apiKey = "8b2b6b40127fdb2f8e03f344d61ccd0d";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const suggestionsList = document.getElementById("suggestions");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Sugestões de cidades
async function getCitySuggestions(query) {
    if(!query) return [];
    const limit = 5;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`;
    try {
        const res = await fetch(url);
        if(!res.ok) return [];
        const data = await res.json();
        return data;
    } catch {
        return [];
    }
}

// Mostrar sugestões no dropdown
async function showSuggestions() {
    const query = cityInput.value.trim();
    suggestionsList.innerHTML = "";
    if(query.length < 2) return;

    const cities = await getCitySuggestions(query);
    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}${city.state ? ", "+city.state : ""}, ${city.country}`;
        li.addEventListener("click", () => {
            cityInput.value = city.name;
            suggestionsList.innerHTML = "";
            getWeather(city.name);
        });
        suggestionsList.appendChild(li);
    });
}

// Buscar previsão do tempo
async function getWeather(city = null) {
    const cityNameInput = city || cityInput.value.trim();
    if(!cityNameInput) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${apiKey}&units=metric&lang=pt`;

    try {
        const res = await fetch(url);
        if(!res.ok) throw new Error("Cidade não encontrada");
        const data = await res.json();

        cityName.innerText = data.name;
        temperature.innerText = `${data.main.temp.toFixed(1)} °C`;
        description.innerText = data.weather[0].description;
        humidity.innerText = `Umidade: ${data.main.humidity}%`;
        wind.innerText = `Vento: ${data.wind.speed} m/s`;

        const card = document.querySelector(".card");
        const main = data.weather[0].main.toLowerCase();
        if(main.includes("rain")) card.style.background = "#a3c2f2";
        else if(main.includes("cloud")) card.style.background = "#d3d3d3";
        else if(main.includes("clear")) card.style.background = "#ffe680";
        else card.style.background = "#dbe9ff";

    } catch(error) {
        cityName.innerText = "Cidade não encontrada";
        temperature.innerText = "";
        description.innerText = "";
        humidity.innerText = "";
        wind.innerText = "";
    }
}

// Eventos
searchBtn.addEventListener("click", () => getWeather());
cityInput.addEventListener("input", showSuggestions);
cityInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") getWeather();
});