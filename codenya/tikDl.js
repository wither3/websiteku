const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const ttDL = require('./ttdl');

async function tikdownloader(link) {
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

async function tikDl(link) {
  try {
    // Ambil data RapidAPI terlebih dahulu
    const rapidapiData = await ttDL(link);
    const apiResult = JSON.parse(rapidapiData);
    const data = apiResult.data || {};

    // Deteksi apakah konten adalah slide (ada array images)
    const isSlide = Array.isArray(data.images) && data.images.length > 0;

    // Jika bukan slide, baru panggil tikdownloader (video)
    const tikdownData = isSlide ? { downloads: [] } : await tikdownloader(link);

    const hasilnya = {
      modifiedBy: 'rullzNPC',
      tipe: isSlide ? 'slide' : 'video',
      status: apiResult.msg || 'success',
      info: {
        id: data.id,
        region: data.region,
        durasi: `${data.duration}s`,
        waktu_buat: data.create_time
      },
      author: {
        id: data.author?.id,
        username: data.author?.unique_id,
        nickname: data.author?.nickname,
        avatar: data.author?.avatar
      },
      video: {
        judul: data.title,
        cover: data.cover,
        dynamic_cover: data.ai_dynamic_cover,
        origin_cover: data.origin_cover,
        resolusi: data.hd_size ? `${Math.round(data.hd_size / 1024 / 1024)} MB` : null,
        play: data.play,
        hdplay: data.hdplay,
        wmplay: data.wmplay
      },
      music: {
        judul: data.music_info?.title,
        author: data.music_info?.author,
        durasi: `${data.music_info?.duration}s`,
        cover: data.music_info?.cover,
        audio_url: data.music,
        play: data.music_info?.play
      },
      statistik: {
        views: data.play_count,
        likes: data.digg_count,
        komentar: data.comment_count,
        share: data.share_count,
        disimpan: data.collect_count
      },
      slide: isSlide ? data.images : null, // hanya muncul jika slide
      backup: {
        sumber: 'tikdownloader.io',
        videoSD: tikdownData.downloads[0],
        videoHD: tikdownData.downloads[1],
        mp3: tikdownData.downloads[2]
      }
    };

    
    return hasilnya;
  } catch (e) {
    console.error(e);
  }
}

module.exports = tikDl