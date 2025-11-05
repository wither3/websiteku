const express = require('express');
const cors = require('cors');
const path = require('path');

// Import fungsi dari folder codenya/
const { ttsave } = require('./ttsave');
const igStalk = require('./igstalk');
const igStalkPosts = require('./igpost');
const ttDL = require('./codenya/ttdl');
const tikDl = require('./codenya/tikDl.js');
const getTiktokProfile = require(`./codenya/tikstalk.js`);
const { spotify } = require('btch-downloader');

const app = express();
const PORT = process.env.PORT || 3000;

// 🧱 Sajikan semua file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware umum
app.use(cors());
app.use(express.json());

// ✅ Tampilkan index.html di halaman utama
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

// ✅ IG Post API
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

// ✅ TikTok Save API
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
  mapTambakJava: "https://sfile.mobi/4qTyVHpmb6a",
  mapTambakBedrock: "https://sfile.mobi/3BbytGdI5yT",
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
  if (!url) return res.status(400).json({status: false, error: "masukkan Link" });
  Tiktok.Downloader(url, {
  version: "v3", // "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY", // optional
  showOriginalResponse: true // optional, v1 only
}).then((result) => res.json(result));
};
      break;

    case 'spotify':
      if (!url) return res.status(400).json({ status: false, error: "Masukkan URL!" });
      const data = await spotify(url);
const sama = data;
      res.json(sama);
      break;

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
