import fs from 'fs'

/**
 * Script para generar lista de URLs para testing de Open Graph
 */

async function generateTestUrls() {
  console.log('🔗 Generando URLs para testing Open Graph...\n')
  
  const baseUrl = 'https://novanews1.vercel.app'
  
  // Lista manual de posts (basada en la estructura que vimos)
  const posts = [
    'blockchain-2025-casos-de-usos-reales-aparte-de-las-criptomonedas',
    'ia-generativa-guia-completa-de-tecnologias-y-aplicaciones-practicas-en-2025',
    'top-herramientas-gratuitas-de-inteligencia-artificial'
  ]
  
  console.log('📝 URLs de Posts para Testing:\n')
  
  posts.forEach((post, index) => {
    const url = `${baseUrl}/blog/${post}/`
    console.log(`${index + 1}. ${url}`)
  })
  
  console.log('\n🧪 URLs de Testing Tools:\n')
  
  posts.forEach((post, index) => {
    const url = `${baseUrl}/blog/${post}/`
    const encodedUrl = encodeURIComponent(url)
    
    console.log(`\n--- Post ${index + 1}: ${post} ---`)
    console.log(`Facebook: https://developers.facebook.com/tools/debug/?q=${encodedUrl}`)
    console.log(`Twitter: https://cards-dev.twitter.com/validator?url=${encodedUrl}`)
    console.log(`LinkedIn: https://www.linkedin.com/post-inspector/?url=${encodedUrl}`)
    console.log(`OpenGraph.xyz: https://opengraph.xyz/url/${encodedUrl}`)
  })
  
  console.log('\n📊 Página de Debug Local:')
  console.log(`${baseUrl}/debug/banner-preview/`)
  console.log(`${baseUrl}/debug/og-test/`)
  
  console.log('\n💡 Pasos de verificación recomendados:')
  console.log('1. Verifica que las imágenes se cargan correctamente en el navegador')
  console.log('2. Usa Facebook Sharing Debugger para forzar re-scraping')
  console.log('3. Prueba compartir un enlace en WhatsApp a ti mismo')
  console.log('4. Verifica que los meta tags están correctos en el HTML fuente')
  console.log('5. Si hay problemas, agrega ?v=3 a las URLs para cache busting')
  
  // Generar archivo de texto con las URLs
  const urlList = posts.map(post => `${baseUrl}/blog/${post}/`).join('\n')
  const testContent = `# URLs para Testing Open Graph - NovaNews

## Posts
${urlList}

## Debug Pages
${baseUrl}/debug/banner-preview/
${baseUrl}/debug/og-test/

## Facebook Sharing Debugger
${posts.map(post => `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(`${baseUrl}/blog/${post}/`)}`).join('\n')}

## Twitter Card Validator
${posts.map(post => `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(`${baseUrl}/blog/${post}/`)}`).join('\n')}
`
  
  await fs.promises.writeFile('og-test-urls.txt', testContent)
  console.log('\n✅ Archivo og-test-urls.txt generado con todas las URLs')
}

generateTestUrls().catch(console.error)
