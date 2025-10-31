const https = require('https');

const apiKeys = [
  '3eb539a2d9msh6a71fb36c867c07p10828djsn1ca4ae3f0bed',
  '44114406bbmshdee24010b885bc0p140418jsn3d9caf51b4b3',
  'ca5c6d6fa3mshfcd2b0a0feac6b7p140e57jsn72684628152a',
  '2d8efbca6cmshba7782a3d1b31bcp160901jsn1b8edec486b4'
];

function getRandomKey() {
  return apiKeys[Math.floor(Math.random() * apiKeys.length)];
}

async function ttDL(link, triedKeys = []) {
  // pilih key random yang belum dipakai
  const availableKeys = apiKeys.filter(k => !triedKeys.includes(k));
  if (availableKeys.length === 0) throw new Error('Semua API key gagal dipakai.');

  const apiKey = getRandomKey();

  const options = {
    method: 'GET',
    hostname: 'tiktok-scraper7.p.rapidapi.com',
    port: null,
    path: `/?url=${encodeURIComponent(link)}`,
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        try {
          if (res.statusCode >= 400) {
            console.warn(`❌ Key gagal (${apiKey}) | Code: ${res.statusCode}`);
            // coba key lain
            return resolve(await ttDL(link, [...triedKeys, apiKey]));
          }

          const json = JSON.parse(data);
          const pretty = JSON.stringify(json, null, 2);
          resolve(pretty);
        } catch (err) {
          console.warn(`⚠️ Key gagal (${apiKey}), mencoba yang lain...`);
          // fallback ke key berikutnya
          try {
            const next = await ttDL(link, [...triedKeys, apiKey]);
            resolve(next);
          } catch (e) {
            reject(e);
          }
        }
      });
    });

    req.on('error', async () => {
      console.warn(`⚠️ Key error (${apiKey}), mencoba yang lain...`);
      try {
        const next = await ttDL(link, [...triedKeys, apiKey]);
        resolve(next);
      } catch (e) {
        reject(e);
      }
    });

    req.end();
  });
}

module.exports = ttDL;
