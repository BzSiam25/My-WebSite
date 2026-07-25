const fs = require('fs');
const convert = require('heic-convert');
const path = require('path');

(async () => {
  try {
    const inputPath = 'C:\\Users\\Bayzid\\Downloads\\IMG_9057.HEIC';
    const outputPath = 'C:\\Users\\Bayzid\\portfolio\\public\\profile.jpg';
    
    console.log('Reading file...');
    const inputBuffer = fs.readFileSync(inputPath);
    
    console.log('Converting...');
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1           // the jpeg compression quality, between 0 and 1
    });

    console.log('Writing file...');
    fs.writeFileSync(outputPath, Buffer.from(outputBuffer));
    console.log('Success!');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
})();
