let subtotal = 0;
let tax = 0;
let tips = 0;
let cartTotal = 0;
let rowCount = 0;
let itemList = [];
let formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD"});

const updatePriceDisplay = (id, price) => {
    document.getElementById(id).innerHTML = formatter.format(price);
}

const updateCartTotal = () => {
    cartTotal = subtotal + tax + tips;
    updatePriceDisplay("total", cartTotal);
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
    updateCartTotal();
}

// add new item to the table
const addNewItem = (item, price) => {

    // TODO: Don't add any duplicate items to the list

    console.log("price: " + price);
    console.log("displayed: " + price.toLocaleString(undefined, {style: "currency", currency: "USD"}));

    // create new table row element to add the item to the table
    let itemRow = document.createElement("tr");
    let itemName = document.createElement("td");
    let itemNameText = document.createTextNode(item);
    itemName.appendChild(itemNameText);
    let itemPrice = document.createElement("td");
    let itemPriceText = document.createTextNode(formatter.format(price));
    itemPrice.appendChild(itemPriceText);
    let itemQtySelector = document.createElement("td");
    itemQtySelector.appendChild(quantitySelect(++rowCount));
    itemRow.appendChild(itemName);
    itemRow.appendChild(itemPrice);
    itemRow.appendChild(itemQtySelector);

    // append item to the item list
    itemList.push({row: rowCount, price: price, qty: 0});

    // append row to the table
    document.getElementById("item-table-body").appendChild(itemRow);

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
    // create select elements to be added to the table for each new item
    let select = document.createElement("select");
    select.setAttribute("id", "sel_"+row);
    select.setAttribute("class", "form-select");
    select.setAttribute("aria-label", "Quantity select");
    let defaultOpt = document.createElement("option");
    defaultOpt.setAttribute("value", "0");
    defaultOpt.setAttribute("selected", "selected");
    let defaultOptText = document.createTextNode('0');
    defaultOpt.appendChild(defaultOptText);
    select.appendChild(defaultOpt);

    let qtyOpt;
    let qtyOptText;
    // create an option for each quantity number up to 99
    for (let qty = 1; qty < 100; qty++) {
        qtyOpt = document.createElement("option", {value: qty});
        qtyOptText = document.createTextNode(qty);
        qtyOpt.appendChild(qtyOptText);
        select.appendChild(qtyOpt);
    }
    
    // returns the element to be appended to the td of the current item row
    return select;
}

const updateAppliedTax = (event) => {
    let tipPercentage = event.target.value;

    if (tipPercentage == "custom") {

    }
    else {
        tips = subtotal * tipPercentage;
    }

    // update the tips applied display
    updatePriceDisplay("tip-applied", tips);

    // update the cart total with the tips applied
    updateCartTotal();
}

// Add listeners to radio button to update the cart total based on the selected amount of tip
let tipRadios = document.getElementsByName("tip");
for (let i = 0; i < tipRadios.length; i++) {
    tipRadios[i].addEventListener("click", updateAppliedTax);
}

