const apiKey = "8b2b6b40127fdb2f8e03f344d61ccd0d"

const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")

const cityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")

async function getWeather(){

const city = cityInput.value

if(city === "") return

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`

try{

const response = await fetch(url)

const data = await response.json()

cityName.innerText = data.name
temperature.innerText = `Temperatura: ${data.main.temp} °C`
description.innerText = data.weather[0].description

}catch(error){

cityName.innerText = "Cidade não encontrada"
temperature.innerText = ""
description.innerText = ""

}

}

searchBtn.addEventListener("click", getWeather)