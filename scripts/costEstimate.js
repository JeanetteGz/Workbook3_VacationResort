"use strict";

// Event listener for the "estimate stay cost" button
document.addEventListener("DOMContentLoaded", function () {
    const priceQuoteForm = document.getElementById("price-quote-form");
    priceQuoteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        calculateCost();
    });
});

// Calculate The Room Rate
function getRoomRate(checkinDate, roomType) {
    if (roomType === "Queen" || roomType === "King" || roomType === "2-Bedroom Suite") {
        const month = new Date(checkinDate).getMonth() + 1;

        // Season Rate
        if (month >= 6 && month <= 8) {
            if (roomType === "Queen") return 250.00;
            else if (roomType === "King") return 250.00;
            else if (roomType === "2-Bedroom Suite") return 350.00;
        } else {
            if (roomType === "Queen") return 150.00;
            else if (roomType === "King") return 150.00;
            else if (roomType === "2-Bedroom Suite") return 210.00;
        }
    }
    return 0;
}

function calculateCost() {
    const checkinDate = document.getElementById("checkin-date").value;
    const roomType = document.querySelector('input[name="room-type"]:checked').value;
    const discount = document.querySelector('input[name="discount"]:checked').value;
    const roomRate = getRoomRate(checkinDate, roomType);

    const adults = parseInt(document.getElementById("adults").value);
    const children = parseInt(document.getElementById("children").value);
    const totalGuests = adults + children;

    let maxOccupancy = 0;
    if (roomType === "Queen") {
        maxOccupancy = 5; // Max Occupancy For Qeen Room
    } else if (roomType === "King") {
        maxOccupancy = 2; // Max Occupancy For King Room
    } else if (roomType === "2-Bedroom Suite") {
        maxOccupancy = 6; // Max Occupancy For 2-Bedroom Suite
    } 

    const costDetails = document.getElementById("cost-details");
    
    if (totalGuests > maxOccupancy) {
        const messageDiv = document.getElementById("messageDiv");
        messageDiv.innerText = "The room you selected will not hold your party.";
        const costDetails = document.getElementById("cost-details");
        costDetails.innerHTML = ""; // Clear the cost details
        return;
    }
        // Continue with the cost calculation logic
        let discountedRoomCost = roomRate;

        if (discount === "AAA/Senior (10%)") {
            discountedRoomCost *= 0.9; // 10% discount
        } else if (discount === "Military (20%)") {
            discountedRoomCost *= 0.8; // 20% discount
        }

        const tax = discountedRoomCost * 0.12;
        const totalCost = discountedRoomCost + tax;

        costDetails.innerHTML = `
            <h2>Stay Cost Details</h2>
            <p>Original Room Cost: $${roomRate.toFixed(2)}</p>
            <p>Discount: ${discount}</p>
            <p>Discounted Room Cost: $${discountedRoomCost.toFixed(2)}</p>
            <p>Tax: $${tax.toFixed(2)}</p>
            <p>Total Cost of Stay: $${totalCost.toFixed(2)}</p>
        `;
    }

// function displayMessage(message) {
//     const messageDiv = document.getElementById("messageDiv");
//     messageDiv.innerText = "The room you selected will not hold your party.";
// }

