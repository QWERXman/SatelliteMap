
const apiToken = 'pk.eyJ1IjoicXdlcnhtYW4iLCJhIjoiY2s5emh6ejBpMDZyNjNncnRnd2h3Y3d3NSJ9.OwZ8HNBGEH3hoCiryTYpbQ'

const map = L.map('mapid').setView([50.505, 30.57], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiToken
}).addTo(map);
const iconSize = L.point(32, 32);

class Satellite {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    addToMap() {
        const point = L.point(this.x, this.y);
        const satelliteIcon = L.icon({
            iconUrl: 'satelliteIcon.svg',
            iconAnchor: point,
            iconSize: iconSize,
            className: 'satellite-icon'
        });

        L.circle([this.x, this.y], {radius: this.radius}).addTo(map);
        L.marker([this.x, this.y], {icon: satelliteIcon}).addTo(map);
    }
}

const satellitesList = [
    {x: 10, y: 10, radius: 1000000},
    {x: 13, y: 20, radius: 500000},
    {x: 20, y: 40, radius: 20000},
    {x: 50, y: 60, radius: 200000},
    {x: 30, y: 10, radius: 1000000},
]

satellitesList.forEach(satellite => {
    new Satellite(satellite.x, satellite.y, satellite.radius).addToMap();
})