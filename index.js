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
const {spot, lovetik, gamertagInfo, tikdownmusdown, enderTikDl, tikvid, snapTikDownload, tiktokio, tikwm, snapsave} = require('./codenya/scraper.js');


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
  update: "30 November 2025",
  mapTambakJava: "https://sfile.mobi/o3EqYygYVIe",
  mapTambakBedrock: "https://sfile.mobi/JlMNj6l5zmF",
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
    case 'tiksnapsave':{
const link= req.query.link;
if (!link) return res.json('masukkan link');
if (!link.includes('tiktok.com')) return res.json('link salah');
try{
const hasil = await snapsave(link);
res.json(hasil);
} catch(error){
  res.json(error);
}


      break;
    }

      
    case 'tikwm':{
const link = req.query.link;
if (!link) return res.json('link harus di isi');
if (!link.includes('tiktok.com')) return res.json('link salalh');
try{
const hasil = await tikwm(link);
res.json(hasil);
} catch(error){
res.json(error);
}
break;
    }

      
    case 'lovetik':{
const link = req.query.link;
if(!link) return res.json('masukkan link');
if(!link.includes('tiktok.com')) return res.json('link salah');
try{
const hasil = await lovetik(link);
res.json(hasil);
} catch(error){
  res.json(error);
}

      
      break;
    }

    case 'ttsave':{
const link = req.query.link;
if (!link) return res.json('link harus di isi');
if (!link.includes('tiktok.com')) return res.json('link salah');
try{
const hasil = await ttsave.download(link);
res.json(hasil);
} catch(error){
  res.json(error);
}



      
      break;
    }
    case 'tiktokio':{
const link = req.query.link;
if(!link) return res.json('link tidak boleh kosong');
if(!link.includes('tiktok.com')) return res.json('link salah');
try {
const hasil = await tiktokio(link);
res.json(hasil);
} catch(error){
res.json(error);
}
  break;
}
      
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
if (!link.includes('instagram.com')) return res.json('link salah');
try{
const hasil = await downr(link);
res.json(hasil);

} catch(error) {
console.log(error);
res.json(error);
}

break;
    }

    case 'gamertagInfo':{
const username = req.query.username;
if(!username) return res.json('username tidak boleh kosong');
try {
const hasil = await gamertagInfo(username);
res.json(hasil);

} catch(error) {
res.json(error);
}
      

      break;
    }

    case 'snaptik':{
const link = req.query.link;
if(!link) return res.json('link harus di isi');
if(!link.includes('tiktok.com')) return res.json('link salah');
try{
const hasil = await snapTikDownload(link)
res.json(hasil);
} catch(error){
res.json(error);
}

      break;
    }


      
    case 'tikvid':{
const link = req.query.link;
if (!link) return res.json('link tidak boleh kosong');
if (!link.includes('tiktok.com')) return res.json('link salah');
try {
const hasil = await tikvid(link);
res.json(hasil);
} catch(error){
  res.json(error);
}
      break;
    }

      
    case 'ssstik':{

const link = req.query.link;
if (!link) return res.json('link tidak boleh kosong');
if (!link.includes('tiktok.com')) return res.json('link nya salah');
try {
 const hasil = await Tiktok.Downloader(link, {
  version: "v2", // "v1" | "v2" | "v3"
  proxy: "95.173.218.66", // optional
});
res.json(hasil);
} catch(error){
  res.json(error);
}

      break;
    }

    case 'endertikdownload':{
const link = req.query.link;
if(!link) return res.json('link tidak boleh kosong');
if(!link.includes('tiktok.com')) return res.json('link salah');
try {
const hasil = await enderTikDl(link);
res.json(hasil);
} catch(error) {
res.json(error);
}
      break;
    }


















      
case 'serverinfo': {
  const os = require('os');
  
  // Function untuk CPU usage real-time dengan cache
  const getCpuUsage = () => {
    const cpus = os.cpus();
    
    // Hitung total waktu CPU untuk semua core
    let totalIdle = 0, totalTick = 0;
    
    cpus.forEach(cpu => {
      for (let type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    
    return { totalIdle, totalTick, timestamp: Date.now() };
  };

  // Simpan previous measurement
  if (!global.prevCpuMeasurement) {
    global.prevCpuMeasurement = getCpuUsage();
    // Return 0% untuk pertama kali
    var cpuUsagePercent = '0%';
  } else {
    // Ambil measurement sebelumnya dan sekarang
    const prev = global.prevCpuMeasurement;
    const current = getCpuUsage();
    
    // Hitung perbedaan waktu
    const idleDiff = current.totalIdle - prev.totalIdle;
    const totalDiff = current.totalTick - prev.totalTick;
    
    // Hitung CPU usage
    const usage = ((1 - idleDiff / totalDiff) * 100).toFixed(2);
    cpuUsagePercent = usage + '%';
    
    // Update previous measurement
    global.prevCpuMeasurement = current;
  }

  // RAM Usage - DIPERBAIKI dengan informasi lebih detail
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const ramUsagePercent = (usedMem / totalMem * 100).toFixed(2);
  
  // Tambahan: Memory breakdown
  const memBreakdown = {
    total: totalMem,
    used: usedMem,
    free: freeMem,
    buffers: os.freemem() - os.availablemem ? (os.availablemem() || 0) : 0, // Jika tersedia
    cached: 0 // Bisa ditambahkan jika ada info cache memory
  };
  
  // Format memory untuk display
  const formatMemory = (bytes) => {
    const gb = (bytes / 1024 / 1024 / 1024).toFixed(2);
    const mb = (bytes / 1024 / 1024).toFixed(0);
    const percent = ((bytes / totalMem) * 100).toFixed(1);
    return { gb: gb + ' GB', mb: mb + ' MB', percent: percent + '%', raw: bytes };
  };

  // CPU Info
  const cpus = os.cpus();
  const loadAvg = os.loadavg();
  
  // Current Time
  const now = new Date();
  
  const serverInfo = {
    status: true,
    timestamp: now.toISOString(),
    local_time: now.toLocaleString('id-ID', { 
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'long'
    }),
    
    // System Information
    system: {
      platform: os.platform(),
      architecture: os.arch(),
      operating_system: `${os.type()} ${os.release()}`,
      uptime: Math.floor(os.uptime()) + ' seconds',
      hostname: os.hostname()
    },
    
    // CPU Information - REAL-TIME!
    cpu: {
      brand: cpus[0]?.model,
      cores: cpus.length,
      speed: cpus[0]?.speed + ' MHz',
      usage_percent: cpuUsagePercent,
      usage: {
        load_1min: loadAvg[0],
        load_5min: loadAvg[1], 
        load_15min: loadAvg[2]
      },
      note: "CPU usage dihitung berdasarkan perbedaan antara request sebelumnya dan sekarang"
    },
    
    // Memory Information - DIPERBAIKI dengan detail lengkap
    memory: {
      // Total memory information
      total: formatMemory(totalMem).gb,
      used: formatMemory(usedMem).gb,
      free: formatMemory(freeMem).gb,
      
      // Usage percentages
      usage_percent: ramUsagePercent + '%',
      usage_mb: Math.round(usedMem / 1024 / 1024) + ' MB',
      
      // Detailed breakdown
      detailed: {
        total_bytes: totalMem,
        used_bytes: usedMem,
        free_bytes: freeMem,
        usage_percentage: parseFloat(ramUsagePercent),
        
        // Human readable formats
        human_readable: {
          total: formatMemory(totalMem).gb,
          used: formatMemory(usedMem).gb + ` (${formatMemory(usedMem).percent})`,
          free: formatMemory(freeMem).gb + ` (${formatMemory(freeMem).percent})`,
          available: formatMemory(freeMem + memBreakdown.buffers).gb
        },
        
        // Memory status
        status: ramUsagePercent > 90 ? 'CRITICAL' : 
                ramUsagePercent > 80 ? 'HIGH' : 
                ramUsagePercent > 60 ? 'MODERATE' : 'LOW'
      }
    },
    
    // Memory Statistics tambahan
    memory_stats: {
      // Physical memory usage
      physical: {
        total: formatMemory(totalMem).gb,
        used: formatMemory(usedMem).gb,
        free: formatMemory(freeMem).gb,
        usage: ramUsagePercent + '%'
      },
      
      // Swap memory (jika tersedia)
      swap: {
        total: '0 GB', // os.totalmem() tidak include swap di Node.js
        used: '0 GB',
        free: '0 GB',
        note: 'Swap memory tidak tersedia dalam environment ini'
      }
    },
    
    // Node.js Process Information
    process: {
      node_version: process.version,
      uptime: Math.floor(process.uptime()) + ' seconds',
      memory_usage: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
        heap_total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
        heap_used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB',
        array_buffers: Math.round(process.memoryUsage().arrayBuffers / 1024 / 1024) + ' MB'
      },
      pid: process.pid,
      // Process memory vs system memory comparison
      memory_comparison: {
        process_rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
        system_total: formatMemory(totalMem).gb,
        process_vs_system: (process.memoryUsage().rss / totalMem * 100).toFixed(2) + '%'
      }
    },
    
    // Performance Summary
    performance_summary: {
      cpu_usage: cpuUsagePercent,
      ram_usage: ramUsagePercent + '%',
      status: parseFloat(ramUsagePercent) > 90 || parseFloat(cpuUsagePercent) > 90 ? 'WARNING' : 'HEALTHY',
      recommendations: parseFloat(ramUsagePercent) > 80 ? 
        'RAM usage tinggi, pertimbangkan untuk optimasi' : 
        'System dalam kondisi normal'
    },
    
    // Vercel Environment
    environment: {
      vercel_region: process.env.VERCEL_REGION || 'Unknown',
      node_env: process.env.NODE_ENV || 'Unknown',
      vercel_url: process.env.VERCEL_URL || 'Unknown'
    }
  };
  
  res.json(serverInfo);
  break;
}
    case 'downloaderbot':{
const {tikdlbot} = require('./codenya/scraper.js');
const link = req.query.link;
try {
const hasilkan = await tikdlbot(link);
res.json(hasilkan);
} catch(e){
res.json(e);
}

      break;
    }

    case 'msdown':{
const link = req.query.link;
if(!link) return res.json('link tidak boleh kosong');
if(!link.includes('tiktok.com')) return res.json('link salah');
try {
const hasil = await tikdownmusdown(link);
res.json(hasil);
} catch(e) {
res.json(e);
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
