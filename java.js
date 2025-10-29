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
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">MAGNITUDE: ${g.Magnitude}</div>
  </p>
  <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">TANGGAL: ${g.Tanggal}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">JAM: ${g.Jam}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">Coordinates: ${g.Coordinates}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">LINTANG: ${g.Lintang}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">BUJUR: ${g.Bujur}</div>
  </p>
   <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">KEDALAMAN: ${g.Kedalaman}</div>
  </p>
    </div>
 </div>
        `;
 document.getElementById('dirasakan').innerHTML=`  <div class="agarTidakKesamping">
 <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">WILAYAH: ${g.Wilayah}</div>
  </p>
 <p><div class="font-text" style="font-family: 'Patrick Hand', cursive;">DIRASAKAN: ${g.Dirasakan}</div>
  </p></div>`;
        })
      .catch(err => {
        document.getElementById("gempa").innerText = "Gagal memuat data BMKG.";
        console.error(err);
      });
        
        
        
        
        
        
        
        