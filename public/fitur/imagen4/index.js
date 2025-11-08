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
    
    
    
async function kirimData() {
  const input = document.getElementById('pesanInput').value;

  if (!input.trim()) return alert('Harap isi pesan dulu!');
hasil.innerHTML =`<div class="font-text" style="font-family: 'Patrick Hand', cursive;">SEDANG MEMBUAT GAMBAR...</div>`
  try {
    const res = await fetch(`https://endernet.web.id/bagian1/imagen4ultra?teks=${encodeURIComponent(input)}`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await res.json();
    const hasilDiv = document.getElementById('hasil');

    if (data.result) {
      hasilDiv.innerHTML = `
        <div style="margin-top:10px">
          <img src="${data.result}" alt="Hasil Gambar" style="max-width:100%; border-radius:10px;">
<div class="font-text" style="font-family: 'Patrick Hand', cursive;"><a href="${data.result}">${data.result}</a></div>    
        </div>`;

document.body.style.transition = "background-image 1s ease";
    document.body.style.backgroundImage = `url('${data.result}')`;
      document.body.style.backgroundSize = "cover";
     document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";


    } else {
      hasilDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

  } catch (err) {
    alert('Gagal kirim: ' + err.message);
  }
}
