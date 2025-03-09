/* jshint esversion: 6 */
// Define an array of car objects with properties: name, mpg, tax, insuranceGroup, and image
const cars = [
    { name: "Ford Fiesta", mpg: 40, tax: 145, insuranceGroup: 5, img: "images/ford-fiesta.jpg" },
    { name: "Vauxhall Corsa", mpg: 45, tax: 130, insuranceGroup: 6, img: "images/vauxhall-corsa.jpg" },
    { name: "Volkswagen Polo", mpg: 48, tax: 150, insuranceGroup: 8, img: "images/vw-polo.jpg" },
    { name: "Renault Clio", mpg: 50, tax: 135, insuranceGroup: 7, img: "images/renault-clio.jpg" },
    { name: "Peugeot 208", mpg: 52, tax: 120, insuranceGroup: 9, img: "images/peugeot-208.jpg" },
    { name: "Mini Cooper", mpg: 38, tax: 160, insuranceGroup: 12, img: "images/mini-cooper.jpg" },
    { name: "Mazda MX-5", mpg: 35, tax: 180, insuranceGroup: 25, img: "images/mazda-mx5.jpg" },
    { name: "Ford Mustang (EcoBoost)", mpg: 28, tax: 290, insuranceGroup: 35, img: "images/ford-mustang.jpg" },
    { name: "Lamborghini Huracán", mpg: 15, tax: 570, insuranceGroup: 50, img: "images/lamborghini-huracan.jpg" },
    { name: "Ferrari 488 GTB", mpg: 18, tax: 600, insuranceGroup: 50, img: "images/ferrari-488.jpg" }
];

// Get elements
const carSelect = document.getElementById("car-select");
const carMpg = document.getElementById("car-mpg");
const carTax = document.getElementById("car-tax");
const carInsurance = document.getElementById("car-insurance");
const carImage = document.getElementById("car-image");
const carDetails = document.getElementById("car-details");

// Ensure dropdown exists before modifying it
if (carSelect) {
    // Populate the car selection dropdown
    cars.forEach((car, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = car.name;
        carSelect.appendChild(option);
    });

    // Update car details when a car is selected
    carSelect.addEventListener("change", () => {
        const selectedIndex = parseInt(carSelect.value, 10);
        const selectedCar = cars[selectedIndex];

        if (selectedCar) {
            carMpg.textContent = selectedCar.mpg;
            carTax.textContent = selectedCar.tax;
            carInsurance.textContent = selectedCar.insuranceGroup;

            if (carImage) {
                carImage.src = selectedCar.img;
                carImage.hidden = false;
            }

            if (carDetails) {
                carDetails.style.display = "block";
            }
        }
    });
}

// Form submission and calculation logic
const costForm = document.getElementById("cost-form");

if (costForm) {
    costForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get user inputs
        const age = parseInt(document.getElementById("age").value, 10);
        const mileage = parseInt(document.getElementById("mileage").value, 10);
        const selectedCarIndex = parseInt(carSelect.value, 10);

        // Validation
        if (isNaN(age) || age < 18 || age > 100) {
            alert("Please enter a valid age between 18 and 100.");
            return;
        }

        if (isNaN(mileage) || mileage < 500) {
            alert("Please enter a valid mileage (minimum 500 miles).");
            return;
        }

        if (isNaN(selectedCarIndex) || selectedCarIndex < 0 || selectedCarIndex >= cars.length) {
            alert("Please select a valid car from the list.");
            return;
        }

        // Retrieve selected car data
        const selectedCar = cars[selectedCarIndex];

        // Fuel cost estimation (assuming petrol price = £1.50 per liter)
        const milesPerLitre = selectedCar.mpg / 4.546;
        const fuelCost = (mileage / milesPerLitre) * 1.50;

        // Insurance cost estimate based on insurance group and age
        const insuranceCost = selectedCar.insuranceGroup * 50 + (100 - age) * 10;

        // Total cost calculation
        const totalCost = fuelCost + selectedCar.tax + insuranceCost;

        // Display the result
        document.getElementById("result").innerHTML = `
            <h3>Estimated Annual Running Costs:</h3>
            <p><strong>Fuel Cost:</strong> £${fuelCost.toFixed(2)}</p>
            <p><strong>Road Tax:</strong> £${selectedCar.tax}</p>
            <p><strong>Insurance Estimate:</strong> £${insuranceCost.toFixed(2)}</p>
            <h2><strong>Total Estimated Cost:</strong> £${totalCost.toFixed(2)}</h2>
        `;
    });
}
