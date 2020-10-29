let cities = [];
const local_storage_name = "WEATHER_APP_CITIES";
let geo_url = "https://api.opencagedata.com/geocode/v1/json?q=XXXXX&key=4579e1ef244041d4974e8d45c3f43ea7";
let weather_url = "https://api.openweathermap.org/data/2.5/onecall?lat=XXXXX&lon=YYYYY&appid=7aa7a778656dda6795e54c4793840c08&exclude=minutely&units=imperial";
let openweathermap_icon = "http://openweathermap.org/img/w/XXXXX.png";

let ColorCodeUVIndex = (uv_index) => {
    if(uv_index <= 3)
        return "#90EE90";
    else if(uv_index <= 6)
        return "yellow";
    else if(uv_index <= 8)
        return "orange";
    else
        return "red";
}

let RetrieveCities = () => {
    if(localStorage.getItem(local_storage_name) == null)
        localStorage.setItem(local_storage_name, JSON.stringify(cities));
    else
        cities = JSON.parse(localStorage.getItem(local_storage_name));
    FillTable();
}

let FormattedTime = (unix_timestamp) => {
    var a = new Date(unix_timestamp * 1000);
    var hour = a.getHours();
    var minutes = a.getMinutes();
    minutes = (minutes < 10) ? ("0" + minutes) : minutes;
    var time = hour + ':' + minutes;
    return time;
}

let FormattedDate = (unix_timestamp) => {
    var a = new Date(unix_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}

let FillCityDetails = (data) => {
    $("#txtCityHeader").html(`${cities[cities.length-1]} (${FormattedDate(data.current.dt)}) <img src="${openweathermap_icon.replace(/XXXXX/i, data.current.weather[0].icon)}"></img>`);
    $("#txtTemprature").html(`Temperature: ${data.current.temp} &#176F`);
    $("#txtHumidity").html(`Humidity: ${data.current.humidity}%`);
    $("#txtWindSpeed").html(`Wind Speed: ${data.current.wind_speed} mph`);
    $("#txtUVIndex").html(`UV index: <span style="border-radius: 5px; background-color: ${ColorCodeUVIndex(data.current.uvi)};">&nbsp;${data.current.uvi}&nbsp;</span>`);
    let date = "";
    let tBody = $("#tBodyHourly");
    data.hourly.forEach(element => {
        if(FormattedDate(element.dt) != date){
            let tr_date = $("<tr>").appendTo(tBody);
            $("<td colspan='5'>").appendTo(tr_date).html(`<h4 style="text-align:center;">${FormattedDate(element.dt)}</h4>`);    
            date = FormattedDate(element.dt);
        }
        let tr = $("<tr>").appendTo(tBody);
        $("<td>").appendTo(tr).html(FormattedTime(element.dt));
        $("<td>").appendTo(tr).html(`${element.temp} &#176F`);
        $("<td>").appendTo(tr).html(`<img src="${openweathermap_icon.replace(/XXXXX/i, element.weather[0].icon)}"></img> ${element.weather[0].description}`);
        $("<td>").appendTo(tr).html(`<img src="Assets/pngkit_rain-drop-png_4360555.png" style="width:20px;height:20px;"></img> ${Math.round((element.pop)*100)}%`);
        $("<td>").appendTo(tr).html(`${element.wind_speed} mph`);
    });
    $(".forecastDivs").show();
    $('.forecastDiv').each((index, element) => {
        let html = `<h4>${FormattedDate(data.daily[index].dt)}</h4>
                    <span><img style="width:40px; height:40px;" src="${openweathermap_icon.replace(/XXXXX/i, data.daily[index].weather[0].icon)}"></img> ${data.daily[index].weather[0].description}</span>
                    <h6>Feels Like: ${data.daily[index].feels_like.day} &#176F</h6>
                    <span><img src="Assets/pngkit_rain-drop-png_4360555.png" style="width:20px;height:20px;"></img> ${Math.round((data.daily[index].pop)*100)}%</span>`
        console.log(html);
        $(element).html(html);
    });
}

let FillTable = () => {
    let tBody = $("#tBody");
    tBody.html("");
    cities.forEach(element => {
        let tr = $("<tr>").prependTo(tBody);
        $("<td>").appendTo(tr).html(element);
    });
    localStorage.setItem(local_storage_name, JSON.stringify(cities));
}

let AddCity = (cityName) => {
    let found = false;
    $.each(cities, (index, element) => {
        if(element == cityName){
            cities.splice(index, 1);
            cities.push(cityName);
            found = true;
        }
    });
    if(!found)
        cities.push(cityName);
}

let GetWeatherData = () => {
    let cityName = $("#txtCityName").val().trim();
    if(isValid(cityName) && !(cityName === "")){
        let promise = fetch(geo_url.replace(/XXXXX/i,encodeURIComponent(cityName)))
        .then(response => { return response.json(); })
        .then(json => {
            let lat = json.results[0].geometry.lat;
            let lng = json.results[0].geometry.lng;
            cityName = json.results[0].formatted.replace(/united states of america/i,"US");
            console.log(weather_url.replace(/XXXXX/i,lat).replace(/YYYYY/i,lng));
            let promise2 = fetch(weather_url.replace(/XXXXX/i,lat).replace(/YYYYY/i,lng))
            .then(weather_response => { return weather_response.json(); })
            .then(data => { 
                AddCity(cityName);
                FillCityDetails(data);
                FillTable();
                ClearCity();
            })
        })
        .catch((error) => {
        console.log("error");
        })
    }
    
}





function isValid(str){
    return !/[~`!#$%\^&@*+=\-\[\]\\';/{}|\\":<>\?]/g.test(str);
   }

let ClearCity = () =>{
    $("#txtCityName").val("");
    $("#txtCityName").focus();
}

let CityClick = (e) =>{
    let cityName = $(e.target).html().trim();
    $("#txtCityName").val(cityName);
    $.each(cities, (index, element) => {
        if(element == cityName)
            cities.splice(index, 1);
    });
    GetWeatherData();
}

$(document).ready(() => {
    RetrieveCities();
    ClearCity();
    $(".search").on("click", GetWeatherData);
    $(".clickTable").on("click", CityClick);
    $(".forecastDivs").hide();
});