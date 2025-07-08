import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

/**
 * Script para optimizar imágenes banner para Open Graph
 * Convierte y redimensiona imágenes a formato óptimo para redes sociales
 */

const OPTIMAL_WIDTH = 1200
const OPTIMAL_HEIGHT = 630
const MAX_FILE_SIZE = 1024 * 1024 // 1MB

async function optimizeImage(inputPath: string) {
  const dir = path.dirname(inputPath)
  const ext = path.extname(inputPath)
  const name = path.basename(inputPath, ext)
  
  // Crear nombre del archivo optimizado (cambiar a .jpg para mejor compresión)
  const outputPath = path.join(dir, `${name}-og.jpg`)
  
  try {
    console.log(`🔄 Optimizando: ${inputPath}`)
    
    // Obtener información de la imagen original
    const metadata = await sharp(inputPath).metadata()
    const originalSize = fs.statSync(inputPath).size
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${Math.round((originalSize / 1024 / 1024) * 100) / 100}MB`)
    
    // Optimizar la imagen
    let quality = 85
    let buffer: Buffer
    
    do {
      buffer = await sharp(inputPath)
        .resize(OPTIMAL_WIDTH, OPTIMAL_HEIGHT, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: quality,
          progressive: true
        })
        .toBuffer()
      
      quality -= 5
    } while (buffer.length > MAX_FILE_SIZE && quality > 50)
    
    // Guardar el archivo optimizado
    await fs.promises.writeFile(outputPath, buffer)
    
    const finalSize = Math.round((buffer.length / 1024 / 1024) * 100) / 100
    console.log(`   ✅ Optimizado: ${OPTIMAL_WIDTH}x${OPTIMAL_HEIGHT}, ${finalSize}MB, calidad: ${quality + 5}%`)
    
    return outputPath
    
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error)
    return null
  }
}

// Lista manual de imágenes para optimizar
const imagesToOptimize = [
  'src/content/blog/blockchain-2025-casos-de-usos-reales-aparte-de-las-criptomonedas/banner.png',
  'src/content/blog/ia-generativa-guia-completa-de-tecnologias-y-aplicaciones-practicas-en-2025/banner.png',
  'src/content/blog/top-herramientas-gratuitas-de-inteligencia-artificial/banner.png'
]

async function main() {
  console.log('� Iniciando optimización de imágenes banner...\n')
  
  for (const imagePath of imagesToOptimize) {
    if (fs.existsSync(imagePath)) {
      await optimizeImage(imagePath)
      console.log('')
    } else {
      console.log(`⚠️ No se encontró: ${imagePath}`)
    }
  }
  
  console.log('✨ Optimización completada!')
  console.log('\n💡 Próximos pasos:')
  console.log('1. Actualiza los archivos MDX para usar las versiones optimizadas (-og.jpg)')
  console.log('2. Las imágenes optimizadas son exactamente 1200x630px')
  console.log('3. Están bajo 1MB para máxima compatibilidad con redes sociales')
}

main().catch(console.error)
