async function TIKDOWNLOADER(ur) {
const Tiktok = require("@tobyg74/tiktok-api-dl")

const url = "https://vt.tiktok.com/ZSyfPaoxu/"
Tiktok.Downloader(url, {
  version: "v3", // "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY", // optional
  showOriginalResponse: true // optional, v1 only
}).then((result) => console.log(result))
};

async function tikStalk() {
  const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "qhairulpratama"
Tiktok.StalkUser(username, {
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
}

async function userPost() {
  const Tiktok = require("@tobyg74/tiktok-api-dl")

const username = "qhairulpratama"
Tiktok.GetUserPosts(username, {
  postLimit: 10, // optional, default is 30
  proxy: "YOUR_PROXY" // optional
}).then((result) => console.log(result))
}


async function t() {
  const { spotify } = require('btch-downloader');

const url = 'https://open.spotify.com/track/5YFjWEjtZW0ZDmVDhvv1h2?si=qu0tEIk_RoKwGxqy7a_kNA';
const data = await spotify(url);
const sama = JSON.stringify(data, null, 2);
console.log(sama);
}

async function ytmp3(idnya) {
  const https = require('https');

  const options = {
    method: 'GET',
    hostname: 'youtube-mp36.p.rapidapi.com',
    port: 443,
    path: `/dl?id=${idnya}`,
    headers: {
      'x-rapidapi-key': '2d8efbca6cmshba7782a3d1b31bcp160901jsn1b8edec486b4',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  return await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => data += chunk);

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result); // kirim result sebagai nilai kembalian
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}


async function yts(judul) {
const { yts } = require('btch-downloader');
    

const query = judul;
const hasil = await yts(query);
const gini = JSON.stringify(hasil, null, 2);
const oh = JSON.parse(gini);
const ouh = oh.result.all[0];
const audionya = await ytmp3(ouh.videoId);
const ha ={
  videoId: ouh.videoId,
  penonton: ouh.views,
  url: ouh.url,
  judul: ouh.title,
  waktu: ouh.seconds,
  durasi: ouh.timestamp,
  deskripsi: ouh.description,
  thumbnail: ouh.thumbnail,
  kapan: ouh.ago,
  channel: ouh.author.name,
  urlChannel: ouh.author.url,
  download: {
    title: audionya.title,
    mp3: audionya.link
  }
}

return ha;
}


yts('dj malam ini')

module.exports = { yts }