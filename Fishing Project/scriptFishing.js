let trips = JSON.parse(localStorage.getItem("trips")) || [];

const fishingElements = {
    tripDate: document.getElementById("tripDate"),
    locationInput: document.getElementById("location"),
    fishSpecies: document.getElementById("fishSpecies"),
    weightInput: document.getElementById("weight"),
    addTripBtn: document.getElementById("addTrip"),
    tripList: document.getElementById("tripList"),
    clearTripsBtn: document.getElementById("clearTrips"),
    fishImageContainer: document.getElementById("fishImageContainer"),
};

document.addEventListener("DOMContentLoaded", () => {
    function saveTrips() {
        try {
            localStorage.setItem("trips", JSON.stringify(trips));
        } catch (e) {
            console.error("Could not save trips to localStorage", e);
        }
    }

    function displayTrips() {
        fishingElements.tripList.innerHTML = "";
        trips.forEach((trip, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="trip-info">
                    <span>${trip.date} - <b>${trip.location}</b> caught a <b>${trip.fish}</b> weighing <b>${trip.weight} kg</b></span>
                    <img src="${trip.image}" alt="${trip.fish}" class="fish-icon">
                </div>
                <button class="delete-btn" data-index="${index}">
                    <img src="fishImages/recycle-bin.png" alt="Delete" width="25" height="25">
                </button>
            `;
            fishingElements.tripList.appendChild(li);
        });
    }

    fishingElements.tripList.addEventListener("click", (e) => {
        if (e.target.closest(".delete-btn")) {
            const index = e.target.closest(".delete-btn").dataset.index;
            trips.splice(index, 1);
            saveTrips();
            displayTrips();
        }
    });

    fishingElements.addTripBtn.addEventListener("click", () => {
        if (
            !fishingElements.tripDate.value ||
            !fishingElements.locationInput.value.trim() ||
            !fishingElements.fishSpecies.value ||
            !fishingElements.weightInput.value
        ) {
            alert("Please fill in all fields!");
            return;
        }

        const selectedOption = fishingElements.fishSpecies.options[fishingElements.fishSpecies.selectedIndex];
        const imgSrc = selectedOption.getAttribute("data-img");

        trips.push({
            date: fishingElements.tripDate.value,
            location: fishingElements.locationInput.value.trim(),
            fish: fishingElements.fishSpecies.value,
            weight: fishingElements.weightInput.value,
            image: imgSrc,
        });

        saveTrips();
        displayTrips();

        fishingElements.tripDate.value = "";
        fishingElements.locationInput.value = "";
        fishingElements.fishSpecies.value = "";
        fishingElements.weightInput.value = "";
        fishingElements.fishImageContainer.innerHTML = "";
    });

    fishingElements.clearTripsBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all trips?")) {
            trips = [];
            saveTrips();
            displayTrips();
        }
    });

    fishingElements.fishSpecies.addEventListener("change", function () {
        const selectedOption = this.options[this.selectedIndex];
        const imgSrc = selectedOption.getAttribute("data-img");

        fishingElements.fishImageContainer.innerHTML = "";
        const fishImage = document.createElement("img");
        fishImage.src = imgSrc;
        fishImage.alt = selectedOption.text;
        fishImage.width = 400;
        fishImage.height = 200;
        fishingElements.fishImageContainer.appendChild(fishImage);
    });

    displayTrips();
});
