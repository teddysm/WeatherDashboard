const APIKey = "f6d2936051e6180de54a732ae46a3ab1"; // units=imperial
let city = "Atlanta";
let i = 0;

window.addEventListener("load", (event)=> {
  event.preventDefault();
  getApi(event);
})


$("#weather-search").submit(getApi);

async function getApi(event) {
  
  let today = dayjs().format('MMM DD, YYYY'); 
  event.preventDefault();
  // city === "Atlanta" city !== ""
  if ($("#search-box").val() || city !== ""){
    $("#search-box").val() !== "" ? city = $("#search-box").val().trim() : city;
    $("#search-box").val("");
    // if($("#search-box").val() !== "") {
    //   city = $("#search-box").val().trim();
    // }
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + '&units=imperial';
    var response = await fetch(requestUrl);
    var data = await response.json();
    // console.log(data.list);
    
    $("#current-city").text(data.city.name + " " + today);
    $("#temp").text(data.list[0].main.temp + " °F");
    $("#wind").text(data.list[0].wind.speed + " MPH");
    $("#humid").text(data.list[0].main.humidity + " %");  
    handleFiveDay(data.list); 

    // btn history-btn btn-info mt-1 mb-3 add to history	
    let historyBtn = document.createElement("button");	
    historyBtn.setAttribute("class", "btn btn-info history-btn mt-1 mb-3 row-3");	
    historyBtn.setAttribute("id", `history-btn-${i}`);
    i++;
    // historyBtn.setAttribute("height", "10%");	
    historyBtn.innerHTML = city;	
    $(".history-btn-container").append(historyBtn);
  } else{
    alert("Please enter a city!");
    return;
  }
}

function handleFiveDay(input){
  // TODO: Work on tomorrow
  // let tomorrow = dayjs().add(1, 'day').format('MMM DD, YYYY');
  for(let i = 6; i < input.length; i+=8){
    $(`#five-date-${i}`).text(dayjs(input[i].dt_txt.split(" ")[0]).format("MMM-DD-YYYY"));
    $(`#five-day-temp-${i}`).text(`${input[i].main.temp} °F`);
    $(`#five-day-wind-${i}`).text(`${input[i].wind.speed} MPH`);
    $(`#five-day-humid-${i}`).text(`${input[i].main.humidity} %`);
  }
}


let historyBtn = document.querySelectorAll(".history-btn")
historyBtn.addEventListener("click", (event)=> {
  event.preventDefault();
  getApi(event);
})


$(".history-btn").click(function(event){	
  event.preventDefault();	
  city = $(this).val();	
  console.log(city);
  console.log("hit");
  getApi();  	
});


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


