// const Tiktok = require("@tobyg74/tiktok-api-dl")

async function spotifydl(url) {
const axios = require('axios');
const cheerio = require('cheerio');
    
    try {
        if (!url.includes('open.spotify.com')) throw new Error('Invalid url.');
        
        const rynn = await axios.get('https://spotdl.io/', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(rynn.data);
        
        const api = axios.create({
            baseURL: 'https://spotdl.io',
            headers: {
                cookie: rynn.headers['set-cookie'].join('; '),
                'content-type': 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'x-csrf-token': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
        const [{ data: meta }, { data: dl }] = await Promise.all([
            api.post('/getTrackData', { spotify_url: url }),
            api.post('/convert', { urls: url })
        ]);
        
        return {
            ...meta,
            download_url: dl.url
        };
    } catch (error) {
        throw new Error(error.message);
    }
}


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
const { fetch } = require("undici");
const cheerio = require("cheerio");
  
    try {

        const bodyData = `q=${encodeURIComponent(url)}&lang=id`;

        const response = await fetch(
            'https://tikvideo.app/api/ajaxSearch',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Referer': 'https://tikvideo.app/id/download-douyin-video',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                body: bodyData
            }
        );

        const responseData = await response.json();

        if (responseData.status === 'ok') {
            const $ = cheerio.load(responseData.data);
            
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
            return null;
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

async function tikdlbot(tiktokUrl) {
    const { fetch } = require('undici');

    try {
        if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
            throw new Error("Invalid TikTok url");
        }

        // Cookie manual (tetap sama seperti versi axios)
        const cookieStr = 'lang=en; _ga=GA1.1...; uid=86705190e2e25fe9f35005f1fe54206f; _ga_233R9NY1HK=...';

        const response = await fetch(
            'https://downloader.bot/api/tiktok/info',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Origin': 'https://downloader.bot',
                    'Referer': 'https://downloader.bot/en',
                    'User-Agent':
                        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                    'Cookie': cookieStr   // ⬅ cookie masuk di sini
                },
                body: JSON.stringify({ url: tiktokUrl }),
            }
        );

        const data = await response.json();
        return data;

    } catch (err) {
        console.error("ERROR:", err.message);
        throw err;
    }
}





async function tikvid(url) {
const { request } = require("undici");
const cheerio = require("cheerio");
  
  const apiUrl = "https://tikvid.io/api/ajaxSearch";

  try {
    // Kirim POST pakai undici
    const body = new URLSearchParams({ q: url }).toString();
    const { body: resBody } = await request(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://tikvid.io",
        "Referer": "https://tikvid.io/en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
      },
      body,
    });

    const text = await resBody.text();
    const json = JSON.parse(text);

    if (json.status !== "ok") throw new Error("Gagal mendapatkan data!");

    const html = json.data || json;
    const $ = cheerio.load(html);

    const result = {};
    result.description = $(".content h3").text().trim();
    result.thumbnail = $(".thumbnail img").attr("src") || null;
    result.id = $("#TikTokId").val() || null;

    // Ambil semua link download
    const links = [];
    $(".tik-button-dl").each((_, el) => {
      const label = $(el).text().trim();
      const href = $(el).attr("href");
      if (href) {
        links.push({
          text: label,
          url: href.startsWith("http") ? href : `https://tikvid.io${href}`,
        });
      }
    });

    // Pilih otomatis
    result.links = links;
    result.video = links.find(l => /MP4(?!.*HD)/i.test(l.text))?.url || null;
    result.videoHD = links.find(l => /MP4 HD/i.test(l.text))?.url || null;
    result.audio = links.find(l => /MP3/i.test(l.text))?.url || null;

const begini ={
  status: 'berhasil',
  by: 'rullzNPC',
  data:{
   judul: result.description,
   thumbnail: result.thumbnail,
   video: result.video,
   videoHD: result.videoHD,
   mp3: result.audio
  }
}
    return begini;
  } catch (err) {
    console.error("Error:", err.message);
    return { error: err.message };
  }
}




// Contoh pemakaian




async function spotif(url){
const { request } = require('undici');
  
const api =`https://apis.prexzyvilla.site/download/spotify?url=${encodeURIComponent(url)}`
try{

const { body } = await request(api);
const dataa = await body.json()
return dataa.data;
} catch(error){
  return error;
}
  
}


async function tikwm(videourl){
const { request } = require('undici');

try {
console.log(videourl);
const api =`
https://www.tikwm.com/api/`;
const { body } = await request(api,{
 method: 'POST',
headers:{
  'Origin' : 'https://www.tikwm.com/',
  'Referer' : 'https://www.tikwm.com/',
  'User-Agent' : 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
},
body: JSON.stringify({url: videourl, hd:1})
});
const data = await body.json();

return data;
} catch(error) {
  return error;
}
}


async function tikdownmusdown(url) {
const { fetch } = require("undici");
const cheerio = require("cheerio");
  
    try {
        if (!url.includes('tiktok.com')) throw new Error('Invalid url.');

        // === GET awal ke MusicalDown ===
        const getRes = await fetch("https://musicaldown.com/en", {
            method: "GET",
            headers: {
                "user-agent":
                    "Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36"
            }
        });

        const html = await getRes.text();

        // ambil cookie dari header
        const rawCookies = getRes.headers.get("set-cookie");
        const savedCookie = rawCookies
            ? rawCookies.split(",").map(c => c.split(";")[0]).join("; ")
            : "";

        const $ = cheerio.load(html);

        // === Ambil semua input form ===
        const payload = {};
        $("#submit-form input").each((i, elem) => {
            const name = $(elem).attr("name");
            const value = $(elem).attr("value");
            if (name) payload[name] = value || "";
        });

        // Field kosong = tempat URL TikTok
        const urlField = Object.keys(payload).find(key => !payload[key]);
        if (urlField) payload[urlField] = url;

        const formBody = new URLSearchParams(payload).toString();

        // === POST ke /download ===
        const postRes = await fetch("https://musicaldown.com/download", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "cookie": savedCookie,
                "origin": "https://musicaldown.com",
                "referer": "https://musicaldown.com/",
                "user-agent":
                    "Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36"
            },
            body: formBody
        });

        const data = await postRes.text();
        const $$ = cheerio.load(data);

        // === Extract informasi video ===
        const videoHeader = $$('.video-header');
        const bgImage = videoHeader.attr('style');
        const coverMatch = bgImage?.match(/url\((.*?)\)/);

        // === Extract link download ===
        const downloads = [];
        $$("a.download").each((i, elem) => {
            const $elem = $$(elem);
            downloads.push({
                type: $elem.data("event")?.replace("_download_click", ""),
                label: $elem.text().trim(),
                url: $elem.attr("href")
            });
        });

        return {
            title: $$(".video-desc").text().trim(),
            author: {
                username: $$(".video-author b").text().trim(),
                avatar: $$(".img-area img").attr("src")
            },
            cover: coverMatch ? coverMatch[1] : null,
            downloads
        };

    } catch (error) {
        throw new Error(error.message);
    }
}



async function tiktokdownload2(url) {
const { fetch } = require("undici");
  
    try {
        const apiURL = `https://tiktok-scraper7.p.rapidapi.com/?url=${encodeURIComponent(url)}&hd=1`;

        const res = await fetch(apiURL, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "181a3b1233mshad025fe3f4413afp16f9e9jsne749f10e4adb",
                "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com"
            }
        });

        const data = await res.json(); // sama seperti body.toString() + JSON.parse()

        return data;

    } catch (err) {
        console.error("Error tiktokdownload:", err.message);
        return null;
    }
}







async function downr(url) {
const { fetch } = require('undici');
    try {
        if (!url.includes('https://')) {
            throw new Error('Invalid url.');
        }

        const response = await fetch(
            'https://downr.org/.netlify/functions/download',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    origin: 'https://downr.org',
                    referer: 'https://downr.org/',
                    'user-agent':
                        'Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36'
                },
                body: JSON.stringify({ url })
            }
        );

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(error.message);
    }
}

// Usage
// Usage:



async function spotifydl1(url) {
const axios = require('axios');
const cheerio = require('cheerio');
    
    try {
        if (!url.includes('open.spotify.com')) throw new Error('Invalid url.');
        
        const rynn = await axios.get('https://spotmate.online/', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(rynn.data);
        
        const api = axios.create({
            baseURL: 'https://spotmate.online',
            headers: {
                cookie: rynn.headers['set-cookie'].join('; '),
                'content-type': 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'x-csrf-token': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
        const [{ data: meta }, { data: dl }] = await Promise.all([
            api.post('/getTrackData', { spotify_url: url }),
            api.post('/convert', { urls: url })
        ]);
        
        return {
            ...meta,
            download_url: dl.url
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Usage:

function findAllImages(html) {
const cheerio = require('cheerio');
    
    const $ = cheerio.load(html);
    const images = [];
    
    $('img').each((index, element) => {
        const $el = $(element);
        const src = $el.attr('src');
        
        if (src) {
            images.push({
                src: src,
                alt: $el.attr('alt') || '',
                width: $el.attr('width'),
                height: $el.attr('height')
            });
        }
    });
    
    return images;
}

async function gamertagInfo(nama) {
 const { request } = require('undici');
const cheerio = require('cheerio');
    
    try {
        const api = `https://xboxgamertag.com/search/${encodeURIComponent(nama)}`;
        const { body } = await request(api);
        const html = await body.text();
        const $ = cheerio.load(html);
        
        const begini = findAllImages(html);
        const ohgini = begini[0].src;
        
        const gamertag = $('h1 a').text().trim();
        const gamerscore = $('.profile-detail-item:contains("Gamerscore")').next().text().trim();
        const gamesPlayed = $('.profile-detail-item:contains("Games Played")').next().text().trim();
        
        const gameHistory = [];
        $('.game-card').each((index, element) => {
            const gameName = $(element).find('h3').text().trim();
            const lastPlayed = $(element).find('.text-sm').text().trim();
            const platform = $(element).find('.text-xs').text().trim();
            const gamerscoreProgress = $(element).find('.font-weight-bold').first().text().trim();
            const achievements = $(element).find('.font-weight-bold').last().text().trim();
            const progress = $(element).find('.progress-bar').attr('aria-valuenow') + '%';

            gameHistory.push({
                gameName,
                lastPlayed,
                platform,
                gamerscoreProgress,
                achievements,
                progress,
                image: `https:${ohgini}`
            });
        });

        return {
            gamertag,
            gamerscore,
            gamesPlayed,
            gameHistory
        };
    } catch (error) {
        throw new Error('Error fetching gamertag: ' + error.message);
    }
}


async function savetik(link) {
    const { request } = require('undici');
    const cheerio = require('cheerio');
    
    try {
        const api = `https://savetik.co/api/ajaxSearch`;
        const payload = {
            q: link,
            lang: "en"
        };
        
        const headers = {
            'Origin': 'https://savetik.co',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const { body } = await request(api, {
            method: 'POST',
            headers: headers,
            body: new URLSearchParams(payload).toString()
        });

        const data = await body.json();

        if (data.status === 'ok') {
            const $ = cheerio.load(data.data);
            const title = $('h3').text().trim();
            const downloadLinks = [];
            
            $('.dl-action a').each((index, element) => {
                const $link = $(element);
                const text = $link.text().trim();
                const href = $link.attr('href');
                downloadLinks.push({
                    type: text,
                    url: href
                });
            });

            return {
                title,
                downloadLinks
            };
        } else {
            throw new Error('Failed to fetch TikTok data');
        }
    } catch (error) {
        throw new Error('Error fetching TikTok: ' + error.message);
    }
}

async function enderTikDl(link){

try{
const [ h1, h2] = await Promise.all([
 tikvid(link),
 tikwm(link)
]);
const st = h2.data;
const hasil = {
 status: 'berhasil',
 author: 'rullzNPC',
 data:{
id: h2.data.author.id,
uniqueId: h2.data.author.unique_id,
nickname: h2.data.author.nickname,
avatar: h2.data.author.avatar,
 thumbnail:{
    cover: h2.data.cover,
    ai_dynamic_cover: h2.data.ai_dynamic_cover,
    origin_cover: h2.data.origin_cover
     },
video:{
    id: h2.data.id,
    region: h2.data.region,
    title: h2.data.title,
    no_wm: h1.data.video,
    no_wm_hd: h1.data.videoHD
},
mp3:{
  id: h2.data.music_info.id,
  title: h2.data.music_info.title,
  url: h1.data.mp3,
  cover: h2.data.music_info.cover,
  author: h2.data.music_info.author,
  duration: h2.data.music_info.duration,
  album: h2.data.music_info.album
},
stats:{
 play: st.play_count,
 like: st.digg_count,
 comment: st.comment_count,
 share: st.share_count,
 download: st.download_count,
 collect: st.collect_count,
 create_time: st.create_time
}
 }
}    
return hasil;
} catch(error){
return error;
}
    
}



module.exports = { ytSearch, yts2, douyin, tikdownloader, TIKDOWNLOADER, TIKDOWNLOADER2, spot, tikdlbot, tikvid, spotif, tikwm, tikdownmusdown, spotifydl, tiktokdownload2, downr, spotifydl1, gamertagInfo, savetik, enderTikDl};