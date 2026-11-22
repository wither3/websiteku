/* Sidebar */
function openSidebar(o){
  document.getElementById('sidebar').classList.toggle('open', o);
  document.getElementById('overlay').classList.toggle('show', o);
}
document.getElementById('menu-button').addEventListener('click', () => openSidebar(true));
document.getElementById('close-button').addEventListener('click', () => openSidebar(false));
document.getElementById('overlay').addEventListener('click', () => openSidebar(false));

/* Link download & komunitas dari API */
fetch('https://asfinix.my.id/bagian1?api=maptambakudangdanikan')
  .then(res => res.json())
  .then(({ datany: d }) => {
    document.getElementById('tanggalnya').textContent = d.update || '-';
    document.getElementById('versionnya').textContent = d.version || '-';

    const go = (id, url) => document.getElementById(id).addEventListener('click', () => window.location.href = url);
    go('whatsapp', d.WhatsApp.linkChannel);
    go('waJava', d.WhatsApp.linkWAgcJava);
    go('waBedrock', d.WhatsApp.linkWAgcBedrock);
    go('downloadPetaBedrock', d.mapTambakBedrock);
    go('downloadPetaJava', d.mapTambakJava);

    if (d.admin) {
      document.getElementById('adminnya').innerHTML =
        '👑 Admin: ' + Object.values(d.admin).map(a => `<span>${a}</span>`).join(' ');
    }
  })
  .catch(err => {
    document.getElementById('result').textContent = 'Gagal memuat link: ' + err;
  });
