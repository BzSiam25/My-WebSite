const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

(async () => {
  try {
    console.log('Starting background removal...');
    const inputPath = 'C:\\Users\\Bayzid\\portfolio\\public\\profile.jpg';
    const imageBuffer = fs.readFileSync(inputPath);
    
    console.log('Processing image...');
    const blob = await removeBackground(imageBuffer);
    
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const outputPath = 'C:\\Users\\Bayzid\\portfolio\\public\\profile-cutout.png';
    fs.writeFileSync(outputPath, buffer);
    console.log('Background removed successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
})();
