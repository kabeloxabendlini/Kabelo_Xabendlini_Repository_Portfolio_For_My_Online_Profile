// Password prompt on page load
function requestPassword() {
    let password;
    while (password !== "Kabza") {                        // ← match your chosen password
        let userInput = prompt("May I have the password please?");
        if (userInput === "Kabza") {                      // ← same word here
            password = "Kabza";
        }
    }
    alert("Man! You are Welcome! Welcome to the best restaurant in town!");
}

requestPassword();

// --- rest of your code below ---

let qty = 1;

const qtyDisplay  = document.getElementById("qtyDisplay");
const moneyLeft   = document.getElementById("moneyLeft");
const lunchCount  = document.getElementById("lunchCount");
const receiptCard = document.getElementById("receiptCard");
const timeline    = document.getElementById("timeline");
const summary     = document.getElementById("summary");

document.getElementById("qtyUp").addEventListener("click", function() {
    qty++;
    qtyDisplay.textContent = qty;
});

document.getElementById("qtyDown").addEventListener("click", function() {
    if (qty > 1) { qty--; qtyDisplay.textContent = qty; }
});

document.getElementById("placeOrder").addEventListener("click", buyLunches);

function getSandwichPrice() {
    return parseFloat((Math.random() * 1).toFixed(2));
}

function buyLunches() {
    let money = 40, lunches = 0, totalSpent = 0, day = 0;
    let rows = "", ranOut = false;

    while (money > 0) {
        day++;
        const price = getSandwichPrice();
        const total = parseFloat((price * qty).toFixed(2));

        if (money >= total) {
            money      = parseFloat((money - total).toFixed(2));
            lunches   += qty;
            totalSpent = parseFloat((totalSpent + total).toFixed(2));
            const pct  = Math.round((money / 40) * 100);

            rows += `
                <div class="day-row">
                    <div class="day-dot dot-ok">${day}</div>
                    <div class="day-text">
                        <span class="price">Day ${day}: $${price.toFixed(2)}/sandwich</span> — bought ${qty}<br>
                        <span class="balance">
                            $${money.toFixed(2)} remaining
                            <div class="money-bar-wrap"><div class="money-bar" style="width:${pct}%"></div></div>
                        </span>
                    </div>
                </div>`;
        } else {
            rows += `
                <div class="day-row">
                    <div class="day-dot dot-no">${day}</div>
                    <div class="day-text">
                        <span class="price">Day ${day}: $${price.toFixed(2)}/sandwich</span><br>
                        <span class="balance empty">Not enough money ($${money.toFixed(2)} left) — maybe your sister will share 🥪</span>
                    </div>
                </div>`;
            ranOut = true;
            break;
        }
    }

    const avg = lunches > 0 ? (totalSpent / lunches).toFixed(2) : "—";
    const remaining = ranOut ? money.toFixed(2) : "0.00";

    summary.innerHTML = `
        <div class="sum-row"><span class="s-label">Total lunches bought</span><span class="s-val">${lunches}</span></div>
        <div class="sum-row"><span class="s-label">Total spent</span><span class="s-val">$${totalSpent.toFixed(2)}</span></div>
        <div class="sum-row"><span class="s-label">Money remaining</span><span class="s-val">$${remaining}</span></div>
        <div class="sum-row"><span class="s-label">Average price per sandwich</span><span class="s-val">$${avg}</span></div>`;

    timeline.innerHTML = rows;
    moneyLeft.textContent = `$${remaining}`;
    lunchCount.textContent = lunches;
    receiptCard.classList.remove("hidden");
}