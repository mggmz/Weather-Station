import { firebaseConfig } from "./firebaseConfig.js";   // if you externalised it
// const firebaseConfig = { ... };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ——--- EDIT ONLY THESE TWO CONSTANTS ---------------------
const DEVICE_ID = "3a0025000947313037363132";           //  <-- tu Photon
const PATH_PREFIX = "/estacion";                         //  
// ——----------------------------------------------------

const ref = db.ref(`${PATH_PREFIX}/${DEVICE_ID}`).limitToLast(50);

const $tempNow = document.getElementById("tempNow");
const $humNow  = document.getElementById("humNow");

const ctx  = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: { labels: [], datasets: [
    { label:"Temp (°C)", data:[], borderWidth:2, tension:0.3 },
    { label:"Hum  (%)", data:[], borderWidth:2, tension:0.3 }
  ] },
  options:{ responsive:true, scales:{ y:{ beginAtZero:true } } }
});

// Realtime listener
ref.on("child_added", snap => {
  const { temp, hum, ts } = snap.val();
  if (temp == null || hum == null) return;   

  // tarjetas
  $tempNow.textContent = `${temp.toFixed(1)} °C`;
  $humNow.textContent  = `${hum.toFixed(1)} %`;

  // gráfica
  const label = new Date(ts*1000).toLocaleTimeString();
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(temp);
  chart.data.datasets[1].data.push(hum);

  // solo últimos 20 puntos
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
});