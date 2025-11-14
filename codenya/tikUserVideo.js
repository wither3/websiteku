const { request } = require('undici');
const { decompress } = require('@mongodb-js/zstd');
const zlib = require('zlib');

async function getTiktokVideo(profileName) {
  try {
    const { body, headers, statusCode } = await request(
      'https://tools.xrespond.com/api/tiktok/profile/videos',
      {
        method: 'POST',
        body: JSON.stringify({ profile: profileName }),
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'origin': 'https://tikviewr.com',
          'referer': 'https://tikviewr.com/',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'accept-encoding': 'gzip, deflate, br, zstd'
        }
      }
    );

    // Buffer hasil body
    const buffer = Buffer.from(await body.arrayBuffer());

    const encoding = headers['content-encoding'] || "";
    let text;

    if (encoding.includes('zstd')) {
      const decompressed = await decompress(buffer);
      text = decompressed.toString('utf-8');

    } else if (encoding.includes('gzip')) {
      text = zlib.gunzipSync(buffer).toString('utf-8');

    } else if (encoding.includes('deflate')) {
      text = zlib.inflateSync(buffer).toString('utf-8');

    } else {
      text = buffer.toString('utf-8');
    }

    const json = JSON.parse(text);
    console.log(json);
    return json;

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

module.exports = getTiktokVideo;
