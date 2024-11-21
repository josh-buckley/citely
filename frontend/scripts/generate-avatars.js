const fs = require('fs');
const https = require('https');
const path = require('path');

const avatars = [
  { name: 'sarah', seed: 'sarah789' },
  { name: 'michael', seed: 'michael901' },
  { name: 'james', seed: 'james789' },
  { name: 'elizabeth', seed: 'elizabeth567' }
];

const downloadAvatar = (name, seed) => {
  const url = `https://api.dicebear.com/7.x/avataaars/png?seed=${seed}&backgroundColor=b6e3f4`;
  const filePath = path.join(__dirname, '../public/avatars', `${name}.png`);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`Downloaded avatar for ${name}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading avatar for ${name}:`, err);
  });
};

avatars.forEach(({ name, seed }) => {
  downloadAvatar(name, seed);
});
