#!/usr/bin/env node

/**
 * Script para generar URLs de test para validar Open Graph en redes sociales
 */

const SITE_URL = 'https://novanews1.vercel.app';

const posts = [
  'blockchain-2025-casos-de-usos-reales-aparte-de-las-criptomonedas',
  'ia-generativa-guia-completa-de-tecnologias-y-aplicaciones-practicas-en-2025',
  'top-herramientas-gratuitas-de-inteligencia-artificial',
  'ia-predice-psg-vs-real-madrid'
];

console.log('🚀 URLs para probar en validadores de Open Graph:\n');

console.log('📱 FACEBOOK/META DEBUGGER:');
console.log('https://developers.facebook.com/tools/debug/\n');

console.log('🐦 TWITTER CARD VALIDATOR:');
console.log('https://cards-dev.twitter.com/validator\n');

console.log('🔗 LINKEDIN POST INSPECTOR:');
console.log('https://www.linkedin.com/post-inspector/\n');

console.log('📋 URLs DE LOS POSTS PARA PROBAR:\n');

posts.forEach((postSlug, index) => {
  const postUrl = `${SITE_URL}/blog/${postSlug}/`;
  const imageName = getImageName(postSlug);
  const imageUrl = imageName.startsWith('_astro/') 
    ? `${SITE_URL}/${imageName}`
    : `${SITE_URL}/og-images/${imageName}`;
  
  console.log(`${index + 1}. POST: ${postSlug}`);
  console.log(`   URL del post: ${postUrl}`);
  console.log(`   URL de la imagen: ${imageUrl}`);
  console.log(`   Prueba directa: ${imageUrl}`);
  console.log('');
});

function getImageName(postSlug) {
  const imageMap = {
    'blockchain-2025-casos-de-usos-reales-aparte-de-las-criptomonedas': 'blockchain-banner.jpg',
    'ia-generativa-guia-completa-de-tecnologias-y-aplicaciones-practicas-en-2025': 'ia-generativa-banner.jpg',
    'top-herramientas-gratuitas-de-inteligencia-artificial': 'herramientas-ia-banner.jpg',
    'ia-predice-psg-vs-real-madrid': '_astro/banner.Dyt9SQLt.png'
  };
  
  return imageMap[postSlug] || 'blockchain-banner.jpg';
}

console.log('🔍 PASOS PARA VERIFICAR:\n');
console.log('1. Copia las URLs del post en los validadores de arriba');
console.log('2. Verifica que aparezca la imagen correspondiente');
console.log('3. Si no aparece, prueba la URL directa de la imagen');
console.log('4. Si la imagen directa funciona pero no en el validador,');
console.log('   puede ser un problema de cache. Intenta de nuevo en unos minutos.\n');

console.log('💡 TIPS:');
console.log('- Facebook/Meta cache pueden tardar hasta 24 horas en actualizarse');
console.log('- Twitter suele actualizar más rápido');
console.log('- Si sigues teniendo problemas, verifica que las imágenes sean accesibles públicamente');
console.log('- Las imágenes OG deben ser al menos 1200x630 píxeles para mejores resultados\n');
