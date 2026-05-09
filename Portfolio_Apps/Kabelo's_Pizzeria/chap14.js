var qty = 1;
var pizzaType = 'cheese';
var doughType = 'thick';

document.getElementById("placeOrder").addEventListener("click", placeOrder);

function changeQty(delta) {
    qty = Math.max(1, qty + delta);
    document.getElementById("qtyDisplay").textContent = qty;
}

function selectPizza(type, el) {
    pizzaType = type;
    document.querySelectorAll('.pizza-opt').forEach(function(e) { e.classList.remove('selected'); });
    el.classList.add('selected');
}

function selectDough(type, el) {
    doughType = type;
    document.querySelectorAll('.dough-opt').forEach(function(e) { e.classList.remove('selected'); });
    el.classList.add('selected');
}

function placeOrder() {
    var city     = document.getElementById("deliveryCity").value;
    var birthday = document.getElementById("birthday").value;

    var orderPrice    = calculatePrice(qty, pizzaType);
    var deliveryPrice = calculateDelivery(orderPrice, city, birthday);
    var thickPrice    = calculateThickness(doughType);
    var total         = orderPrice + deliveryPrice + thickPrice;

    var pizzaLabel = pizzaType.charAt(0).toUpperCase() + pizzaType.slice(1);
    var doughLabel = doughType === 'thick' ? 'Thick crust' : 'Thin crust';

    var body = '';
    body += '<div class="receipt-row"><span class="r-label">' + qty + ' × ' + pizzaLabel + ' pizza</span><span class="r-val">$' + orderPrice.toFixed(2) + '</span></div>';
    body += '<div class="receipt-row"><span class="r-label">' + doughLabel + '</span><span class="r-val">$' + thickPrice.toFixed(2) + '</span></div>';
    body += '<div class="receipt-row"><span class="r-label">Delivery to ' + city + '</span><span class="r-val">' + (deliveryPrice === 0 ? '<span class="badge-free">Free</span>' : '$' + deliveryPrice.toFixed(2)) + '</span></div>';

    document.getElementById('receiptBody').innerHTML = body;
    document.getElementById('receiptTotal').textContent = '$' + total.toFixed(2);
    document.getElementById('receipt').classList.remove('hidden');
}

function calculatePrice(numPizzas, typePizza) {
    var base = numPizzas * 10;
    var extra = 0;
    if (typePizza === 'supreme')   extra = numPizzas * 2;
    if (typePizza === 'cheese')    extra = numPizzas * 10;
    if (typePizza === 'pepperoni') extra = numPizzas * 15;
    return base + extra;
}

function calculateDelivery(orderPrice, city, birthday) {
    if (((city === 'Anytown') && (orderPrice > 10)) || (birthday === 'yes')) return 0;
    return 5;
}

function calculateThickness(thickness) {
    return thickness === 'thick' ? 20 : 10;
}