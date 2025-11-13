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
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === FETCH PROFILE VIEWER ===
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
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  popup.querySelector(".close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// === FETCH USER VIDEO ===
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
