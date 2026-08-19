const key = process.argv[2];
const https = require('https');

https.get('https://generativelanguage.googleapis.com/v1beta/models?key=' + key, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.models) {
        const models = parsed.models.map(m => m.name);
        console.log('Available models:', models.join(', '));
      } else {
        console.log('Parsed data:', parsed);
      }
    } catch(e) {
      console.log('Raw response:', data);
    }
  });
}).on('error', e => console.error(e));
