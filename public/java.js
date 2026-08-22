const audio = document.getElementById("bgAudio");
    const playBtn = document.getElementById("playBtnHUD");
    const soundBars = document.getElementById("soundBars");
    const progressBarFill = document.getElementById("progressBarFill");
    const progressBarBg = document.getElementById("progressBarBg");
    const currentTimeElem = document.getElementById("currentTime");
    const totalDurationElem = document.getElementById("totalDuration");

    // Format detik ke format mm:ss
    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Toggle Play / Pause
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerText = "❚❚";
        soundBars.classList.add("playing");
      } else {
        audio.pause();
        playBtn.innerText = "▶";
        soundBars.classList.remove("playing");
      }
    });

    // Update Durasi Total saat Audio Loaded
    audio.addEventListener("loadedmetadata", () => {
      totalDurationElem.innerText = formatTime(audio.duration);
    });

    // Update Progress Bar & Current Time saat Berjalan
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBarFill.style.width = `${progressPercent}%`;
        currentTimeElem.innerText = formatTime(audio.currentTime);
      }
    });

    // Klik pada Progress Bar untuk Seek Audio
    progressBarBg.addEventListener("click", (e) => {
      const rect = progressBarBg.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });

    // Reset saat audio selesai
    audio.addEventListener("ended", () => {
      playBtn.innerText = "▶";
      soundBars.classList.remove("playing");
      progressBarFill.style.width = "0%";
      currentTimeElem.innerText = "00:00";
    });
    
    
 