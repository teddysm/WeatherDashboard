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


// units=imperial

// var issueContainer = document.getElementById('issues');
// var fetchButton = document.getElementById('fetch-button');

const APIKey = "f6d2936051e6180de54a732ae46a3ab1";
let city = "";


async function getApi() {
  city = "London";
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';
  var response = await fetch(requestUrl);
  var data = await response.json();
  console.log(data);
  $("#current-city").text(data.city.name);
  $("#temp").text("Current Temperature: " + data.list[0].main.temp + " °F");
  $("#wind").text("Current Wind Speed: " + data.list[0].wind.speed + " MPH");
  $("#humid").text("Current Humidity: " + data.list[0].main.humidity + " %");
}
getApi();
// fetchButton.addEventListener('click', getApi);


