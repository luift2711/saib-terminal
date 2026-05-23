const fs = require('fs');
const path = require('path');
const https = require('https');

require('dotenv').config(); // Load biến từ file .env
const API_KEY = process.env.VITE_GEMINI_API_KEY || 'ĐIỀN_API_KEY_VÀO_ĐÂY';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const basePath = 'd:/AI_Trading_Apps/trading-gym/src/components/FlashCardsData';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateText(text, retries = 3) {
  const body = JSON.stringify({
    system_instruction: {
      parts: [{
        text: 'You are a professional translator specializing in trading and finance. Translate the following markdown text from Vietnamese to English. Keep all markdown formatting (frontmatter, bold, italic, lists, quotes, code blocks) intact. Do NOT add any extra commentary or wrap your output in ```markdown blocks, output strictly the translated markdown content. Maintain the original structure. Ensure accurate trading terminology (e.g. Stoploss, Take profit, Buy, Sell, Long, Short, FOMO, Breakout, etc.).'
      }]
    },
    contents: [{
      parts: [{ text: text }]
    }],
    generationConfig: {
      temperature: 0.1,
    }
  });

  return new Promise((resolve, reject) => {
    const req = https.request(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.error && json.error.code === 429) {
             if (retries > 0) {
               console.log("Rate limited. Waiting 20 seconds...");
               await delay(20000);
               resolve(await translateText(text, retries - 1));
             } else {
               reject(new Error("Rate limit exceeded"));
             }
             return;
          }
          if (json.candidates && json.candidates[0].content) {
            let result = json.candidates[0].content.parts[0].text;
            if (result.startsWith('```markdown')) {
               result = result.substring('```markdown'.length).trim();
               if (result.endsWith('```')) result = result.substring(0, result.length - 3).trim();
            }
            resolve(result);
          } else {
            console.error("API response error:", JSON.stringify(json).substring(0, 500));
            reject(new Error("Translation failed"));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function needsTranslation(text) {
  // Simple heuristic: if it contains Vietnamese characters
  return /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỵỷỹđ]/.test(text.toLowerCase());
}

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory() && entry.name.endsWith('_EN')) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (dirPath.includes('_EN')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (needsTranslation(content)) {
          console.log(`Translating ${fullPath}...`);
          try {
            const translated = await translateText(content);
            fs.writeFileSync(fullPath, translated, 'utf8');
            console.log(`Success: ${fullPath}`);
          } catch (err) {
            console.error(`Error translating ${fullPath}:`, err.message);
          }
          // Wait 5 seconds between successful API calls
          await delay(5000);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting translation process with retries...');
  const dirs = fs.readdirSync(basePath, { withFileTypes: true });
  for (const dir of dirs) {
    if (dir.isDirectory() && dir.name.endsWith('_EN')) {
      await processDirectory(path.join(basePath, dir.name));
    }
  }
  console.log('Finished translation process.');
}

run();
