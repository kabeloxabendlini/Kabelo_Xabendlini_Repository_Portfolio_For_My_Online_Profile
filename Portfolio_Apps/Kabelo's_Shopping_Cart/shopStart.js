var items = ["Coke", "Kit Kat", "Bar One", "Fanta"];
var prices = [7.5, 9.5, 8.5, 7.5];
var categories = ["Drink", "Snack", "Snack", "Drink"];
var quantities = [0, 0, 0, 0];

function fmt(n) {
    return 'R' + n.toFixed(2);
}

function add_selection(x) {
    quantities[x]++;
    display_all();
}

function remove_selection(x) {
    if (quantities[x] > 0) {
        quantities[x]--;
    }
    display_all();
}

function display_all() {
    var totalItems = 0, totalAmt = 0;
    var rows = '';

    for (var i = 0; i < items.length; i++) {
        var rowTotal = prices[i] * quantities[i];
        totalItems += quantities[i];
        totalAmt += rowTotal;

        var tagClass = categories[i] === 'Drink' ? 'tag-drink' : 'tag-snack';

        rows += '<tr>';
        rows += '<td class="item-name">' + items[i] + '</td>';
        rows += '<td class="price-cell">' + fmt(prices[i]) + '</td>';
        rows += '<td><span class="tag ' + tagClass + '">' + categories[i] + '</span></td>';
        rows += '<td><div class="qty-cell">';
        rows += '<button class="qty-btn minus" onclick="remove_selection(' + i + ')">−</button>';
        rows += '<span class="qty-num">' + quantities[i] + '</span>';
        rows += '<button class="qty-btn plus" onclick="add_selection(' + i + ')">+</button>';
        rows += '</div></td>';
        rows += '<td class="row-total">' + (rowTotal > 0 ? fmt(rowTotal) : '—') + '</td>';
        rows += '</tr>';
    }

    document.getElementById('demo').innerHTML = rows;
    document.getElementById('stat-items').textContent = totalItems;
    document.getElementById('stat-sub').textContent = fmt(totalAmt);
    document.getElementById('stat-total').textContent = fmt(totalAmt);
    document.getElementById('total').textContent = '';
}

function checkOut() {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += prices[i] * quantities[i];
    }
    document.getElementById('total').textContent = 'Order total: ' + fmt(total);
}

window.onload = display_all;