
import sharp from 'sharp';

async function createPWAIcon() {
  try {
    // Carrega o favicon original - reduzido para 55% do tamanho final
    const favicon = await sharp('client/public/favicon.png')
      .resize(280, 280, { // Reduzido de 400 para 280 (55% de 512)
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();

    // Cria imagem 512x512 com fundo branco e favicon centralizado
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{
      input: favicon,
      gravity: 'center'
    }])
    .png()
    .toFile('client/public/pwa-icon-512.png');

    // Cria versão 192x192
    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([{
      input: await sharp('client/public/favicon.png')
        .resize(105, 105, { // Reduzido de 150 para 105 (55% de 192)
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toBuffer(),
      gravity: 'center'
    }])
    .png()
    .toFile('client/public/pwa-icon-192.png');

    console.log('✅ Ícones PWA criados com sucesso!');
    console.log('- pwa-icon-192.png');
    console.log('- pwa-icon-512.png');
  } catch (error) {
    console.error('❌ Erro ao criar ícones PWA:', error);
  }
}

createPWAIcon();
