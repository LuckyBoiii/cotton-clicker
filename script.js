var cotton = parseInt(window.localStorage.getItem('cotton')) || 0;
var cash = parseInt(window.localStorage.getItem('cash')) || 0;
var sell_multiplier = parseInt(window.localStorage.getItem('sell_multiplier')) || 1;
var click_multiplier = parseInt(window.localStorage.getItem('click_multiplier')) || 100;
var passive_cotton = parseInt(window.localStorage.getItem('passive_cotton')) || 0;
var both_hands = window.localStorage.getItem('both_hands') === 'true';

var uppg_1_cost = parseInt(window.localStorage.getItem('uppg_1_cost')) || 10;
var uppg_2_cost = parseInt(window.localStorage.getItem('uppg_2_cost')) || 100;
var uppg_3_cost = parseInt(window.localStorage.getItem('uppg_3_cost')) || 1000;
var uppg_4_cost = parseInt(window.localStorage.getItem('uppg_4_cost')) || 10000;
var uppg_5_cost = parseInt(window.localStorage.getItem('uppg_5_cost')) || 100000;
var uppg_6_cost = parseInt(window.localStorage.getItem('uppg_6_cost')) || 1000000;

var reload = true;

function saveGameState() {
    window.localStorage.setItem('cotton', cotton);
    window.localStorage.setItem('cash', cash);
    window.localStorage.setItem('click_multiplier', click_multiplier);
    window.localStorage.setItem('passive_cotton', passive_cotton);
    window.localStorage.setItem('both_hands', both_hands);
    window.localStorage.setItem('sell_multiplier', sell_multiplier);

    window.localStorage.setItem('uppg_1_cost', uppg_1_cost);
    window.localStorage.setItem('uppg_2_cost', uppg_2_cost);
    window.localStorage.setItem('uppg_3_cost', uppg_3_cost);
    window.localStorage.setItem('uppg_4_cost', uppg_4_cost);
    window.localStorage.setItem('uppg_5_cost', uppg_5_cost);
    window.localStorage.setItem('uppg_6_cost', uppg_6_cost);

    document.getElementById("cotton").innerHTML = cotton;
    document.getElementById("cash").innerHTML = cash;
    document.getElementById("passive").innerHTML = Math.floor(passive_cotton);
    document.getElementById("uppg_1_cost").innerHTML = uppg_1_cost;
    document.getElementById("uppg_2_cost").innerHTML = uppg_2_cost;
    document.getElementById("uppg_3_cost").innerHTML = uppg_3_cost;

}

function updateValues() {
    document.getElementById("cotton").innerHTML = cotton;
    document.getElementById("cash").innerHTML = cash;
    document.getElementById("passive").innerHTML = Math.floor(passive_cotton);
    document.getElementById("uppg_1_cost").innerHTML = uppg_1_cost;
    document.getElementById("uppg_2_cost").innerHTML = uppg_2_cost;
    document.getElementById("uppg_3_cost").innerHTML = uppg_3_cost;
    document.getElementById("uppg_4_cost").innerHTML = uppg_4_cost;
    document.getElementById("uppg_5_cost").innerHTML = uppg_5_cost;
    document.getElementById("uppg_6_cost").innerHTML = uppg_6_cost;

    if (both_hands) {
    document.getElementById("uppg_6_cost").innerHTML = "Bought";
    }
}

setInterval(function() {
    cotton += passive_cotton;
    document.getElementById("cotton").innerHTML = cotton;
    document.getElementById("passive").innerHTML = Math.floor(passive_cotton);
    
    if (reload) {
    updateValues();
    reload = false;
    console.log("reloaded");
    } else {
    //jag hade kunnat gjort en knapp för att spara men det blir tråkigt om man glömmer trycka.
    saveGameState();
    }
}, 1000);

function onCottonClick() {
    if (both_hands) {
    cotton += 2 * click_multiplier;
    document.getElementById("cotton").innerHTML = cotton;
    } else {
    cotton += 1 * click_multiplier;
    document.getElementById("cotton").innerHTML = cotton;
    saveGameState();
    }
}

function sellCotton() {
    if (cotton > 0) {
    cash += cotton * sell_multiplier;
    document.getElementById("cash").innerHTML = cash;
    cotton = 0;
    document.getElementById("cotton").innerHTML = cotton;
    }
}



var cost_multiplier = 1.2;

function buyClick(item) {
    var cost;
    switch (item) {
    case 1:
        cost = uppg_1_cost;
        break;
    case 2:
        cost = uppg_2_cost;
        break;
    case 3:
        cost = uppg_3_cost;
        break;
    case 4:
        cost = uppg_4_cost;
        break;
    case 5:
        cost = uppg_5_cost;
        break;
    case 6:
        cost = uppg_6_cost;
        break;
    }

    if (cash >= cost) {
    cash -= cost;
    updateCost(item);
    applyUpgrade(item);
    document.getElementById("cash").innerHTML = Math.floor(cash);
    saveGameState();
    } else {
    alert("Can't afford that");
    }
}

function updateCost(item) {
    var cost_element = document.getElementById("uppg_" + item + "_cost");

    switch (item) {
    case 1:
        uppg_1_cost = Math.floor(uppg_1_cost * cost_multiplier);
        cost_element.innerHTML = uppg_1_cost;
        break;
    case 2:
        uppg_2_cost = Math.floor(uppg_2_cost * cost_multiplier);
        cost_element.innerHTML = uppg_2_cost;
        break;
    case 3:
        uppg_3_cost = Math.floor(uppg_3_cost * cost_multiplier);
        cost_element.innerHTML = uppg_3_cost;
        break;
    case 4:
        uppg_4_cost = Math.floor(uppg_4_cost * cost_multiplier);
        cost_element.innerHTML = uppg_4_cost;
        break;
    case 5:
        uppg_5_cost = Math.floor(uppg_5_cost * cost_multiplier);
        cost_element.innerHTML = uppg_5_cost;
        break;
    case 6:
        uppg_6_cost = Math.floor(uppg_6_cost * cost_multiplier);
        cost_element.innerHTML = uppg_6_cost;
        break;
    }
}

function applyUpgrade(item) {
    switch (item) {
    case 1:
        click_multiplier += 1;
        break;
    case 2:
        passive_cotton += 1;
        break;
    case 3:
        click_multiplier += 2;
        break;
    case 4:
        sell_multiplier += 1;
        break;
    case 5:
        passive_cotton += 5;
        break;
    case 6:
        both_hands = true;
        document.getElementById("uppg_6_cost").innerHTML = "Bought";
        break;
    }
}