// Herramienta para generar enlaces internos automáticos
export function generateInternalLinks(content: string, allPosts: any[]) {
  const keywords = [
    'inteligencia artificial',
    'blockchain', 
    'computación cuántica',
    'ciberseguridad',
    'devops',
    'machine learning'
  ]
  
  let processedContent = content
  
  keywords.forEach(keyword => {
    const relatedPost = allPosts.find(post => 
      post.data.title.toLowerCase().includes(keyword) ||
      post.data.tags?.some((tag: string) => tag.toLowerCase().includes(keyword))
    )
    
    if (relatedPost) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      processedContent = processedContent.replace(regex, 
        `[${keyword}](/blog/${relatedPost.id})`
      )
    }
  })
  
  return processedContent
}
