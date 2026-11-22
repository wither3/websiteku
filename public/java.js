/* Sidebar */
function openSidebar(o){
  document.getElementById('sidebar').classList.toggle('open', o);
  document.getElementById('overlay').classList.toggle('show', o);
}
document.getElementById('menu-button').addEventListener('click', () => openSidebar(true));
document.getElementById('close-button').addEventListener('click', () => openSidebar(false));
document.getElementById('overlay').addEventListener('click', () => openSidebar(false));

/* Sosmed */
const links = {
  tiktokBtn: 'https://www.tiktok.com/@qhairulpratama?_t=ZS-90x9lWBVmYW&_r=1',
  YTBtn: 'https://youtube.com/@craft7yt332?si=AVXAWvopU-UJeDqs',
  IgBtn: 'https://www.instagram.com/rullznpc?igsh=MWVlZG9tMHA3dWQ4eg=='
};
Object.keys(links).forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => window.open(links[id], '_blank'));
});

/* Musik */
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const bar = document.getElementById('bar');
const progress = document.getElementById('progress');
if (audio && playBtn) {
  playBtn.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
  audio.addEventListener('play', () => playBtn.innerHTML = '<i class="fa fa-pause"></i>');
  audio.addEventListener('pause', () => playBtn.innerHTML = '<i class="fa fa-play"></i>');
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) bar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  });
  progress.addEventListener('click', e => {
    const rect = progress.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });
}

/* BMKG gempa */
fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
  .then(res => res.json())
  .then(data => {
    const g = data.Infogempa.gempa;
    const row = (label, val) => `<div class="q-row"><b>${label}</b><span>${val}</span></div>`;
    document.getElementById('gempa').innerHTML = `
      <div class="quake">
        <img src="https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}" alt="Shakemap"
             onerror="this.style.display='none'">
        <div class="quake-info">
          <div class="mag">M ${g.Magnitude}</div>
          ${row('Tanggal', g.Tanggal)}
          ${row('Jam', g.Jam)}
          ${row('Kedalaman', g.Kedalaman)}
          ${row('Lintang', g.Lintang)}
          ${row('Bujur', g.Bujur)}
          ${row('Coordinates', g.Coordinates)}
        </div>
      </div>`;
    document.getElementById('dirasakan').innerHTML = `
      <div class="dirasakan"><b style="color:var(--txt)">Wilayah:</b> ${g.Wilayah}<br>
      <b style="color:var(--txt)">Dirasakan:</b> ${g.Dirasakan}</div>`;
  })
  .catch(err => {
    document.getElementById('gempa').innerHTML = '<p class="loading">Gagal memuat data BMKG.</p>';
    console.error(err);
  });

/* Profil TikTok */
fetch('https://endernet.web.id/tikstalk?username=qhairulpratama')
  .then(res => res.json())
  .then(json => {
    const user = json.data.data.user;
    const stats = json.data.data.stats;
    const bioLink = user.bioLink ? user.bioLink.link : '';
    const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : n;
    document.getElementById('profile').innerHTML = `
      <div class="tt-head">
        <img class="tt-avatar" src="${user.avatarLarger}" alt="avatar">
        <div>
          <div class="tt-nick">${user.nickname}</div>
          <div class="tt-user">@${user.uniqueId}</div>
        </div>
      </div>
      <div class="tt-stats">
        <div class="stat"><b>${fmt(stats.followingCount)}</b><span>Mengikuti</span></div>
        <div class="stat"><b>${fmt(stats.followerCount)}</b><span>Pengikut</span></div>
        <div class="stat"><b>${fmt(stats.heartCount)}</b><span>Suka</span></div>
        <div class="stat"><b>${fmt(stats.videoCount)}</b><span>Video</span></div>
      </div>
      <div class="tt-bio">${user.signature || ''}${bioLink ? `<br><a href="${bioLink}" target="_blank" style="color:var(--cyan)">${bioLink}</a>` : ''}</div>`;
  })
  .catch(() => {
    document.getElementById('profile').innerHTML = '<p class="loading">Gagal memuat data profil.</p>';
  });

/* Text mengetik */
const text = 'Selamat datang\ndi website rullzNPC';
const el = document.getElementById('typedText');
const cursor = document.getElementById('cursor');
let i = 0;
(function type() {
  if (i < text.length) {
    const char = text.charAt(i);
    el.innerHTML += char === '\n' ? '<br>' : char;
    i++;
    setTimeout(type, 80);
  } else {
    cursor.classList.add('blink');
  }
})();
