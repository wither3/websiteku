fetch('/bagian1?api=ttuserinfo')
  .then(res => res.json())
  .then(data => {
  const user = data.data.userInfo.user;
  const dataF = data.data.userInfo;
    const nama = data.data.userInfo.user.nickname;
    document.getElementById('ttBox').innerHTML = `<center>
    <div class="kini">
      <div class="kotakIni">
          <div class="ttprofilee">
        <img src="${user.avatarLarger}"></div>
      <div class="bagianUsername"><p>@qhairulpratama</p></div>
      <div class="namaTiktok">
        <p>${nama}</p>
      </div>
      
      <div class="kotakFlexx">
       <div class="kotakData">
       <p>Mengikuti</p>
       <p>${dataF.statsV2.followingCount}</p>
       </div>
       <div class="kotakData">
       <p>Pengikut</p>
       <p>${dataF.statsV2.followerCount}</p>
       </div>
       <div class="kotakData">
       <p>Like</p>
       <p>${dataF.statsV2.heartCount}</p>
       </div>
       <div class="kotakData">
       <p>Video</p>
       <p>${dataF.statsV2.videoCount}</p>
       </div>
       
      </div>
      
      <p>${dataF.user.signature}</p>
      
      
      </div>
    </div>
    </center>
    `;
  })
  .catch(err => console.error('Gagal fetch ttuserinfo:', err));
  
 
 
 
 
 
 
 
 
 
 // Variabel global
let allPostsData = [];

// Fungsi untuk membuat HTML satu postingan
function createPostHTML(post) {
    // Perhatikan: Saya menambahkan onclick="openModal('${post.url}')" pada img src="${post.url}"
    return `
    <center>
        <div class="kotakPost">
            <div class="profilAtas">
                <div class="profilAtass">
                    <div style="display:flex;">
                        <img src="${post.fotoProfil}" style="border-radius:5px; width:14%; margin-left:5px;">
                        <div class="tempatNama">
                            <p>${post.nama}</p>
                            <font color="#a0a0a0">
                                <p>${post.nomor}</p>
                            </font>
                        </div>
                        <div class="tenpatTanggal">
                            <p>${post.tanggal}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- GAMBAR POSTINGAN DENGAN EVENT ONCLICK -->
            <img src="${post.url}" 
                 height="200px" 
                 style="width:100%; object-fit:cover; cursor:pointer;" 
                 onclick="openModal('${post.url}')"
                 title="Klik untuk melihat penuh">
            
            <div class="tempatDeskripsi">
                <p>${post.deskripsi}</p>
            </div>
        </div>
    </center>
    <br>`;
}

// --- FUNGSI POPUP MODAL ---

// Fungsi Buka Modal
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgPopup");
    
    modal.style.display = "flex"; // Gunakan flex agar posisi tengah
    modalImg.src = imageSrc;
}

// Fungsi Tutup Modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// --- LOGIKA FETCH DATA (Sama seperti sebelumnya) ---

fetch('https://asfinix.my.id/bagian1/posts')
    .then(res => res.json())
    .then(data => {
        allPostsData = data;
        const container = document.getElementById('postingan');
        
        if (!container) return;

        // Tampilkan 3 pertama
        const initialPosts = data.slice(0, 3);
        let htmlContent = "";
        initialPosts.forEach(post => {
            htmlContent += createPostHTML(post);
        });
        container.innerHTML = htmlContent;

        // Tombol Lihat Semua
        if (data.length > 3) {
            if (!document.getElementById('btnLihatSemua')) {
                const btn = document.createElement("button");
                btn.id = "btnLihatSemua";
                btn.innerText = "Klik untuk lihat semua postingan";
                btn.style.cssText = "display:block; margin: 20px auto; padding: 10px 20px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;";
                
                btn.onclick = function() {
                    const remainingPosts = data.slice(3);
                    let remainingHtml = "";
                    remainingPosts.forEach(post => {
                        remainingHtml += createPostHTML(post);
                    });
                    container.innerHTML += remainingHtml;
                    this.remove(); 
                };
                container.parentNode.insertBefore(btn, container.nextSibling);
            }
        }
    })
    .catch(err => {
        console.error("Gagal mengambil data:", err);
        document.getElementById('postingan').innerHTML = "<p>Gagal memuat postingan.</p>";
    });
    

  
  
  
  
  
  
  fetch('https://endernet.web.id/bagian1?api=maptambakudangdanikan')
  .then(res => res.json())
  .then( data =>{
  const mapJava = data.datany.mapTambakJava;
  const mapBedrock = data.datany.mapTambakBedrock;
  document.getElementById("mapDl").innerHTML =`<br>
<div class="mdeskri">
    <p> Version: ${data.datany.version} </p>
    <p> Date: ${data.datany.update} </p>
   </div>
   
    <div class="owp">
        <button onclick="window.open('${mapJava}','_blank')"class="btn-warship btn-orange btn-full">DOWNLOAD MAP JAVA</button></div>
        <div class="owp">
        <button onclick="window.open('${mapBedrock}','_blank')"class="btn-warship btn-orange btn-full">DOWNLOAD MAP BEDROCK</button></div>
 `;
      
      
  })