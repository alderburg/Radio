
const sharp = require('sharp');
const fs = require('fs');

async function convertLogo() {
  try {
    await sharp('client/public/logo-aperte-play.png')
      .webp({ quality: 90 })
      .toFile('client/public/logo-aperte-play.webp');
    console.log('Logo converted to WebP successfully!');
  } catch (error) {
    console.error('Error converting logo:', error);
  }
}

convertLogo();
