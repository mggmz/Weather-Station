import { firebaseConfig } from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

// ====== Gráfica =========
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Temperatura (°C)",
      data: [],
      borderWidth: 2,
      tension: 0.3
    },{
      label: "Humedad (%)",
      data: [],
      borderWidth: 2,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// ====== Suscripción realtime =========
const DEVICE_ID = "PON_AQUÍ_EL_DEVICE_ID";
const path = `/estacion/${DEVICE_ID}`;
firebase.database().ref(path).limitToLast(50).on("child_added", snap => {
  const { temp, hum, ts } = snap.val();
  // update cards
  document.getElementById("tempNow").textContent = `${temp.toFixed(1)} °C`;
  document.getElementById("humNow").textContent  = `${hum.toFixed(1)} %`;
  // push to chart
  const tLabel = new Date(ts * 1000).toLocaleTimeString();
  chart.data.labels.push(tLabel);
  chart.data.datasets[0].data.push(temp);
  chart.data.datasets[1].data.push(hum);
  // keep last 20 points
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets.forEach(d => d.data.shift());
  }
  chart.update();
});