const https = require("https");

async function tokdl(url) {
  return new Promise((resolve, reject) => {
    
    const apiKeys = [
      "2d8efbca6cmshba7782a3d1b31bcp160901jsn1b8edec486b4", 
      "44114406bbmshdee24010b885bc0p140418jsn3d9caf51b4b3", 
      "afba42893fmsha63e4a70440e54dp1d25a3jsn2511b8314ddb", 
      "51108976e0msh384d28ba5d1e6d1p1b8004jsn5936a5b68d2d",
      
"dcf96b6097mshca0ccac02362b02p12aa32jsn3d3e431ed278",

"181a3b1233mshad025fe3f4413afp16f9e9jsne749f10e4adb",
    ];

    // 🔹 Pilih API key secara acak
    const randomKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    const encodedUrl = encodeURIComponent(url);
    const options = {
      method: "GET",
      hostname: "tiktok-download5.p.rapidapi.com",
      port: null,
      path: `/getVideo?url=${encodedUrl}&hd=1`,
      headers: {
        "x-rapidapi-key": randomKey,
        "x-rapidapi-host": "tiktok-download5.p.rapidapi.com",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve({
            success: true,
            usedKey: randomKey,
            result: json,
          });
        } catch (err) {
          reject(new Error("Gagal parse JSON: " + err.message));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}
module.exports = tokdl;