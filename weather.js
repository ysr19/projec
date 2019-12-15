const weather = document.querySelector(".js-weather");
const API_KEY = "3afa3dab22c584e7a1c78fbb357be2fe";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
    
    return response.json()

    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        console.log(temperature);
        console.log(place);
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSucces(position){

    console.log(position.coords);
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;    
    const coordsObj = {
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

 

function handleGeoError(){

    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)


}



function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCords)
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }


}


function init(){

    loadCoords();

}

init();