
async function Data(url) {
  const response = await fetch(url);
  const json = await response.json();
  const i = Math.floor(Math.random() * json.length);
  const img = json[i].image;
  const loc = json[i].location;
  document.getElementById("ok").src = img;
  document.getElementById("latitude").textContent = loc.lat;
  document.getElementById("longitude").textContent = loc.lon;
  console.log(json);
  startmapping(loc.lat,loc.lon)
}
Data("/api");
