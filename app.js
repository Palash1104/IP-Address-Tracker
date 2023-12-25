var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Search for an IP address')
    .openPopup();

const api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_irsDLniEjJCvet2oS1KvQQNuwPHxY"

const input = document.getElementById("input");
const submit = document.getElementById("submit");
const error = document.getElementById("error");
const image = document.getElementById("image");

const ipAddress = document.getElementById("ipAddress");
const place = document.getElementById("place");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

submit.disabled = true;

input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9.]/g, '');

    if (input.value.length >= 13) {
        submit.disabled = false;
        image.classList.remove("opacity-50");
        image.classList.add("opacity-100");
    } else {
        submit.disabled = true;
        image.classList.remove("opacity-100");
        image.classList.add("opacity-50");

        input.addEventListener("keyup", async (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                await trackIP();
            }
        });
    }
})

submit.addEventListener("click", trackIP);

async function trackIP() {

    const info = api + "&ipAddress=" + input.value;
    const response = await fetch(info);
    var data = await response.json();

    console.log(data);

    if (data.ip == undefined) {
        error.classList.remove("hidden");
    } else {
        error.classList.add("hidden");
    }

    ipAddress.innerHTML = data.ip;
    place.innerHTML = data.location.region;
    timezone.innerHTML = data.location.timezone;
    isp.innerHTML = data.isp;

    const lat = data.location.lat;
    const lng = data.location.lng;

    map.setView([lat, lng], 13);
    marker = L.marker([lat, lng]).addTo(map).bindPopup("You are in " + data.location.city + ", " + data.location.country).openPopup();
}



