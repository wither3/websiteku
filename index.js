const express = require('express');
const cors = require('cors');
const path = require('path');

// Import fungsi dari folder codenya/
const { ttsave } = require('./ttsave');
const igStalk = require('./igstalk');
const igStalkPosts = require('./igpost');
const ttDL = require('./codenya/ttdl');

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


app.get('/ttdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Masukkan parameter ?url=' });
  }

  try {
    const result = await ttDL(url);
    res.setHeader('Content-Type', 'application/json');
    res.send(result); // sudah rapi dari ttdl.js
  } catch (err) {
    res.status(500).json({ error: err.message || 'Terjadi kesalahan' });
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



// ✅ Fallback untuk 404 (halaman tidak ditemukan)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
