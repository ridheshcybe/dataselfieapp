function fetchiss() {
    var api = 'https://api.wheretheiss.at/v1/satellites/25544',
        lat = document.getElementById('lat'),
        lon = document.getElementById('lon');

    var datas = []
    setInterval(() => {
        async function start() {
            const res = await fetch(api),
                data = await res.json(),
                { latitude, longitude } = data;
            console.log('lat: ' + latitude);
            console.log('lon: ' + longitude);

            lat.textContent = latitude;
            lon.textContent = longitude;
            datas.push(latitude)
            L.marker([latitude, longitude], {
                time: Date.now(),
                lat: latitude,
                lon: longitude
            }).addTo(mymap)

        }
        start()
    }, 1000);

}

fetchiss();

var mymap = L.map('mapid').setView([0, 0], 1);
const tileurl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright"></a>'

const tiles = L.tileLayer(tileurl, { attribution })

tiles.addTo(mymap)