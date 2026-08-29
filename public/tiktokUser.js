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
  
 
 
 
 
 
 
 
 
 
 
const url = "https://asfinix.my.id/bagian1/posts";
let allPostsData = [];

function createPostHTML(post, isLazy = false) {
 
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
  <p>${post.waktu}</p>                          
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


function handleImageClick(element, realUrl) {
    if (!element.src || element.src === "") {
        element.src = realUrl;
    }
    openModal(realUrl);
}

function renderPosts(postsToRender, isLazy = false) {
    const container = document.getElementById('postingan');
    if (!container) return;

    postsToRender.forEach(post => {
        
        container.insertAdjacentHTML('beforeend', createPostHTML(post, isLazy));
    });
}


async function loadPosts() {
    try {
  
        const response = await fetch(url);
        allPostsData = await response.json();

        if (!Array.isArray(allPostsData)) throw new Error("Data invalid");

    
        const firstThree = allPostsData.slice(0, 3);
        renderPosts(firstThree, false); 

        
        const remaining = allPostsData.slice(3);
        
        if (remaining.length > 0) {
            
            const btn = document.createElement("button");
            btn.id = "btnLihatSemua";
            btn.innerText = `Klik untuk lihat ${remaining.length} postingan lainnya`;
            btn.style.cssText = "display:block; margin: 20px auto; padding: 10px 20px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;";
            
            btn.onclick = function() {
                renderPosts(remaining, false); 
                this.remove(); 
            };
            
            document.getElementById('postingan').parentNode.insertBefore(btn, document.getElementById('postingan').nextSibling);
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('postingan').innerHTML = "<p>Gagal memuat data.</p>";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPosts);
} else {
    loadPosts();
}
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