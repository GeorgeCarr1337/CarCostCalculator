const cars = [
    { name: "Ford Fiesta", mpg: 40, tax: 145, insuranceGroup: 5, img: "images/ford-fiesta.jpg" },
    { name: "Vauxhall Corsa", mpg: 45, tax: 130, insuranceGroup: 6, img: "images/vauxhall-corsa.jpg" },
    { name: "Volkswagen Polo", mpg: 48, tax: 150, insuranceGroup: 8, img: "images/vw-polo.jpg" },
    { name: "Renault Clio", mpg: 50, tax: 135, insuranceGroup: 7, img: "images/renault-clio.jpg" },
    { name: "Peugeot 208", mpg: 52, tax: 120, insuranceGroup: 9, img: "images/peugeot-208.jpg" },
    { name: "Mini Cooper", mpg: 38, tax: 160, insuranceGroup: 12, img: "images/mini-cooper.jpg" },
    // Sports Cars
    { name: "Mazda MX-5", mpg: 35, tax: 180, insuranceGroup: 25, img: "images/mazda-mx5.jpg" },
    { name: "Ford Mustang (EcoBoost)", mpg: 28, tax: 290, insuranceGroup: 35, img: "images/ford-mustang.jpg" },
    // Supercars
    { name: "Lamborghini Huracán", mpg: 15, tax: 570, insuranceGroup: 50, img: "images/lamborghini-huracan.jpg" },
    { name: "Ferrari 488 GTB", mpg: 18, tax: 600, insuranceGroup: 50, img: "images/ferrari-488.jpg" }
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
