const APIKey = "f6d2936051e6180de54a732ae46a3ab1"; // units=imperial
let city = "London";

// var issueContainer = document.getElementById('issues');
// var fetchButton = document.getElementById('fetch-button');

$("#weather-search").submit(getApi);
// $("#check").click(getApi);
// getApi();
async function getApi() {
  if ($("#search-box").val()) city = $("#search-box").val();
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';
  var response = await fetch(requestUrl);
  var data = await response.json();
  $("#current-city").text(data.city.name);
  $("#temp").text("Current Temperature\n" + data.list[0].main.temp + " °F");
  $("#wind").text("Current Wind Speed\n" + data.list[0].wind.speed + " MPH");
  $("#humid").text("Current Humidity" + data.list[0].main.humidity + " %");
  console("hit");
}


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


$( function() {
  var availableCities = [
    "Atlanta", "Las Vegas", "New York", "Los Angeles", "Seattle", "Lisbon", "Nashville",
    "Denver", "New Orleans", "San Diego", "Boston", "Miami", "Houston", "New York", "Seattle", "San Francisco",
    "Charlotte", "Phoenix", "Memphis", "Dallas", "Philadelphia", "Portland", "Chicago", "Long Beach", "San Jose",
    "Baltimore", "Sacramento", "Indianapolis", "Oklahoma City", "Hong Kong", "Bangkok", "Hanoi", "Ho Chi Minh",
    "Singapore", "Paris", "London", "Dubai", "Istanbul", "Delhi", "Kuala Lumpur", "Shenzhen", "Mumbai", "Phuket",
    "Rome", "Tokyo", "Taipei", "Guangzhou", "Prague", "	Seoul", "Amsterdam", "Osaka", "Shanghai", "Barcelona",
    "Milan", "Vienna", "Cancún", "Berlin", "Cairo", "Moscow", "Venice", "Madrid", "Ha Long", "Toronto", "Dublin",
    "Jerusalem", "Sydney", "Munich", "Beijing", "Jakarta", "Budapest", "Lisbon", "Rhodes", "Heraklion", "Vancouver"
  ];
  $("#search-box").autocomplete({
    source: availableCities
  });
} );


