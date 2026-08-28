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
  
 
 
 
 
 
 
 
 
 
 // tiktokUser.js - Versi Hemat Kuota & Performa

const url = "https://asfinix.my.id/bagian1/posts";
let allPostsData = [];

// Fungsi membuat HTML Postingan
// Parameter 'isLazy' jika true, maka gambar tidak akan dimuat dulu (src kosong)
function createPostHTML(post, isLazy = false) {
    // Jika isLazy true, src gambar diganti placeholder atau kosong, URL asli disimpan di data-url
    const imgSrc = isLazy ? "" : post.url;
    const dataAttr = isLazy ? `data-real-src="${post.url}"` : "";

    return `
    <center>
        <div class="kotakPost">
            <div class="profilAtas">
                <div class="profilAtass">
                    <div style="display:flex;">
                        <img src="${post.fotoProfil}" style="border-radius:5px; width:45px; height:45px; margin-left:0px;">
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
            
            <!-- Gambar Postingan -->
            <img src="${imgSrc}" 
                 ${dataAttr}
                 height="200px" 
                 style="width:100%; object-fit:cover; cursor:pointer; background:#f0f0f0;" 
                 onclick="handleImageClick(this, '${post.url}')"
                 title="Klik untuk melihat penuh">
            
            <div class="tempatDeskripsi">
                <p>${post.deskripsi}</p>
            </div>
        </div>
    </center>
    <br>`;
}

// Fungsi khusus untuk menangani klik gambar (buka modal & load gambar jika belum)
function handleImageClick(element, realUrl) {
    // Jika gambar belum punya src (karena lazy load), isi dulu src-nya
    if (!element.src || element.src === "") {
        element.src = realUrl;
    }
    // Buka modal
    openModal(realUrl);
}

// Fungsi Render
function renderPosts(postsToRender, isLazy = false) {
    const container = document.getElementById('postingan');
    if (!container) return;

    postsToRender.forEach(post => {
        // Tambahkan HTML ke container
        container.insertAdjacentHTML('beforeend', createPostHTML(post, isLazy));
    });
}

// Fungsi Utama
async function loadPosts() {
    try {
        // Fetch data JSON saja (ini ringan, hanya teks)
        const response = await fetch(url);
        allPostsData = await response.json();

        if (!Array.isArray(allPostsData)) throw new Error("Data invalid");

        // 1. Tampilkan 3 pertama (Gambar DIMUAT sepenuhnya)
        const firstThree = allPostsData.slice(0, 3);
        renderPosts(firstThree, false); 

        // 2. Siapkan sisa postingan (Gambar TIDAK DIMUAT dulu / Lazy)
        const remaining = allPostsData.slice(3);
        
        if (remaining.length > 0) {
            // Buat tombol
            const btn = document.createElement("button");
            btn.id = "btnLihatSemua";
            btn.innerText = `Klik untuk lihat ${remaining.length} postingan lainnya`;
            btn.style.cssText = "display:block; margin: 20px auto; padding: 10px 20px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;";
            
            btn.onclick = function() {
                // Saat diklik, baru render sisa postingan dengan isLazy = false (atau true jika mau tetap hemat)
                // Di sini kita set false agar gambarnya muncul semua
                renderPosts(remaining, false); 
                this.remove(); // Hapus tombol
            };
            
            document.getElementById('postingan').parentNode.insertBefore(btn, document.getElementById('postingan').nextSibling);
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('postingan').innerHTML = "<p>Gagal memuat data.</p>";
    }
}

// Jalankan
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPosts);
} else {
    loadPosts();
}

// --- FUNGSI MODAL (Sama seperti sebelumnya) ---
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgPopup");
    if(modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if(modal) modal.style.display = "none";
}

    

  
  
  
  
  
  
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