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
    case 'datanyaaa':
      res.json({ status: true, kenapa: "Hii, Selamat datang di papan klip Gboard..." });
      break;

    case 'disinidibataskotaini':
      res.json({ status: true, down: "dicoba dulu" });
      break;

    case 'tiksave':
      if (!url) return res.status(400).json({ status: false, error: "URL wajib!" });
      // ... logic ttsave
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
