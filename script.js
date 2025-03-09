const cars = [
    { name: "Toyota Corolla", mpg: 30, tax: 150, insuranceGroup: 10, img: "toyota-corolla.jpg" },
    { name: "Honda Civic", mpg: 32, tax: 120, insuranceGroup: 12, img: "honda-civic.jpg" }
];

// Populate car dropdown
const carSelect = document.getElementById("car-select");
cars.forEach((car, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = car.name;
    carSelect.appendChild(option);
});

// Update car details when selected
carSelect.addEventListener("change", () => {
    const selectedCar = cars[carSelect.value];
    if (selectedCar) {
        document.getElementById("car-mpg").textContent = selectedCar.mpg;
        document.getElementById("car-tax").textContent = selectedCar.tax;
        document.getElementById("car-insurance").textContent = selectedCar.insuranceGroup;
        const carImage = document.getElementById("car-image");
        carImage.src = selectedCar.img;
        carImage.hidden = false;
    }
});

// Handle form submission
document.getElementById("cost-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const age = parseInt(document.getElementById("age").value);
    const mileage = parseInt(document.getElementById("mileage").value);
    const selectedCar = cars[carSelect.value];

    // Validate input
    if (!selectedCar) {
        alert("Please select a car.");
        return;
    }
    if (isNaN(age) || age < 18 || age > 100) {
        alert("Please enter a valid age (18-100).");
        return;
    }
    if (isNaN(mileage) || mileage < 500) {
        alert("Please enter a valid mileage (minimum 500).");
        return;
    }

    // Calculate estimated costs
    const fuelCostPerMile = 5.50 / selectedCar.mpg; // Example fuel price per gallon: £5.50
    const annualFuelCost = fuelCostPerMile * mileage;
    const totalCost = annualFuelCost + selectedCar.tax + (selectedCar.insuranceGroup * 50); // Example insurance factor

    document.getElementById("result").innerHTML = `
        <h2>Estimated Annual Running Costs</h2>
        <p>Fuel Cost: £${annualFuelCost.toFixed(2)}</p>
        <p>Road Tax: £${selectedCar.tax}</p>
        <p>Insurance Estimate: £${(selectedCar.insuranceGroup * 50).toFixed(2)}</p>
        <p><strong>Total: £${totalCost.toFixed(2)}</strong></p>
    `;
});