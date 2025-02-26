const cityInput = document.getElementById('.city-input');
const searchBtn = document.getElementById('.search-btn');
const notFound = document.getElementById('.not-found');
const apiKey = "635f8fdd8d70254799ea58b5997f56d7";
const searchCitySection = document.getElementById('.saerch-city');
const weatherInfoSection = document.getElementById('.weather-info');
const countryTxt = document.getElementById('.country-txt');
const tempTxt = document.getElementById('.temp-txt');
const conditionTxt = document.getElementById('.condition-txt');
const humidityValueTxt = document.getElementById('.humidity-value-txt');
const windValueTxt = document.getElementById('.wind-value-txt');
const weatherSummaryImg = document.getElementById('.weather-summary-img');
const currentDateTxt = document.getElementById('.current-date-txt');
const forecastItemsContainer = document.getElementById('.forecast-items-container');

searchBtn.addEventListener('click',() => {
    if(cityInput.value.trim()  != '') {
      updateWeatherInfo(cityInput.value)
        cityInput.value= ''
      cityInput.blur()
    }
    
})

cityInput.addEventListener('keydown', (event) =>{
    if(event.key == 'Enter' &&
        cityInput.value.trim()  != ''
        
    ) {
        updateWeatherInfo(cityInput.value)
        cityInput.value= ''
      cityInput.blur()
    }
})

 async function getFetchData(endPoint, city) {
const apiUrl = ´`https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`   

const response = await fetch(apiUrl)

return response.json()
}

function getWeatherIcon(Id) {
if(id <= 232) return 'thunderstorm.png'
if(id <= 321) return 'drizzle.png'
if(id <= 531) return 'rain.png'
if(id <= 622) return 'snow.png'
if(id <= 781) return 'mist.png'
if(id == 800) return 'clear.png'
else return 'clouds.png'
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {weekday: 'short', day: '2-digit', month: 'short'}
    return currentDate.toLocaleDateString('en-GB', options)

async function  updateWeatherInfo(city) {
const weatherData = await getFetchData('weather', city)

if(weatherData.cod != 200){
    showDisplaySection(notFoundSection)
    return
}

const {
    name: country,
    main: {temp, humidity},
    weather: [{id, main}],
    wind: {speed},
} = weatherData

countryTxt.textContent = country
tempTxt.textContent = Math.round(temp) + '°C'
conditionTxt.textContent = main
humidityValueTxt.textContent = humidity + '%'
windValueTxt.textContent = speed + 'km/h'

currentDateTxt.textContent = getCurrentDate()
weatherSummaryImg.src = assets/weather/${getWeatherIcon(id)}

await updateForecastInfo(city)

showDisplaySection(weatherInfoSection)
}

async function updateForecastInfo(city){
    const forecastData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastItemsContainer.innerHTML = ''

    forecastData.list.forEach(forecastWeather) => {
        if(forecastWeather.dt_txt.includes(timeTaken) &&
        !forecastWeather.dt_txt.includes(todayDate))
        updateForecastInfo(forecastWeather)
 }
})

}

function updateForecastItems(weatherData) {
    const{
        dt_txt: date,
        main: {temp},
        weather: [{id}],
    } = weatherData

    const dateTaken = new Date(date)
    const dateOptions = { day: '2-digit', month: 'short'}
    const dateResult =  dateTaken.toLocaleDateString('en-US', dateOptions)

    const forecastItem = 
    <div class="forecast-item">
     <div class="forecast-item">
                <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}"  class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} ℃</h5>
        </div>
    

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
}


function showDisplaySection(section){
[weatherInfoSection, searchCitySection, notFoundSection]
.forEach(section => section.style.display = 'none' )

section.style.display = 'flex'

 
}