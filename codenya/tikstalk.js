const axios = require('axios');
const { decompress } = require('@mongodb-js/zstd');
const zlib = require('zlib');

async function getTiktokProfile(profileName) {
  try {
    const response = await axios.post(
      'https://tools.xrespond.com/api/tiktok/profile/details',
      { profile: profileName },
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'origin': 'https://tikviewr.com',
          'referer': 'https://tikviewr.com/',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'accept-encoding': 'gzip, deflate, br, zstd',
        },
        responseType: 'arraybuffer',
      }
    );

    const encoding = response.headers['content-encoding'];
    let buffer = response.data;
    let text;

    if (encoding === 'zstd') {
      // ✅ Dekompres dengan @mongodb-js/zstd
      const decompressed = await decompress(Buffer.from(buffer));
      text = decompressed.toString('utf-8');
    } else if (encoding === 'gzip') {
      text = zlib.gunzipSync(buffer).toString('utf-8');
    } else if (encoding === 'deflate') {
      text = zlib.inflateSync(buffer).toString('utf-8');
    } else {
      text = Buffer.from(buffer).toString('utf-8');
    }

    const json = JSON.parse(text);
    const hasilnya = JSON.stringify(json, null, 2);

console.log(hasilnya);
    return hasilnya;
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
  }
}

// Contoh penggunaan
module.exports = getTiktokProfile;
