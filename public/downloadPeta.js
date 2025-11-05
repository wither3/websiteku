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

document.getElementById('whatsapp').addEventListener('click', function() {
  window.location.href = 'https://chat.whatsapp.com/FZtfxpSyYCN9FyCjWekyZN?mode=wwt';
});






fetch('https://endernet.web.id/bagian1?api=maptambakudangdanikan')
            .then(response => response.json())
            .then(data => {
                document.getElementById('downloadPetaBedrock').addEventListener('click', function() {
                    window.location.href = `${data.datany.mapTambakBedrock}`;
                });               
               
                document.getElementById('downloadPetaJava').addEventListener('click', function() {
                    window.location.href = `${data.datany.mapTambakJava}`;
                });               
            })
            .catch(error => {
                document.getElementById('result').innerHTML = 'Error: ' + error;
            });










