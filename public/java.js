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

document.getElementById('tiktokBtn').addEventListener('click', function() {
  window.location.href = 'https://www.tiktok.com/@qhairulpratama?_t=ZS-90x9lWBVmYW&_r=1';
});

document.getElementById('YTBtn').addEventListener('click', function() {
  window.location.href = 'https://youtube.com/@craft7yt332?si=AVXAWvopU-UJeDqs';
});

document.getElementById('IgBtn').addEventListener('click', function() {
  window.location.href = 'https://www.instagram.com/rullznpc?igsh=MWVlZG9tMHA3dWQ4eg==';
});






const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const bar = document.getElementById("bar");
    const progress = document.getElementById("progress");

    // play / pause toggle
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    // ubah ikon tombol
    audio.addEventListener("play", () => {
      playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    });
    audio.addEventListener("pause", () => {
      playBtn.innerHTML = '<i class="fa fa-play"></i>';
    });

    // update progress bar
    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      bar.style.width = percent + "%";
    });

    // klik progress untuk seek
    progress.addEventListener("click", (e) => {
      const rect = progress.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = offsetX / rect.width;
      audio.currentTime = percent * audio.duration;
    });
    
    
    
    
    
    
    
    
    
    
    fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
      .then(res => res.json())
      .then(data => {
        const g = data.Infogempa.gempa;
        document.getElementById("gempa").innerHTML =`
 <div class="tempatGempa">
    <img src="https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}" width="50%">
<div class="agarTidakKesamping">
  <p><div class="font-text" style="font-family: 'Fredoka One', cursive; margin-left:20px;">EARTHQUAKE</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>MAGNITUDE:</b> ${g.Magnitude}</div>
  </p>
  <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>TANGGAL:</b> ${g.Tanggal}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>JAM:</b> ${g.Jam}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>Coordinates:</b> ${g.Coordinates}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>LINTANG: ${g.Lintang}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>BUJUR:</b> ${g.Bujur}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>KEDALAMAN:</b> ${g.Kedalaman}</div>
  </p>
    </div>
 </div>
        `;
 document.getElementById('dirasakan').innerHTML=`  <div class="agarTidakKesamping">
 <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>WILAYAH:</b> ${g.Wilayah}</div>
  </p>
 <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;"><b>DIRASAKAN:</b> ${g.Dirasakan}</div>
  </p></div>`;
        })
      .catch(err => {
        document.getElementById("gempa").innerText = "Gagal memuat data BMKG.";
        console.error(err);
      });
        
        
const usernameNya = `https://endernet.web.id/tikstalk?username=qhairulpratama`;

fetch(usernameNya)
  .then(res => res.json())
  .then(json => {
    const user = json.data.data.user;
    const stats = json.data.data.stats;
    
    // Handle bioLink yang mungkin tidak ada
    const bioLink = user.bioLink ? user.bioLink.link : "";
    
    document.getElementById("profile").innerHTML = `<center><p>${user.nickname}</p>
   <div class="ttprofile">
    <img src="${user.avatarLarger}" style="width:100%">
   </div>    
<div style="color:white;">
  <p>@${user.uniqueId}</p>
    </div></center>
 <div style="justify-content:center; text-align:center; align-items: center;">
  <div style="display:flex; width:96%; font-family: 'Patrick Hand', cursive;justify-content:center; text-align:center; align-items: center;">
     <div style="color:white; margin:5px;">
     <p>Mengikuti</p>
     <p>${stats.followingCount}</p>
     </div>
    <div style="color:white; margin:5px;">
       <p>Pengikut</p>
       <p>${stats.followerCount}</p>
    </div>
    <div style="color:white; margin:5px;">
      <p>Suka</p>
      <p>${stats.heartCount}</p>
    </div>
    <div style="color:white; margin:5px;">
      <p>Video</p>
      <p>${stats.videoCount}</p>
    </div>
   </div>
    </div>
    
    <div style="justify-content:center; text-align:center; align-items: center; display:flex;">
     <div style=" font-family: 'Patrick Hand', cursive; max-width:200px; width:95%">
     <p>${user.signature}</p>
     <p>${bioLink}</p>
     </div>
    </div>`;
  })
  .catch(err => {
    document.getElementById("profile").innerHTML = "Gagal memuat data 😢";
    console.error(err);
  });
        
        
        
        
        