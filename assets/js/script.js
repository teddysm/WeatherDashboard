const APIKey = "f6d2936051e6180de54a732ae46a3ab1"; 
let city = "Atlanta";

// make an API call on page load with the default city of Atlanta
window.addEventListener("load", (event)=> {
  event.preventDefault();
  getApi(event);
})

// clear local storage on page load
window.addEventListener("unload", (event)=> {
  event.preventDefault();
  localStorage.clear();
})

// whenever user clicks on the submit button, make an API call
$("#weather-search").submit(getApi);

async function getApi(event) {
  event.preventDefault();
  let today = dayjs().format('MMM DD, YYYY'); 
  // if there is text in the search box, use that text for the city
  if ($("#search-box").val() || city !== ""){
    $("#search-box").val() !== "" ? city = $("#search-box").val().trim() : city;
    createHistoryBtn(city);
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';
    let response = await fetch(requestUrl);
    let data = await response.json();
    let icon = data.list[0].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + icon +".png";
    let iconElement = $('<img>').attr('src', iconURL).attr('width', '45').attr('height', '45');

    $("#current-city").text(data.city.name + " " + today);
    $('#status').text(data.list[0].weather[0].description).append(iconElement);
    $("#temp").text(data.list[0].main.temp + " °F");
    $("#wind").text(data.list[0].wind.speed + " MPH");
    $("#humid").text(data.list[0].main.humidity + " %");  
    handleFiveDay(data.list); 
    $("#search-box").val("");
  
  // if the text box is empty, throw an alert
  } else{
    alert("Please enter a city!");
    return;
  }
}

// check local storage to see if the city parameter is already in there
// if not then we add that city to local storage and add a button for that city
function createHistoryBtn(city){
  if(!localStorage.getItem(city)){
    localStorage.setItem(city, city);
    let historyBtn = document.createElement("button");	
    historyBtn.setAttribute("class", "btn btn-info history-btn mt-1 mb-3 row-3");	
    historyBtn.setAttribute("type", "submit");	
    historyBtn.innerHTML = city;	
    $(".history-btn-container").append(historyBtn);
  }
}

// create an event listener for the history buttons
$(".history-btn-container").on("click", function(event){
  if(event.target.innerText){
    city = event.target.innerText;
    getApi(event);
  }  
})


// generate information for the 5 day forecast cards
function handleFiveDay(input){
  for(let i = 6; i < input.length; i+=8){
    let icon = input[i].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + icon +".png";
    let iconElement = $('<img>').attr('src', iconURL).attr('width', '45').attr('height', '45');
    $(`#five-date-${i}`).text(dayjs(input[i].dt_txt.split(" ")[0]).format("MMM-DD-YYYY"));
    $(`#five-day-temp-${i}`).text(`${input[i].main.temp} °F`);
    $(`#five-day-wind-${i}`).text(`${input[i].wind.speed} MPH`);
    $(`#five-day-humid-${i}`).text(`${input[i].main.humidity} %`);
    $(`#status-${i}`).text(`${input[i].weather[0].description}`).append(iconElement);
  }
}

// set the time header and make time live
function setTimeHeader(){
  let today = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a'); 
  $("#current-time").text(today);
  
  function updateTime(){
    today = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a'); 
    $("#current-time").text(today);
  }
  setInterval(updateTime, 1000);
}
setTimeHeader();


// add autocomplete
$( function() {
  var availableCities = [
    "Atlanta", "Las Vegas", "New York", "Los Angeles", "Seattle", "Lisbon", "Nashville",
    "Denver", "New Orleans", "San Diego", "Boston", "Miami", "Houston", "Montreal", "Seattle", "San Francisco",
    "Charlotte", "Phoenix", "Memphis", "Dallas", "Philadelphia", "Portland", "Chicago", "Long Beach", "San Jose",
    "Baltimore", "Sacramento", "Indianapolis", "Oklahoma City", "Hong Kong", "Bangkok", "Hanoi", "Ho Chi Minh",
    "Singapore", "Paris", "London", "Dubai", "Istanbul", "Delhi", "Kuala Lumpur", "Shenzhen", "Mumbai", "Phuket",
    "Rome", "Tokyo", "Taipei", "Guangzhou", "Prague", "	Seoul", "Amsterdam", "Osaka", "Shanghai", "Barcelona",
    "Milan", "Vienna", "Cancún", "Berlin", "Cairo", "Moscow", "Venice", "Madrid", "Ha Long", "Toronto", "Dublin",
    "Jerusalem", "Sydney", "Munich", "Beijing", "Jakarta", "Budapest", "Lisbon", "Rhodes", "Athens", "Vancouver"
  ];
  $("#search-box").autocomplete({
    source: availableCities
  });
});


