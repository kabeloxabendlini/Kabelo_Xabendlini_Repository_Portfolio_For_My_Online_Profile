// *************************************** Line 1 - 125 ********************************************//

// // create days of week array
// var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];

// // define types of weather
// var weather = ["Sunny", "Partly Sunny", "Partly Cloudy", "Cloudy", "Raining", "Snowing", "Thunderstorm", "Foggy"];

// // set min and max temps
// var maxTemp = 110;
// var minTemp = 32;

// // cost (to you) of a cup of lemonade
// var lemonadeCost = 0.5;

// // array for storing daily temps
// var dailyTemp = [];

// // listen for order
// document.getElementById("OpenTheStand").addEventListener("click", openTheStand);

// // make the week's weather
// generateWeather();

// /**
// generates weather for the week
// **/
// function generateWeather() {
//     var weatherToday;
//     var tempToday;
//     for (var i = 0; i < days.length; i++) {
//         weatherToday = weather[Math.floor(Math.random() * weather.length)];
//         tempToday = Math.floor(Math.random() * (maxTemp - minTemp) + minTemp);
//         dailyTemp[i] = tempToday;
//         document.getElementById("7DayWeather").innerHTML += "<div id='" + days[i] + "' class='" + weatherToday + "'><b>Forecast for " + days[i] + ":</b><br><br>" + weatherToday + " and " + tempToday + " degrees.</div>";
//     }
// }

// /**
// calculates glasses of lemonade sold
// **/
// function openTheStand() {
//     var glassesSold = 0; // daily
//     var totalGlasses = 0; // weekly
//     var glassesLeft = 0; // left to sell

//     // clear out previous results
//     resetForm();

//     // get input
//     var numGlasses = Number(document.getElementById("numGlasses").value);
//     var glassPrice = Number(document.getElementById("glassPrice").value);


//     for (var i = 0; i < days.length; i++) {

//         // glasses sold depends on temp and price
//         glassesSold = Math.floor(dailyTemp[i] / glassPrice);

//         // how many glasses do we have now?
//         glassesLeft = numGlasses - totalGlasses;

//         // we can't sell more than we have
//         if (glassesSold > glassesLeft) {
//             glassesSold = glassesLeft;
//         }

//         // increase the weekly total
//         totalGlasses = glassesSold + totalGlasses;

//         // display daily total
//         document.getElementById("result").innerHTML += "<p>" + days[i] + ", you sold " + glassesSold + " glasses of lemonade.</p>";

//     }

//     displayResults(numGlasses, glassPrice, totalGlasses);

// }

// /**
// calculates results and displays a report
// **/
// function displayResults(weeklyInventory, glassPrice, weeklySales) {
//     // calculate results
//     var revenue = weeklySales * glassPrice;
//     var expense = weeklyInventory * lemonadeCost;
//     var leftOver = weeklyInventory - weeklySales;
//     var profit = revenue - expense;

//     // print out the weekly report
//     document.getElementById("result").innerHTML += "<p>You sold a total of " + weeklySales + " glasses of lemonade this week.</p>";
//     document.getElementById("result").innerHTML += "<p>Total revenue: $" + revenue + ".</p>";
//     document.getElementById("result").innerHTML += "<p>You have " + leftOver + " glasses of lemonade left over.</p>";
//     document.getElementById("result").innerHTML += "<p>Each glass costs you $" + lemonadeCost + ". Your profit was $" + profit + ".";
// }

// /**
// resets the game so that a new order can be placed
// **/
// function resetForm() {
//     document.getElementById("result").innerHTML = "";

// }

// for (var i = 0; i < days.length; i++) {

//     var currentPrice = glassPrice; 

//     if (days[i] === "Sunday") {
//         currentPrice = Math.max(0.01, glassPrice - 1); // prevent free or negative prices
//     }

//     glassesSold = Math.floor(dailyTemp[i] / currentPrice);

//     glassesLeft = numGlasses - totalGlasses;

//     if (glassesSold > glassesLeft) {
//         glassesSold = glassesLeft;
//     }

//     totalGlasses = glassesSold + totalGlasses;

//     document.getElementById("result").innerHTML += "<p>" + days[i] + ", you sold " + glassesSold + " glasses of lemonade.</p>";
// }


// *************************************** Line 1 - 125 ********************************************//

// *************************************** Line 127 - 239 ******************************************//

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const weatherTypes = ["Sunny","Partly Sunny","Partly Cloudy","Cloudy","Raining","Snowing","Thunderstorm","Foggy"];
const weatherIcons = {
    "Sunny": "☀️", "Partly Sunny": "🌤️", "Partly Cloudy": "⛅",
    "Cloudy": "☁️", "Raining": "🌧️", "Snowing": "❄️",
    "Thunderstorm": "⛈️", "Foggy": "🌫️"
};
const lemonadeCost = 0.5;
let dailyTemp = [];

function generateWeather() {
    const grid = document.getElementById("7DayWeather");
    grid.innerHTML = "";
    dailyTemp = [];

    for (let i = 0; i < days.length; i++) {
        const w = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        const t = Math.floor(Math.random() * (110 - 32) + 32);
        dailyTemp.push(t);

        const card = document.createElement("div");
        card.className = "day-card " + w.replace(/\s/g, "-");
        card.innerHTML = `
            <div class="day-name">${days[i].slice(0,3)}</div>
            <div class="weather-icon">${weatherIcons[w]}</div>
            <div class="weather-type">${w}</div>
            <div class="temp">${t}°F</div>
        `;
        grid.appendChild(card);
    }
}

function openTheStand() {
    const errorEl = document.getElementById("errorMsg");
    errorEl.classList.add("hidden");

    const numGlasses = Number(document.getElementById("numGlasses").value);
    const glassPrice = Number(document.getElementById("glassPrice").value);

    if (!numGlasses || numGlasses < 1 || !glassPrice || glassPrice < 0.5) {
        errorEl.textContent = "Please enter a valid number of glasses (≥1) and price (≥$0.50).";
        errorEl.classList.remove("hidden");
        return;
    }

    let totalSold = 0;
    const dailySales = [];

    for (let i = 0; i < days.length; i++) {
        let price = glassPrice;
        if (days[i] === "Sunday") price = Math.max(0.01, glassPrice - 1);

        let sold = Math.floor(dailyTemp[i] / price);
        const left = numGlasses - totalSold;
        if (sold > left) sold = left;

        totalSold += sold;
        dailySales.push(sold);
    }

    const revenue = totalSold * glassPrice;
    const expense = numGlasses * lemonadeCost;
    const profit  = revenue - expense;
    const leftover = numGlasses - totalSold;
    const maxSold = Math.max(...dailySales, 1);

    document.getElementById("rSold").textContent = totalSold;
    document.getElementById("rLeft").textContent = leftover;
    document.getElementById("rRev").textContent  = "$" + revenue.toFixed(2);

    const rp = document.getElementById("rProfit");
    rp.textContent = (profit >= 0 ? "+ " : "− ") + "$" + Math.abs(profit).toFixed(2);
    rp.className = "res-value " + (profit >= 0 ? "profit" : "loss");

    let rows = "";
    for (let i = 0; i < days.length; i++) {
        const pct = Math.round((dailySales[i] / maxSold) * 100);
        const isSunday = days[i] === "Sunday";
        rows += `
            <div class="day-row">
                <span class="d-name">${days[i]}${isSunday ? '<span class="badge-sunday">-$1</span>' : ''}</span>
                <div class="d-bar-wrap"><div class="d-bar" style="width:${pct}%"></div></div>
                <span class="d-sold">${dailySales[i]} glasses</span>
            </div>`;
    }

    document.getElementById("dayResults").innerHTML = rows;
    document.getElementById("resultsCard").classList.remove("hidden");
}

document.getElementById("OpenTheStand").addEventListener("click", openTheStand);
generateWeather();