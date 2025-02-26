const fishingElements = {
  trips: JSON.parse(localStorage.getItem("trips")) || [],
  tripDate: document.getElementById("tripDate"),
  locationInput: document.getElementById("location"),
  fishSpecies: document.getElementById("fishSpecies"),
  weightInput: document.getElementById("weight"),
  addTripBtn: document.getElementById("addTrip"),
  tripList: document.getElementById("tripList"),
  clearTripsBtn: document.getElementById("clearTrips"),
  fishImageContainer: document.getElementById("fishImageContainer"),
  tripCount: document.getElementById("tripCount"),
  baitInput: document.getElementById("bait"),
};

document.addEventListener("DOMContentLoaded", () => {
  function saveTrips() {
    try {
      localStorage.setItem("trips", JSON.stringify(fishingElements.trips));
    } catch (e) {
      console.error("Could not save trips to localStorage", e);
    }
  }

  function displayTrips() {
    fishingElements.tripList.innerHTML = "";
    fishingElements.trips.forEach((trip, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="trip-info">
          <span>${trip.date} - <b>${trip.location}</b> caught a <b>${trip.fish}</b> weighing <b>${trip.weight} kg</b> on <b>${trip.bait}</b></span>
          <img src="${trip.image}" alt="${trip.fish}" class="fish-icon">
        </div>
        <button class="delete-btn" data-index="${index}">
          <img src="fishImages/recycle-bin.png" alt="Delete" width="25" height="25">
        </button>
      `;
      fishingElements.tripList.appendChild(li);
    });
    fishingElements.tripCount.textContent = fishingElements.trips.length;
  }

  fishingElements.tripList.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
      const index = e.target.closest(".delete-btn").dataset.index;
      fishingElements.trips.splice(index, 1);
      saveTrips();
      displayTrips();
    }
  });

  fishingElements.addTripBtn.addEventListener("click", () => {
    if (
      !fishingElements.tripDate.value ||
      !fishingElements.locationInput.value.trim() ||
      !fishingElements.fishSpecies.value ||
      !fishingElements.weightInput.value ||
      !fishingElements.baitInput.value.trim()
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const selectedOption =
      fishingElements.fishSpecies.options[fishingElements.fishSpecies.selectedIndex];
    const imgSrc = selectedOption.getAttribute("data-img");

    fishingElements.trips.push({
      date: fishingElements.tripDate.value,
      location: fishingElements.locationInput.value.trim(),
      fish: fishingElements.fishSpecies.value,
      weight: fishingElements.weightInput.value,
      image: imgSrc,
      bait: fishingElements.baitInput.value,
    });

    saveTrips();
    displayTrips();

    fishingElements.tripDate.value = "";
    fishingElements.locationInput.value = "";
    fishingElements.fishSpecies.value = "";
    fishingElements.weightInput.value = "";
    fishingElements.baitInput.value = "";
    fishingElements.fishImageContainer.innerHTML = "";
  });

  fishingElements.clearTripsBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all trips?")) {
      fishingElements.trips = [];
      saveTrips();
      displayTrips();
    }
  });
 

  function capitalizeFirstLetter(inputElement) {
    inputElement.value = inputElement.value.charAt(0).toUpperCase() + inputElement.value.slice(1).toLowerCase();
  }

  fishingElements.locationInput.addEventListener("input", () => {
    capitalizeFirstLetter(fishingElements.locationInput);
  });

  fishingElements.fishSpecies.addEventListener("input", () => {
    capitalizeFirstLetter(fishingElements.fishSpecies);
  });

  fishingElements.baitInput.addEventListener("input", () => {
    capitalizeFirstLetter(fishingElements.baitInput);
  });

  displayTrips();
});






