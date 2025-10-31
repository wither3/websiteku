const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { tiktokStalk } = require('./codenya/countik');
const LoveTik = require("./lovetik");
const { ttsave } = require("./ttsave");
const igStalk = require("./igstalk");
const igStalkPosts = require('./igpost'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 🧱 Sajikan semua file statis (HTML, CSS, JS, gambar, musik)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

// Route utama -> tampilkan index.html
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(filePath);
});

// ========== ROUTE API ==========
app.get('/igpost', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Username tidak diberikan' });

  try {
    const hasil = await igStalkPosts(username);
    res.json(hasil);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Terjadi kesalahan saat fetch' });
  }
});

app.get('/igstalk', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Username tidak diberikan' });

  const data = await igStalk(username);
  res.json(data);
});

app.get("/ttsave", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ status: false, message: "URL TikTok diperlukan!" });

  try {
    const result = await ttsave.download(url);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: "Terjadi kesalahan!", error: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
