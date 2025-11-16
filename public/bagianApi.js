// === FUNGSI COPY ===
function copyJson(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const preElement = element.querySelector('pre');
  const textToCopy = preElement ? preElement.textContent : element.textContent;
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    showCopyFeedback('JSON copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function copyApiLink(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const textToCopy = element.textContent.trim();
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    showCopyFeedback('API URL copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function showCopyFeedback(message) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-size: 14px;
    animation: fadeInOut 2s ease-in-out;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// === FUNGSI FETCH - HARUS DITARUH DI ATAS ===
async function hiiImRullzNPC(){
  const tombol = document.getElementById('fetchBtn');
  const input = document.getElementById('inputnya');
  const apilink = document.getElementById('apilink');
  const nyalakan = document.getElementById('nyalakan');

  const username = input.value.trim();
  if (!username) return alert("Masukkan username TikTok terlebih dahulu!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/tikstalk?username=${username}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "FETCH";
    tombol.style.opacity = "1";
  }
}

async function TIKTOKUSERVIDEO1(){
  const tombol = document.getElementById('fetchVideoBtn');
  const input = document.getElementById('inputVideo');
  const apilink = document.getElementById('apilinkVideo');
  const nyalakan = document.getElementById('nyalakanVideo');

  const username = input.value.trim();
  if (!username) return alert("Masukkan username TikTok terlebih dahulu!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/tikuservideo?username=${username}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "FETCH";
    tombol.style.opacity = "1";
  }
}

async function FACEBOOKDOWNLOAD1(){
  const tombol = document.getElementById('fetchFbBtn');
  const input = document.getElementById('inputFb');
  const apilink = document.getElementById('apilinkFb');
  const nyalakan = document.getElementById('nyalakanFb');

  const link = input.value.trim();
  if (!link) return alert("Masukkan link Facebook terlebih dahulu!");
  if (!link.includes('facebook.com')) return alert("Link harus dari Facebook!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/bagian1/fbdownload?link=${encodeURIComponent(link)}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "DOWNLOAD";
    tombol.style.opacity = "1";
  }
}

async function INSTAGRAMDOWNLOAD1(){
  const tombol = document.getElementById('fetchIgBtn');
  const input = document.getElementById('inputIg');
  const apilink = document.getElementById('apilinkIg');
  const nyalakan = document.getElementById('nyalakanIg');

  const link = input.value.trim();
  if (!link) return alert("Masukkan link Instagram terlebih dahulu!");
  if (!link.includes('instagram.com')) return alert("Link harus dari Instagram!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/bagian1/igdownload?link=${encodeURIComponent(link)}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "DOWNLOAD";
    tombol.style.opacity = "1";
  }
}

async function TIKTOKDOWNLOAD2_1(){
  const tombol = document.getElementById('fetchTt2Btn');
  const input = document.getElementById('inputTt2');
  const apilink = document.getElementById('apilinkTt2');
  const nyalakan = document.getElementById('nyalakanTt2');

  const link = input.value.trim();
  if (!link) return alert("Masukkan link TikTok terlebih dahulu!");
  if (!link.includes('tiktok.com')) return alert("Link harus dari TikTok!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/bagian1/tiktokdownload2?link=${encodeURIComponent(link)}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "DOWNLOAD";
    tombol.style.opacity = "1";
  }
}

async function SPOTIFYDOWNLOAD1(){
  const tombol = document.getElementById('fetchSpotifyBtn');
  const input = document.getElementById('inputSpotify');
  const apilink = document.getElementById('apilinkSpotify');
  const nyalakan = document.getElementById('nyalakanSpotify');

  const link = input.value.trim();
  if (!link) return alert("Masukkan link Spotify terlebih dahulu!");
  if (!link.includes('spotify.com')) return alert("Link harus dari Spotify!");

  tombol.textContent = "Loading...";
  tombol.style.opacity = "0.7";

  const api = `https://endernet.web.id/bagian1/spotify?link=${encodeURIComponent(link)}`;
  try {
    const res = await fetch(api);
    const data = await res.json();
    const jsonRapi = JSON.stringify(data, null, 2);
    nyalakan.innerHTML = `<div class="melayang"><pre><font size="2">${jsonRapi}</font></pre></div>`;
    apilink.innerHTML = `<font size="2">${api}</font>`;
  } catch (error) {
    console.error(error);
    nyalakan.innerHTML = `<p style="color:red;">Gagal memuat data!</p>`;
  } finally {
    tombol.textContent = "DOWNLOAD";
    tombol.style.opacity = "1";
  }
}

// === Sidebar Toggle ===
document.getElementById('menu-button').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('hidden');
});

document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('close-button').addEventListener('click', function() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
});

// === GRAFIK REAL-TIME ===
let serverDataCache = null;

// Setup chart
const chartCanvas = document.createElement('canvas');
chartCanvas.width = 300;
chartCanvas.height = 180;
chartCanvas.style.margin = 'px auto';
chartCanvas.style.display = 'block';

// GANTI chart initialization jadi:
const ctx = chartCanvas.getContext('2d');
chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'CPU Usage %',
                data: [],
                borderColor: '#ff6a6a',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                spanGaps: false,
                stepped: false
            },
            {
                label: 'RAM Usage %', 
                data: [],
                borderColor: '#00eaff',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                tension: 0,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                spanGaps: false,
                stepped: false
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// MAX 7 DATA
const MAX_DATA_POINTS = 5;

// Function update chart
function updateChart(cpuData, ramData, timeLabel) {
    chart.data.labels.push(timeLabel);
    chart.data.datasets[0].data.push(cpuData);
    chart.data.datasets[1].data.push(ramData);
    
    if (chart.data.labels.length > MAX_DATA_POINTS) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }
    
    chart.update();
}

// Fungsi utama yang menggabungkan semuanya
async function updateServerInfo() {
    const api = `https://endernet.web.id/bagian1/serverinfo`;
    try {
        const hasil = await fetch(api);
        const gini = await hasil.json();
        
        // Simpan data untuk digunakan di grafik dan display
        serverDataCache = gini;
        
        // Update display stats
        const datanya = document.getElementById('datanya');
        datanya.innerHTML = `
            <div class="kotak1" style="padding:5px;">
                <center>
                    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">HOSTING STATUS</div>
                    <div style="margin-top:10px;">
                        <p>${gini.cpu.brand}</p>
                        <p>${gini.system.operating_system}</p>
                    </div>
                    
                    <!-- TEMPAT GRAFIK -->
                    <div id="grafikContainer"></div>
                    
                    <div style="display:flex; flex-wrap:wrap; font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold; width:100%; justify-content:center;">
                        <div class="ininya">
                            <p><b>MEMORY</b></p>
                            <p>${gini.memory.used}/ ${gini.memory.free}</p>
                        </div>
                        <div class="ininya">
                            <p><b>CPU</b></p>
                            <p>${gini.cpu.usage_percent}</p>
                        </div>
                        <div class="ininya">
                            <p><b>UPTIME</b></p>
                            <p>${gini.system.uptime}</p>
                        </div>
                        <div class="ininya">
                            <p><b>NODE JS</b></p>
                            <p>${gini.process.node_version}</p>
                        </div>
                    </div>
                </center>
            </div>
        `;
        
        // Tambahkan grafik ke container
        document.getElementById('grafikContainer').appendChild(chartCanvas);
        
        // Update grafik dengan data terbaru
        const cpuPercent = parseFloat(gini.cpu.usage_percent);
        const ramPercent = parseFloat(gini.memory.usage_percent);
        const time = new Date().toLocaleTimeString('id-ID', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit', 
            second: '2-digit'
        });
        
        updateChart(cpuPercent, ramPercent, time);
        
    } catch(e) {
        console.log(e);
    }
}

// Jalankan sekali saja
setInterval(updateServerInfo, 1000);

// === POPUP PROFILE VIEWER ===
function buatPopup() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">TIKTOK PROFILE VIEWER</div>
    <font size="2">Masukkan username TikTok di bawah:</font>
    <input id="inputnya" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;">
    <div id="fetchBtn" class="tombolget" style="margin-top:2px;" onclick="hiiImRullzNPC()">FETCH</div>
    <p>Response:</p>
    <div id="nyalakan"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilink"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakan')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilink')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === POPUP USER VIDEO ===
function TIKTOKUSERVIDEO() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">TIKTOK USER VIDEO</div>
    <font size="2">Masukkan username TikTok di bawah:</font>
    <input id="inputVideo" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;">
    <div id="fetchVideoBtn" class="tombolget" style="margin-top:2px;" onclick="TIKTOKUSERVIDEO1()">FETCH</div>
    <p>Response:</p>
    <div id="nyalakanVideo"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilinkVideo"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakanVideo')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilinkVideo')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === POPUP FACEBOOK DOWNLOAD ===
function FACEBOOKDOWNLOAD() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">FACEBOOK VIDEO DOWNLOAD</div>
    <font size="2">Masukkan link Facebook di bawah:</font>
    <input id="inputFb" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;" placeholder="https://www.facebook.com/share/v/...">
    <div id="fetchFbBtn" class="tombolget" style="margin-top:2px;" onclick="FACEBOOKDOWNLOAD1()">DOWNLOAD</div>
    <p>Response:</p>
    <div id="nyalakanFb"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilinkFb"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakanFb')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilinkFb')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === POPUP INSTAGRAM DOWNLOAD ===
function INSTAGRAMDOWNLOAD() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">INSTAGRAM DOWNLOAD</div>
    <font size="2">Masukkan link Instagram di bawah:</font>
    <input id="inputIg" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;" placeholder="https://www.instagram.com/reel/...">
    <div id="fetchIgBtn" class="tombolget" style="margin-top:2px;" onclick="INSTAGRAMDOWNLOAD1()">DOWNLOAD</div>
    <p>Response:</p>
    <div id="nyalakanIg"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilinkIg"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakanIg')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilinkIg')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === POPUP TIKTOK DOWNLOAD 2 ===
function TIKTOKDOWNLOAD2() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">TIKTOK DOWNLOAD 2</div>
    <font size="2">Masukkan link TikTok di bawah:</font>
    <input id="inputTt2" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;" placeholder="https://vt.tiktok.com/...">
    <div id="fetchTt2Btn" class="tombolget" style="margin-top:2px;" onclick="TIKTOKDOWNLOAD2_1()">DOWNLOAD</div>
    <p>Response:</p>
    <div id="nyalakanTt2"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilinkTt2"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakanTt2')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilinkTt2')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === POPUP SPOTIFY DOWNLOAD ===
function SPOTIFYDOWNLOAD() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <span class="close-btn">&times;</span>
    <div style="font-family: 'BBH Sans Bogle', sans-serif; font-weight: bold;">SPOTIFY DOWNLOAD</div>
    <font size="2">Masukkan link Spotify di bawah:</font>
    <input id="inputSpotify" style="background-color:#f3f3f3; border:1px solid black; border-radius:3px; width:100%; height:30px;" placeholder="https://open.spotify.com/track/...">
    <div id="fetchSpotifyBtn" class="tombolget" style="margin-top:2px;" onclick="SPOTIFYDOWNLOAD1()">DOWNLOAD</div>
    <p>Response:</p>
    <div id="nyalakanSpotify"></div>
    <p>Api Link</p>
    <div class="hitam"><div id="apilinkSpotify"></div></div>
    <div style="display:flex; gap:5px; margin-top:5px;">
      <button class="copy-btn" onclick="copyJson('nyalakanSpotify')">Copy JSON</button>
      <button class="copy-btn" onclick="copyApiLink('apilinkSpotify')">Copy API URL</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}