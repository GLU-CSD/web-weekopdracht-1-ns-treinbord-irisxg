function updateClock() {
  const now = new Date();

  // Tijd ophalen
  const hours = now.getHours(); // Uren in 24-uurs formaat
  const minutes = now.getMinutes(); // Minuten
  const seconds = now.getSeconds(); // Seconden


  // Graden berekenen
  const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5); // Uurhoek
  const minuteDegrees = (minutes * 6) + (seconds * 0.1);    // Minutenhoek
  const secondDegrees = seconds * 6;                       // Secondenhoek


  // Wijzers updaten
  document.querySelector('.uur').style.transform = `rotate(${hourDegrees - 90}deg)`;
  document.querySelector('.minuut').style.transform = `rotate(${minuteDegrees - 90}deg)`;
  document.querySelector('.seconden').style.transform = `rotate(${secondDegrees - 90}deg)`;
}

// Init en interval
updateClock();
setInterval(updateClock, 1000);

let currentIndex = 0; // Begin bij de eerste vertrek
let departures = []; // Opslag voor alle vertrektijden

async function fetchNsData() {
  console.log('fetch data');
  try {
    const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=Ut&dateTime=2024-12-05T22:00:00%2B01:00&maxJourneys=20', {
      method: 'GET',
      // Request headers
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '53bcd411f2e04c38b33f6be0afe6676f',
      },
    });

    console.log(response.status);
    const data = await response.text();
    processNsData(data);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

function processNsData(responseText) {
  try {
    const data = JSON.parse(responseText);
    departures = data.payload.departures;

    if (departures.length === 0) {
      console.error("Geen vertrektijden beschikbaar");
      return;
    }

    // Toon de eerste vertrek direct
    updateDeparture(currentIndex);

    // Stel een interval in om elke 10 seconden naar de volgende trein te gaan
    setInterval(() => {
      currentIndex = (currentIndex + 1) % departures.length; // Cirkelt door de lijst
      updateDeparture(currentIndex);
    }, 5000); // 5 seconden interval
  } catch (err) {
    console.error("Fout bij het parsen van de JSON:", err);
  }
}

function updateDeparture(index) {
  const currentDeparture = departures[index];
  const nextIndex = (index + 1) % departures.length; // Volgende vertrek (cyclus)

  // Update de hoofdsectie
  document.querySelector(".tijd").textContent = formatTime(currentDeparture.plannedDateTime);
  document.querySelector(".trein-type").textContent = currentDeparture.product.longCategoryName;
  document.querySelector(".bestemming").textContent = currentDeparture.direction;
  document.querySelector(".station-route").textContent = 
    "via " + (currentDeparture.routeStations.map(station => station.mediumName).join(" , ") || "Geen tussenstations");
  document.querySelector(".spoor-nummer").textContent = currentDeparture.plannedTrack;

  // Update de "hierna" sectie
  const nextDeparture = departures[nextIndex];
  document.querySelector(".hierna").textContent = 
    `Hierna/next: ${formatTime(nextDeparture.plannedDateTime)} ${nextDeparture.trainCategory} ${nextDeparture.direction}`;
}

// Hulpfunctie om tijd te formatteren
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

fetchNsData();  // Eerste keer data ophalen

