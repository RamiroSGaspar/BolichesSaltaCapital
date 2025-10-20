import { MetadataRoute } from 'next'
import { getAllBoliches } from '@/lib/api/boliches'
import { getAllEventos } from '@/lib/api/eventos'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tragossalta.com' // Cambiar por tu dominio real
  
  const boliches = await getAllBoliches()
  const eventos = await getAllEventos()

  const bolicheUrls = boliches.map((boliche) => ({
    url: `${baseUrl}/boliche/${boliche.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const eventoUrls = eventos.map((evento) => ({
    url: `${baseUrl}/evento/${evento.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...bolicheUrls,
    ...eventoUrls,
  ]
}