# Meteo Weather Station • Particle Photon × Firebase

Compact IoT weather-station demo: a **Particle Photon** reads temperature & humidity from a **DHT11**, streams the data to **Firebase Realtime Database** through Particle’s native integration, and a lightweight web dashboard built with **HTML + Tailwind CSS + Chart.js** displays everything in real time while an onboard red LED gives local over-temperature alerts.


![Image](https://github.com/user-attachments/assets/913b7c08-3a3f-4e4a-a742-c3bf80b8a71a)

---

##  Contents  

- **firmware/** – Photon source (`weather_station.ino`)  
- **webpanel/** – front-end  
  • `index.html` – markup  
  • `app.js` – Firebase binding + Chart.js logic  
  • `styles.css` – optional tweaks (Tailwind Play CDN covers most styles)  
- **docs/** – report, wiring images, screenshots  

---

##  Prerequisites

| Item | Version / notes |
|------|-----------------|
| Particle Photon | Device OS ≥ 4.0 |
| DHT11 sensor | + 4.7 k Ω pull-up resistor |
| LED (red) | + 220 Ω resistor |
| Firebase project | Realtime Database enabled |
| Node.js & NPM | Required for Firebase CLI |
| Firebase CLI | `npm i -g firebase-tools` |

---

##  Hardware wiring

| Photon pin | Component | Note |
|------------|-----------|------|
| 3V3        | DHT11 VCC |
| D2         | DHT11 DATA | 4.7 k Ω pull-up to 3V3 |
| GND        | DHT11 GND |
| D7         | LED anode | through 220 Ω |
| GND        | LED cathode |

*(see docs/fig1-wiring.png for breadboard view)*

---

##  Quick start

### 1 · Flash the Photon  
cd firmware particle flash <your_device_id> weather_station.ino 


### 2 · Create the Firebase integration  
1. Console Particle → **Cloud services ▸ Integrations ▸ Firebase ▸ New**  
2. **Event name:** `weatherData`  
3. Paste **Project ID** and **Database secret** from Firebase console  
4. *(Advanced)* set **Path:** `/station/{{PARTICLE_DEVICE_ID}}/{{PARTICLE_EVENT_VALUE.ts}}`  
5. Click **Enable integration**

### 3 · Deploy the web dashboard  
cd webpanel firebase login firebase init hosting # choose existing project, use public = . firebase deploy

Open the Hosting URL printed by the CLI to see live charts.

---

##  Screenshots (in docs/)

| File | Description |
|------|-------------|
| fig1-wiring.png | Breadboard view (Photon, DHT11, LED) |
| fig2-integration.png | Particle → Firebase settings |
| fig3-database.png | Realtime DB nodes filling up |
| fig4-dashboard.png | Dashboard with live graph |

---

## 📝 License

Free to use, modify and distribute in the hood; attribution appreciated.
