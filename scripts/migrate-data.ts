import { createClient } from '@supabase/supabase-js'
import { boliches, tragos, eventos, preciosPorBoliche } from '../lib/data'

// Hardcodea temporalmente tus credenciales aquí
const supabase = createClient(
  'https://persfsiffyjstxikhhzw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcnNmc2lmZnlqc3R4aWtoaHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDgyNTcsImV4cCI6MjA3NTk4NDI1N30.8BtgYL-S4oiS0Yl2EM1buTk9FIPt-4iw5taxHCxZxQw'
)

async function migrateData() {
  console.log('🚀 Migrando datos a Supabase...')

  // Migrar boliches
  console.log('📍 Migrando boliches...')
  const { error: bolicheError } = await supabase.from('boliches').insert(
    boliches.map(b => ({
      id: b.id,
      name: b.name,
      image: b.image,
      night_theme: b.nightTheme,
      dj: b.dj,
      instagram: b.instagram,
      location: b.location,
      description: b.description,
      barrio: b.barrio,
      telefono: b.telefono,
      horario: b.horario,
      dias_abierto: b.diasAbierto,
      destacado: b.destacado,
      direccion_completa: b.direccionCompleta
    }))
  )
  if (bolicheError) console.error('Error boliches:', bolicheError)
  else console.log('✅ Boliches migrados')

  // Migrar tragos
  console.log('🍹 Migrando tragos...')
  const { error: tragoError } = await supabase.from('tragos').insert(
    tragos.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category,
      price: t.price,
      description: t.description,
      alcoholic: t.alcoholic,
      disponible: t.disponible,
      happy_hour_horario: t.happyHour?.horario,
      happy_hour_precio: t.happyHour?.precio
    }))
  )
  if (tragoError) console.error('Error tragos:', tragoError)
  else console.log('✅ Tragos migrados')

  // Migrar eventos
  console.log('🎉 Migrando eventos...')
  const { error: eventoError } = await supabase.from('eventos').insert(
    eventos.map(e => ({
      id: e.id,
      nombre: e.nombre,
      poster: e.poster,
      boliche_id: e.bolicheId,
      boliche: e.boliche,
      fecha: e.fecha.toISOString().split('T')[0],
      hora: e.hora,
      djs: e.djs,
      tematica: e.tematica,
      precio: e.precio,
      destacado: e.destacado,
      descripcion: e.descripcion,
      precios_especiales: e.preciosEspeciales,
      promos: e.promos
    }))
  )
  if (eventoError) console.error('Error eventos:', eventoError)
  else console.log('✅ Eventos migrados')

  // Migrar precios
  console.log('💰 Migrando precios...')
  const { error: precioError } = await supabase.from('precios_por_boliche').insert(
    preciosPorBoliche.map(p => ({
      boliche_id: p.bolicheId,
      trago_id: p.tragoId,
      precio: p.precio,
      disponible: p.disponible
    }))
  )
  if (precioError) console.error('Error precios:', precioError)
  else console.log('✅ Precios migrados')

  console.log('✅ Migración completa')
}

migrateData()