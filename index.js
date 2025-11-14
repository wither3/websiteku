const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');


const { ttsave } = require('./ttsave');
const igStalk = require('./igstalk');
const igStalkPosts = require('./igpost');
const ttDL = require('./codenya/ttdl');
const tikDl = require('./codenya/tikDl.js');
const getTiktokProfile = require(`./codenya/tikstalk.js`);
const { spotify } = require('btch-downloader');
const Tiktok = require("@tobyg74/tiktok-api-dl")
const getTiktokVideo = require("./codenya/tikUserVideo.js");
const { ytSearch } = require('./codenya/scraper.js');
const tokdl = require('./codenya/tokdl.js');
const { douyin } = require('./codenya/scraper.js');
const {TIKDOWNLOADER} = require('./codenya/scraper.js');
const {spot} = require('./codenya/scraper.js');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/tiktok', async (req, res) => {
  const { url } = req.query; // ambil parameter ?url=

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Parameter ?url= harus diisi',
      contoh: '/tiktok?url=https://vt.tiktok.com/ZSy2xc2yW/'
    });
  }
try {
    const result = await tikDl(url);
    res.json(result); // kirim hasil rapi langsung
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
});


app.get('/igpost', async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: 'Username tidak diberikan' });

  try {
    const hasil = await igStalkPosts(username);
    res.json(hasil);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || 'Terjadi kesalahan saat fetch' });
  }
});
app.get('/tikstalk', async (req, res) => {
const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: 'masukkan username'});
  try {
    const data = await getTiktokProfile(username);
    res.json(data);
  } catch(error) {
    res.json(error);
  }
  });

app.get('/tikuservideo', async (req, res) => {
const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: 'masukkan username'});
  try {
    const data = await getTiktokVideo(username);
    res.json(data);
  } catch(error) {
    res.json(error);
  }
  });

// ✅ IG Stalk API
app.get('/igstalk', async (req, res) => {
  const username = req.query.username;
  if (!username)
    return res.status(400).json({ error: 'Username tidak diberikan' });

  try {
    const data = await igStalk(username);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Gagal mengambil data IG' });
  }
});


app.get('/ttsave', async (req, res) => {
  const url = req.query.url;
  if (!url)
    return res
      .status(400)
      .json({ status: false, message: 'URL TikTok diperlukan!' });

  try {
    const result = await ttsave.download(url);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan!',
      error: error.message,
    });
  }
});

app.get('/bagian1/:api?', async (req, res) => {
  const api = req.params.api || req.query.api; // baca dari path atau query
  const { url } = req.query;

  if (!api) {
    return res.json({
      status: true,
      message: "API EnderNet aktif!",
      usage: "Maaf ini masih di kembangkan oleh rullzNPC"
    });
  }

  switch (api) {
    case 'maptambakudangdanikan' :
    const datany = {
  version: "1.21.111",
  update: "10 November 2025",
  mapTambakJava: "https://sfile.mobi/2LtX2T2IFOK",
  mapTambakBedrock: "https://sfile.mobi/9co0BDzermQ",
  admin:{
    no1: "rullzNPC",
    no2: "ARWIS"
  },
  WhatsApp: {
    linkChannel: "https://whatsapp.com/channel/0029VbAyEGXJuyACiijTNb03",
    linkWAgcJava: "https://chat.whatsapp.com/FZtfxpSyYCN9FyCjWekyZN?mode=wwt",
    linkWAgcBedrock: "https://chat.whatsapp.com/JYoK6GPec1r8KSuFew4UJo?mode=wwt"
  } // ← TANPA KOMA DI SINI
};
      res.json({ status: true, datany });
      break;

    case 'tikDLv3':
  const url = req.query.url?.trim();

  // Validasi URL
  if (!url) {
    return res.status(400).json({ status: false, error: "Masukkan link TikTok!" });
  }
  if (!url.includes('tiktok.com')) {
    return res.status(400).json({ status: false, error: "Link harus dari TikTok!" });
  }

  try {
const link = url;
const hasil = await TIKDOWNLOADER(link);
res.json(hasil);
    
  } catch (error) {
    res.status(500).json({
      status: false,
      error: "Gagal download",
      details: error.message
    });
  }
  break;

case 'spotify': {
  const { downr } = require('./codenya/scraper.js');
  const link = req.query.link; // PERBAIKAN: gunakan 'link' bukan 'url'
  
  // Validasi
  if (!link) {
    return res.json({ status: false, error: "Masukkan link Spotify!" });
  }
  
  if (!link.includes('spotify.com')) {
    return res.json({ status: false, error: "Link harus dari Spotify!" });
  }

  try {
    console.log(`📥 Processing Spotify: ${link}`);
    const hasil = await downr(link);
    res.json(hasil);
  } catch (error) {
    console.error('❌ Spotify Error:', error);
    res.json({ 
      status: false, 
      error: "Gagal download",
      details: error.message 
    });
  }
  break;
}

    case 'ytplay':
const teks = req.query.teks
if (!teks) return res.json("Masukkan judul");
try {
const ternyataGini = await ytSearch(teks);
res.json(ternyataGini);
} catch (error) {
res.json(error);
}
      break;
case 'imagen4ultra': {
  const prompt = req.query.teks;
  if (!prompt)
    return res.status(400).json({ success: false, error: "Masukkan teks prompt!" });

  try {
    const apiUrl = `https://api.nekolabs.web.id/ai/imagen/4-ultra?prompt=${encodeURIComponent(prompt)}&ratio=16:9`;

    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Jika API mengembalikan JSON seperti contohmu
    if (response.data && response.data.success) {
      res.json(response.data);
    } else {
      res.status(500).json({
        success: false,
        message: "API tidak mengembalikan hasil yang diharapkan",
        data: response.data
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memproses imagen4ultra",
      error: error.message
    });
  }
  break;
}
    case 'tokdl': {
const link = req.query.link;
if (!link) return res.json('Masukkan Link');
try{
const gimana = await tokdl(link);
const ze = gimana;
res.json(ze);
} catch(error){
res.json(error);
}
break;
    }
    case 'tiktokdownload2':{
const {tiktokdownload2} = require('./codenya/scraper.js');
const link = req.query.link;
if (!link) return res.json('masukkan link')
if (!link.includes('tiktok.com')) return res.json('link salah');
try {
const hasil = await tiktokdownload2(link);
res.json(hasil);
} catch(error) {
console.log(error);
res.json(error);
}


break;
    }

case 'fbdownload': {
  const { downr } = require('./codenya/scraper.js');

  const link = req.query.link;
  if (!link) return res.json('masukkan link dulu');
  if (!link.includes('facebook.com')) return res.json('link salah');

  try {
    const hasil = await downr(link);
    res.json(hasil);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
  break;
}
      

    case 'igdownload':{
const {downr} = require('./codenya/scraper.js');
const link = req.query.link;
if (!link) return res.json('masulkan link dulu baru bisa di pakai');
if (!link.includes('instagram.com') return res.json('link salah');
try{
const hasil = await downr(link);
res.json(hasil);

} catch(error) {
console.log(error);
res.json(error);
}

break;
    }


      
      
    default:
      res.status(404).json({ status: false, message: "API tidak ditemukan" });
  }
});

// ✅ Fallback untuk 404 (halaman tidak ditemukan)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
