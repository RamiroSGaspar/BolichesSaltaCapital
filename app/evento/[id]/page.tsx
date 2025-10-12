import { EventoPageClient } from "@/components/evento-page-client"

interface EventoPageProps {
  params: Promise<{ id: string }>
}

export default async function EventoPage({ params }: EventoPageProps) {
  const { id } = await params

  return <EventoPageClient eventoId={id} />
}
