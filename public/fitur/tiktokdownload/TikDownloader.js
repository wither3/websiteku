// === Sidebar ===
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

// === TikTok Downloader ===
const goBtn = document.getElementById('go');
const urlInput = document.getElementById('url');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

goBtn.addEventListener('click', async () => {
  resultEl.innerHTML = '';
  const userUrl = urlInput.value.trim();
  if (!userUrl) {
    statusEl.textContent = 'Masukkan link TikTok terlebih dahulu.';
    return;
  }

  statusEl.textContent = 'Mengambil data...';
  const apiUrl = '/tiktok?url=' + encodeURIComponent(userUrl);

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const tipe = data.tipe || (data.slide && data.slide.length ? 'slide' : 'video');
    statusEl.textContent = `Tipe terdeteksi: ${tipe}`;

    // ======== TIKTOK VIDEO ========
    if (tipe === 'video') {
      const videoUrl = data.video?.play || data.video?.wmplay || '';
      const audioUrl = data.music?.play || data.music?.audio_url || '';

      const munculkanHasil = `
<div class="kotak2">
  <div class="bagianProfile">
    <div style="
      background-image: url('${data.author?.avatar}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 2px solid #95f5ff;
    "></div>
    
  <div style="width:150px; padding-top:5px;">
   <p>${data.author.nickname}</p>
   <p>@${data.author.username}</p>
   </div>
   
  </div>

  <video controls width="320" style="border-radius:10px; display:block;">
    <source src="${data.backup.videoSD}" type="video/mp4">
  </video>
<div style="display:flex; text-align:center;
  align-items: center;
  justify-content: center;">
  <div style="margin-left:5px; margin-right:5px; display:flex;">
   <svg width="20px" height="20px" viewBox="0 0 24 24" style="margin-left:2px;" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
  <p>${data.statistik.views}</p>
  </div>
 <div style="margin-left:5px; margin-right:5px; display:flex;">
   <svg width="18px" height="18px" viewBox="0 -0.5 21 21" style="margin-left:2px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>like [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -760.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M203,620 L207.200006,620 L207.200006,608 L203,608 L203,620 Z M223.924431,611.355 L222.100579,617.89 C221.799228,619.131 220.638976,620 219.302324,620 L209.300009,620 L209.300009,608.021 L211.104962,601.825 C211.274012,600.775 212.223214,600 213.339366,600 C214.587817,600 215.600019,600.964 215.600019,602.153 L215.600019,608 L221.126177,608 C222.97313,608 224.340232,609.641 223.924431,611.355 L223.924431,611.355 Z" id="like-[#ffffff]"> </path> </g> </g> </g> </g></svg>   
      <p>${data.statistik.likes}</p>
 </div> 
 
 <div style="margin-left:5px; margin-right:5px; display:flex; padding-top:3px;">
     
 <svg width="17px" height="17px" viewBox="0 0 32 32" style="margin-left:2px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment 5</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -257.000000)" fill="#ffffff"> <path d="M388.667,257 L367.333,257 C364.388,257 362,259.371 362,262.297 L362,279.187 C362,282.111 364.055,284 367,284 L373.639,284 L378,289.001 L382.361,284 L389,284 C391.945,284 394,282.111 394,279.187 L394,262.297 C394,259.371 391.612,257 388.667,257" id="comment-5" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>    
 <p>${data.statistik.komentar}<p>
     </div>
     
     <div style="margin-left:5px; margin-right:5px; display:flex; padding-top:3px;">
     <svg width="17px" height="17px" viewBox="0 0 16 16" style="margin-left:2px;" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C12.6569 6 14 4.65685 14 3C14 1.34315 12.6569 0 11 0C9.34315 0 8 1.34315 8 3C8 3.22371 8.02449 3.44169 8.07092 3.65143L4.86861 5.65287C4.35599 5.24423 3.70652 5 3 5C1.34315 5 0 6.34315 0 8C0 9.65685 1.34315 11 3 11C3.70652 11 4.35599 10.7558 4.86861 10.3471L8.07092 12.3486C8.02449 12.5583 8 12.7763 8 13C8 14.6569 9.34315 16 11 16C12.6569 16 14 14.6569 14 13C14 11.3431 12.6569 10 11 10C10.2935 10 9.644 10.2442 9.13139 10.6529L5.92908 8.65143C5.97551 8.44169 6 8.22371 6 8C6 7.77629 5.97551 7.55831 5.92908 7.34857L9.13139 5.34713C9.644 5.75577 10.2935 6 11 6Z" fill="#ffffff"></path> </g></svg>    
  <p>${data.statistik.share} </p>
  
    </div>
    <div style="margin-left:5px; margin-right:5px; display:flex;">
      <svg width="20px" height="20px" viewBox="0 0 24 24" style="margin-left:2px;" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>  
  <p>${data.statistik.disimpan}</p> 
     </div>
</div>

<div style="display:flex; text-align:center;
  align-items: center;
  justify-content: center;">
   
<button class="tombolDown2" onclick="window.location.href='${data.backup.videoSD}'"><div class="font-text" style="font-family: 'Patrick Hand', cursive;">DOWNLOAD VIDEO</div></button>

<button class="tombolDown2" onclick="window.location.href='${data.backup.videoHD}'"><div class="font-text" style="font-family: 'Patrick Hand', cursive;">DOWNLOAD VIDEO HD</div></button> 

<button class="tombolDown2" onclick="window.location.href='${data.video.wmplay}'"><div class="font-text" style="font-family: 'Patrick Hand', cursive;">DOWNLOAD WATERMARK</div></button>


  </div>
<button class="tombolDown" onclick="window.location.href='${data.backup.mp3}'"><div class="font-text" style="font-family: 'Patrick Hand', cursive;">DOWNLOAD MP3</div></button>

</div>
      `;
      resultEl.innerHTML = munculkanHasil;
    }

    // ======== TIKTOK SLIDE ========
    else if (tipe === 'slide') {
      const slides = data.slide || data.video?.slide || [];
      const audioUrl = data.music?.play || data.music?.audio_url || '';

      const munculkanHasil = `
        <div style="text-align:center; padding:10px;">
          <h3 style="font-family: 'Bebas Neue', cursive;">🖼️ Slide TikTok</h3>
          ${slides.length > 0
            ? slides.map((img, i) => `
                <div style="margin-bottom:15px;">
                  <img src="${img}" width="300" style="border-radius:10px; display:block; margin:auto;">
                  <br>
                  <a href="${img}" target="_blank" style="color:#95f5ff;">Unduh Gambar ${i + 1}</a>
                </div>
              `).join('')
            : '<p>Tidak ada gambar ditemukan.</p>'
          }
          ${audioUrl ? `
            <div style="margin-top:15px;">
              <audio controls src="${audioUrl}"></audio><br>
              <a href="${audioUrl}" target="_blank" style="color:#95f5ff;">Unduh Audio</a>
            </div>
          ` : ''}
          <div style="margin-top:10px; font-size:14px;">
            <b>${data.author?.nickname || 'Unknown'}</b> | 
            ${data.video?.judul || 'Tanpa judul'}
          </div>
        </div>
      `;
      resultEl.innerHTML = munculkanHasil;
    }

    // ======== JIKA TIDAK DIKETAHUI ========
    else {
      resultEl.innerHTML = `
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Terjadi kesalahan: ' + err.message;
  }
});
