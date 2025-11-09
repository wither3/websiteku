// === Import library utama ===
const https = require('https');
const { yts } = require('btch-downloader');
const Tiktok = require('@tobyg74/tiktok-api-dl');
const { spotify } = require('btch-downloader');

// === TikTok Downloader ===
async function TIKDOWNLOADER(url) {
  try {
    const result = await Tiktok.Downloader(url, {
      version: 'v3', // bisa: 'v1', 'v2', 'v3'
      showOriginalResponse: true
    });
    console.log(result);
    return result;
  } catch (err) {
    console.error('Gagal download TikTok:', err);
    return null;
  }
}

// === TikTok Stalk ===
async function tikStalk(username) {
  try {
    const result = await Tiktok.StalkUser(username);
    console.log(result);
    return result;
  } catch (err) {
    console.error('Gagal stalk user TikTok:', err);
    return null;
  }
}

// === TikTok User Posts ===
async function userPost(username) {
  try {
    const result = await Tiktok.GetUserPosts(username, { postLimit: 10 });
    console.log(result);
    return result;
  } catch (err) {
    console.error('Gagal ambil postingan TikTok:', err);
    return null;
  }
}

// === Spotify Downloader ===
async function spotifyDL(url) {
  try {
    const data = await spotify(url);
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error('Gagal ambil data Spotify:', err);
    return null;
  }
}

// === YouTube MP3 ===
async function ytmp3(id) {
  const options = {
    method: 'GET',
    hostname: 'youtube-mp36.p.rapidapi.com',
    port: 443,
    path: `/dl?id=${id}`,
    headers: {
      'x-rapidapi-key': '2d8efbca6cmshba7782a3d1b31bcp160901jsn1b8edec486b4',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
    }
  };

  return await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// === YouTube Search + Convert MP3 ===
async function ytSearch(query) {
  try {
    // cari video lewat btch-downloader
    const hasil = await yts(query);

    // pastikan hasil valid
    if (!hasil || !hasil.result || !Array.isArray(hasil.result.all) || hasil.result.all.length === 0) {
      throw new Error('Tidak ada hasil dari pencarian YouTube.');
    }

    const video = hasil.result.all[0];

    // ambil MP3
    const audio = await ytmp3(video.videoId);

    // hasil lengkap
    const data = {
      videoId: video.videoId,
      penonton: video.views,
      url: video.url,
      judul: video.title,
      waktu: video.seconds,
      durasi: video.timestamp,
      deskripsi: video.description,
      thumbnail: video.thumbnail,
      kapan: video.ago,
      channel: video.author.name,
      urlChannel: video.author.url,
      download: {
        title: audio?.title || 'Tidak diketahui',
        mp3: audio?.link || null
      }
    };

    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.error('Gagal mencari YouTube:', err.message);
    return null;
  }
}

// === Tes fungsi ===


// === Export semua fungsi ===
module.exports = {
  TIKDOWNLOADER,
  tikStalk,
  userPost,
  spotifyDL,
  ytSearch,
  ytmp3
};
