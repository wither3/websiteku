const Tiktok = require("@tobyg74/tiktok-api-dl")

async function TIKDOWNLOADER(url) {
 
  try {
    const result = await Tiktok.Downloader(url, {
      version: 'v3', // bisa: 'v1', 'v2', 'v3'
      showOriginalResponse: true
    });
    
    return result;
  } catch (err) {
    console.error('Gagal download TikTok:', err);
    return null;
  }
}

async function TIKDOWNLOADER2(url) {
 
  try {
    const result = await Tiktok.Downloader(url, {
      version: 'v2', // bisa: 'v1', 'v2', 'v3'
      showOriginalResponse: true
    });
    
    return result;
  } catch (err) {
    console.error('Gagal download TikTok:', err);
    return null;
  }
}


async function spot(link) {
const { spotify } = require('btch-downloader');

const data = await spotify(link);
const sama = data;
return sama

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



async function yts2(conn, m) {
  const axios = require("axios");
  try {
    const input = m.isQuoted ? m.quoted.text : m.text;
    const regex = /(https?:\/\/(?:www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/;
    const parseUrl = input.match(regex)?.[0];

    if (!parseUrl) {
      return m.reply(
        `# Cara Penggunaan\n\n` +
        `> ${m.cmd} <link_youtube> --audio\n` +
        `> ${m.cmd} <link_youtube> --video\n\n` +
        `# Contoh:\n` +
        `> ${m.cmd} https://youtu.be/dQw4w9WgXcQ --audio`
      );
    }

    let type;
    if (input.includes("--audio")) type = "audio";
    else if (input.includes("--video")) type = "video";
    else return m.reply(`❗ Tentukan jenis unduhan: --audio atau --video`);

    await m.reply("⏳ Sedang memproses permintaanmu...");

    // Perintah yt-dlp
    let command;
    if (type === "audio") command = `-x --audio-format mp3 ${parseUrl}`;
    else command = `-f bestvideo+bestaudio[ext=mp4]/best[ext=mp4]/best ${parseUrl}`;

    const encoded = encodeURIComponent(command);
    const response = await axios.get(
      `https://ytdlp.online/stream?command=${encoded}`,
      { responseType: "stream" }
    );

    const downloadUrl = await new Promise((resolve, reject) => {
      let found = null;

      response.data.on("data", (chunk) => {
        const text = chunk.toString();
        const match =
          text.match(/href="([^"]+\.(mp3|mp4|m4a|webm|mov|mkv))"/i) ||
          text.match(/(https:\/\/ytdlp\.online\/[^"' ]+\.(mp3|mp4|m4a|webm|mov|mkv))/i);

        if (match) {
          found = match[1].startsWith("http")
            ? match[1]
            : `https://ytdlp.online${match[1]}`;
        }
      });

      response.data.on("end", () => {
        if (!found) reject(new Error("Gagal menemukan URL download"));
        else resolve(found);
      });

      response.data.on("error", reject);
    });

    // Kirim hasil ke WhatsApp
    if (type === "audio") {
      await m.reply({
        audio: { url: downloadUrl },
        mimetype: "audio/mpeg",
        caption: "🎧 Berhasil mengunduh audio!",
      });
    } else {
      await m.reply({
        video: { url: downloadUrl },
        caption: "🎥 Berhasil mengunduh video!",
      });
    }
  } catch (error) {
    console.error(error);
    m.reply("⚠️ Terjadi kesalahan saat mengambil video YouTube.");
  }
}

async function ytSearch(judul) {
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


async function douyin(url) {
const axios = require('axios');
const cheerio = require('cheerio');
  
    try {
        const response = await axios.post(
            'https://tikvideo.app/api/ajaxSearch',
            `q=${encodeURIComponent(url)}&lang=id`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Referer': 'https://tikvideo.app/id/download-douyin-video',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        );

        if (response.data.status === 'ok') {
            const $ = cheerio.load(response.data.data);
            
            const videoInfo = {
                title: $('h3').first().text().trim(),
                duration: $('.content p').first().text().trim(),
                thumbnail: $('.image-tik img').attr('src'),
                tiktokId: $('#TikTokId').val(),
                downloadLinks: []
            };

            $('.dl-action a').each((index, element) => {
                const $link = $(element);
                const text = $link.text().trim();
                const href = $link.attr('href');
                
                videoInfo.downloadLinks.push({
                    type: text,
                    url: href,
                    isDirect: !href.includes('dl.snapcdn.app')
                });
            });

            return videoInfo;
        } else {
            return null
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function tikdownloader(link) {
  const cheerio = require('cheerio');
  const axios = require('axios');
  const qs = require('qs');
  try {
    const postData = qs.stringify({ q: link, lang: 'id' });
    const response = await axios.post(
      'https://tikdownloader.io/api/ajaxSearch',
      postData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': '*/*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );

    const html = response.data.data;
    const $ = cheerio.load(html);

    const downloads = [];
    $('a[href]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('dl.snapcdn.app')) downloads.push(href);
    });

    return { downloads };
  } catch (error) {
    return { error: error.message, downloads: [] };
  }
}


module.exports = { ytSearch, yts2, douyin, tikdownloader, TIKDOWNLOADER, TIKDOWNLOADER2, spot };