let map;
let trips = JSON.parse(localStorage.getItem("trips")) || [];
const geocoder = new google.maps.Geocoder();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default: New York
        zoom: 5,
    });

    loadTrips();
}

function loadTrips() {
    trips.forEach(trip => {
        addMarker(trip);
    });
}

function addMarker(trip) {
    geocoder.geocode({ address: trip.location }, function (results, status) {
        if (status === "OK") {
            let marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: trip.fish,
            });

            let infoWindow = new google.maps.InfoWindow({
                content: `<strong>${trip.fish}</strong><br>
                          <b>Date:</b> ${trip.date}<br>
                          <b>Location:</b> ${trip.location}<br>
                          <b>Weight:</b> ${trip.weight} kg`
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        }
    });
}

document.getElementById("addTrip").addEventListener("click", function () {
    let date = document.getElementById("tripDate").value;
    let location = document.getElementById("location").value.trim();
    let fish = document.getElementById("fishSpecies").value;
    let weight = document.getElementById("weight").value;

    if (!date || !location || !fish || !weight) {
        alert("Please fill in all fields!");
        return;
    }

    let newTrip = { date, location, fish, weight };
    trips.push(newTrip);
    localStorage.setItem("trips", JSON.stringify(trips));
    
    addMarker(newTrip);
});
