/// //Listing 17.1
// for (var i = 10; i > 0; i--) {
//     alert(i);
// }
// alert("Blast Off!");

// //Listing 17.2
// var myFriends = ["Agatha", "Agnes", "Jermaine", "Jack"];
// for (var i = 0; i < myFriends.length; i++){
//  alert(myFriends[i] + " is my friend.");
// }

// //Listing 17.3
// alert(Math.random());

// //Listing 17.4
// var myFriends = ["Agatha", "Agnes", "Jermaine", "Jack"];
// var randomFriend = Math.floor(Math.random() * myFriends.length);
// alert(myFriends[randomFriend]);

//Listing 17.5
var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var cold = ["Partly-Cloudy","Cloudy","Raining","Snowing","Thunderstorm","Foggy"];
var hot  = ["Sunny","Partly-Sunny"];

var weatherIcons = {
    "Sunny": "☀️", "Partly-Sunny": "🌤️", "Partly-Cloudy": "⛅",
    "Cloudy": "☁️", "Raining": "🌧️", "Thunderstorm": "⛈️",
    "Snowing": "❄️", "Foggy": "🌫️"
};

var maxTemp = 48;
var minTemp = 8;

generateWeather();

function generateWeather() {
    var container = document.getElementById("7DayWeather");
    container.innerHTML = "";

    // Generate all temps first so we can draw relative bar widths
    var temps = [];
    for (var i = 0; i < days.length; i++) {
        temps.push(Math.floor(Math.random() * (maxTemp - minTemp) + minTemp));
    }

    var highestTemp = Math.max.apply(null, temps);

    for (var i = 0; i < days.length; i++) {
        var t = temps[i];
        var pool = t >= 28 ? hot : cold;
        var wx  = pool[Math.floor(Math.random() * pool.length)];
        var pct = Math.round((t / highestTemp) * 100);

        var card = document.createElement("div");
        card.id        = days[i];
        card.className = "day-card " + wx;
        card.innerHTML =
            "<div class='day-name'>" + days[i].slice(0, 3) + "</div>" +
            "<div class='wx-icon'>" + weatherIcons[wx] + "</div>" +
            "<div class='wx-type'>" + wx.replace("-", " ") + "</div>" +
            "<div class='temp-badge'>" + t + "°C</div>" +
            "<div class='temp-bar-wrap'><div class='temp-bar' style='width:" + pct + "%'></div></div>";

        container.appendChild(card);
    }

    var d = new Date();
    document.getElementById("subtitle").textContent =
        "Generated " + d.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" });
}