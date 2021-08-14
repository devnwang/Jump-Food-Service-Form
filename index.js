let subtotal = 0;
let tax = 0;
let tips = 0;
let cartTotal = 0;
let rowCount = 0;
let itemList = [];

const formatPrice = (price) => {
    return (price).toLocaleString(undefined, { minimumFractionDigits : 2 });
}

const updatePriceDisplay = (id, price) => {
    document.getElementById(id).innerHTML = "$" + formatPrice(price);
}

const updateItemQty = (event) => {
    console.log(event);
    
    // retrieve the new quantity value
    let newQty = event.target.value;
    // grab the index of the item within the array
    let selector = (event.target.id).split("_")[1] - 1;

    let itemPrice = itemList[selector].price;

    // remove item total price from the current subtotal
    subtotal = subtotal - (itemList[selector].qty * itemPrice);
    
    // update the item list information
    itemList[selector].qty = newQty;

    let totalItemPrice = itemList[selector].qty * itemPrice;

    // update subtotal
    subtotal = subtotal + totalItemPrice;
    updatePriceDisplay("subtotal", subtotal);

    // update estimated tax
    tax = subtotal * 0.05;
    updatePriceDisplay("tax", tax);

    // update cart total
    cartTotal = subtotal + tax + tips;
    updatePriceDisplay("total", cartTotal);
}

// add new item to the table
const addNewItem = (item, price) => {

    // TODO: Don't add any duplicate items to the list

    // format the price
    let dspPrice = formatPrice(price);
    
    // markup for the new table row
    let tblMarkup =
        "<tr>" +
            "<td>" + item + "</td>" +
            "<td>$" + dspPrice + "</td>" +
            "<td>" + quantitySelect(++rowCount) + "</td>" +
        "</tr>";

    // append item to the item list
    itemList.push({row: rowCount, price: dspPrice, qty: 0});

    // append row to the table
    document.getElementById("item-table-body").innerHTML += tblMarkup;

    // add event listener to the item's quantity selector
    document.getElementById("sel_" + rowCount).addEventListener('change', updateItemQty);
}

// add event listener to "Add Item" button
let itemName = document.getElementById("itemName");
let itemPrice = document.getElementById("itemPrice");
document.getElementById("addBtn").addEventListener('click', () => addNewItem(itemName.value, itemPrice.value));
console.log("Event listener added");

// markup for the quantity select
const quantitySelect = (row) => {
    // starting markup for the select
    let selMarkup = 
        "<select id='sel_" + row + "' class='form-select' aria-label='Quantity select'>" +
            "<option selected value='0'>0</option>";

    // create an option for each quantity number up to 99
    for (let qty = 1; qty < 100; qty++) {
        selMarkup += "<option value='" + qty + "'>" + qty + "</option>";
    }

    selMarkup += "</select>";
    
    return selMarkup;
}

// TODO: Option to add tip
// Add listeners to radio button to update the cart total based on the selected amount of tip

// TODO: Calculate the cart total

