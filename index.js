let total = 0;
let rowCount = 0;

// add new item to the table
const addNewItem = (item, price) => {

    // TODO: Don't add any duplicate items to the list

    // format the price
    let dspPrice = (price).toLocaleString(undefined, { minimumFractionDigits : 2 });
    
    // markup for the new table row
    let tblMarkup =
        "<tr>" +
            "<td>" + item + "</td>" +
            "<td>$" + dspPrice + "</td>" +
            "<td>" + quantitySelect(++rowCount) + "</td>" +
        "</tr>";

    // append row to the table
    document.getElementById("item-table-body").innerHTML += tblMarkup;
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

// TODO: Calculate the cart total

// TODO: Option to add tip