
const findd=document.getElementById("find");
findd.addEventListener("keyup", function() {
    let input = findd.value.toLowerCase();
    let items = document.querySelectorAll(".lunch1");

    items.forEach(item => {
        let itemName = item.querySelector(".name h3").textContent.toLowerCase();

        if (itemName.includes(input)) {
            item.style.display = "block";
            
        } else {
            item.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderButtons = document.querySelectorAll(".order");
    const popupModal = document.getElementById("popupModal");
    const closePopup = document.getElementById("closePopup");
    const selectedItemsDiv = document.getElementById("selectedItems");
    const totalPriceSpan = document.getElementById("totalPrice");
    const quantityInput = document.getElementById("quantity");
    const orderForm = document.getElementById("orderForm");

    let selectedItems = [];

    // Function to open the popup
    function openPopup() {
        selectedItemsDiv.innerHTML = ""; // Clear previous items
        let totalPrice = 0;

        // Display selected items in the popup
        selectedItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.name} - ${item.price} birr`;
            selectedItemsDiv.appendChild(itemDiv);
            totalPrice += item.price;
        });

        // Update total price
        totalPriceSpan.textContent = `${totalPrice * parseInt(quantityInput.value)} birr`;
        popupModal.style.display = "block";
    }

    // Function to close the popup
    function closePopupHandler() {
        popupModal.style.display = "none";
        selectedItems = []; // Clear selected items
    }

    // Event listener for order buttons
    orderButtons.forEach(button => {
        button.addEventListener("click", function () {
            const foodItem = button.closest(".food-item");
            const itemName = foodItem.querySelector("h3").textContent;
            const itemPrice = parseInt(foodItem.querySelector(".price").textContent);
            const isChecked = foodItem.querySelector(".item-checkbox").checked;

            if (isChecked) {
                selectedItems.push({ name: itemName, price: itemPrice });
                openPopup();
            } else {
                alert("Please select an item by checking the checkbox.");
            }
        });
    });

    // Event listener for quantity change
    quantityInput.addEventListener("input", function () {
        const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0) * parseInt(quantityInput.value);
        totalPriceSpan.textContent = `${totalPrice} birr`;
    });

    // Event listener for form submission
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const userName = document.getElementById("userName").value;
        const quantity = parseInt(quantityInput.value);
        const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0) * quantity;

        alert(`Thank you, ${userName}! Your order for ${quantity} item(s) totaling ${totalPrice} birr has been placed.`);
        closePopupHandler();
    });

    // Event listener for closing the popup
    closePopup.addEventListener("click", closePopupHandler);
    window.addEventListener("click", function (e) {
        if (e.target === popupModal) {
            closePopupHandler();
        }
    });
});

  