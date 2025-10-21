import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Heart, Users, TrendingUp } from "lucide-react"

export const metadata = {
  title: "Sobre Nosotros | Boliches - Salta Capital",
  description: "La guía más completa para salir de joda en Salta. Precios actualizados de tragos, fernet y cerveza en todos los boliches de la capital salteña.",
  keywords: "guia boliches salta, vida nocturna salta, salir salta",
}

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Sobre <span className="text-primary">Nosotros</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              La historia detrás de este proyecto
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wine className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">¿Cómo nació este proyecto?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Todo comenzó con una experiencia personal. Como cualquier persona que sale a divertirse en Salta, 
                      me encontré varias veces en la situación de llegar a un boliche sin saber realmente cuánto iba a 
                      gastar en tragos. A veces terminaba pagando mucho más de lo esperado, otras veces descubrí que 
                      había opciones mejores a pocas cuadras.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-16">
                  Pero con el tiempo entendí que no se trataba solo de precios: también quería saber cómo era el ambiente 
                  de cada lugar, qué tipo de música sonaba, cuál era la onda del público y, en definitiva, cuál era el 
                  espacio que mejor encajaba con mis gustos para pasar una buena noche.
                </p>
                <p className="text-muted-foreground leading-relaxed ml-16 mt-4">
                  La frustración de no tener esta información básica antes de salir me llevó a pensar: ¿por qué no 
                  existe una plataforma donde pueda comparar precios, conocer la esencia de cada lugar y así tomar una 
                  decisión más acertada? Así nació<strong className="text-foreground"> Boliches - Salta Capital</strong>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">¿Quién está detrás?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Soy una persona del mundo de la informática, apasionada por resolver problemas reales con 
                      tecnología. Este no es un proyecto comercial ni tengo ninguna relación laboral con los boliches 
                      listados aquí. Simplemente soy alguien que, como vos, disfruta salir en Salta y quiere tomar 
                      mejores decisiones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Nuestra misión</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Queremos que la gente de Salta tenga acceso fácil y rápido a información sobre precios de tragos 
                      en diferentes boliches. No se trata solo de encontrar lo más barato, sino de poder planificar 
                      tu salida sabiendo qué esperar, sin sorpresas desagradables en la cuenta.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed ml-16">
                  Creemos que tener esta información disponible beneficia tanto a los clientes como a los boliches, 
                  ya que permite a las personas elegir según sus preferencias y presupuesto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Información y Actualizaciones</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      La información de precios se actualiza regularmente, pero es importante mencionar que{" "}
                      <strong className="text-foreground">los precios pueden variar</strong> y no siempre estar 
                      100% actualizados. Los boliches pueden cambiar sus precios sin previo aviso.
                    </p>
                  </div>
                </div>
                <div className="ml-16 mt-4 p-4 bg-secondary/50 rounded-lg">
                  <p className="font-semibold mb-2">¿Encontraste un error o precio desactualizado?</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ayudanos a mantener la información precisa. Podés reportar errores o colaborar con el proyecto:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> gapsar.sebastian@gmail.com</p>
                    <p>
                      <strong>WhatsApp:</strong>{" "}
                      <a 
                        href="https://wa.me/5493875750817" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        +54 9 3875 75-0817
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-8">
              <p className="text-muted-foreground">
                Este proyecto fue creado con <span className="text-red-500">♥</span> para la comunidad de Salta
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
