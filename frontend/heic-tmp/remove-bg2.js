const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

(async () => {
  try {
    const inputPath = 'C:\\Users\\Bayzid\\portfolio\\public\\profile.jpg';
    const blob = await removeBackground(`file:///${inputPath.replace(/\\/g, '/')}`);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync('C:\\Users\\Bayzid\\portfolio\\public\\profile-cutout.png', buffer);
    console.log('Success');
  } catch (err) {
    console.error(err);
  }
})();
