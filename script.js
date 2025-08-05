document.addEventListener("DOMContentLoaded", function() {
    let basePrice = 250000;
    let selectedPrices = { model: 0, engine: 0, color: 0, extras: 0 };
    let selectedModel = "series3";
    let currentColor = "white";

    const engines = {
        series3: [
            { name: "BMW 318i 2.0 Benzyna", price: 0 },
            { name: "BMW 320i 2.0 Benzyna", price: 7000 },
            { name: "BMW 325i 2.0 Benzyna", price: 12000 },
            { name: "BMW 330i 2.0 Benzyna", price: 16000 },
            { name: "BMW M3 3.0 Benzyna", price: 45000 }
        ],
        series5: [
            { name: "BMW 520i 2.0 Benzyna", price: 0 },
            { name: "BMW 530i 2.0 Benzyna", price: 15000 },
            { name: "BMW 540i 3.0 Benzyna", price: 25000 },
            { name: "BMW M550i xDrive 4.4 V8", price: 60000 }
        ],
        series7: [
            { name: "BMW 730d 3.0 Diesel", price: 0 },
            { name: "BMW 740i 3.0 Benzyna", price: 20000 },
            { name: "BMW 750i 4.4 V8", price: 40000 },
            { name: "BMW M760Li V12", price: 90000 }
        ]
    };

    function updateEngines(model) {
        const engineContainer = document.getElementById("engine");
        engineContainer.innerHTML = "";
        engines[model].forEach((eng, index) => {
            const btn = document.createElement("button");
            btn.textContent = eng.name;
            btn.setAttribute("data-price", eng.price);
            if (index === 0) btn.classList.add("active");
            btn.addEventListener("click", () => handleSelection("engine", btn));
            engineContainer.appendChild(btn);
        });
        selectedPrices.engine = engines[model][0].price;
    }

    function updatePrice() {
        let extrasTotal = 0;
        document.querySelectorAll("#extras input[type='checkbox']:checked").forEach(chk => {
            extrasTotal += parseInt(chk.getAttribute("data-price"));
        });
        selectedPrices.extras = extrasTotal;

        let total = basePrice + selectedPrices.model + selectedPrices.engine + selectedPrices.color + selectedPrices.extras;
        document.getElementById("total-price").textContent = total;
    }

    function handleSelection(group, element) {
        const price = parseInt(element.getAttribute("data-price"));
        selectedPrices[group] = price;

        if (group === "model") {
            selectedModel = element.getAttribute("data-model");
            updateEngines(selectedModel);
            changeCarImage(selectedModel, currentColor);
        }

        if (group === "color") {
            currentColor = element.getAttribute("data-color");
            changeCarImage(selectedModel, currentColor);
        }

        if (group !== "extras") {
            element.parentElement.querySelectorAll("button, .color-swatch").forEach(el => el.classList.remove("active"));
            element.classList.add("active");
        }

        updatePrice();
    }

    function changeCarImage(model, color) {
        const carImage = document.getElementById("car-image");
        carImage.classList.remove("show");
        setTimeout(() => {
            carImage.src = `img/${model}_${color}.jpg`;
            carImage.classList.add("show");
        }, 300);
    }

    document.querySelectorAll("#model button").forEach(btn => {
        btn.addEventListener("click", () => handleSelection("model", btn));
    });

    document.querySelectorAll("#color .color-swatch").forEach(swatch => {
        swatch.addEventListener("click", () => handleSelection("color", swatch));
    });

    document.querySelectorAll("#extras input[type='checkbox']").forEach(chk => {
        chk.addEventListener("change", () => updatePrice());
    });

    updateEngines(selectedModel);
    updatePrice();
});
