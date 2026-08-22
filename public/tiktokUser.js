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