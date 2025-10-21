import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export const metadata = {
  title: "Términos y Condiciones | Boliches - Salta Capital",
  description: "Términos de uso de Boliches - Salta Capital, tu guía de precios de boliches en Salta.",
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Términos y <span className="text-primary">Condiciones</span>
            </h1>
            <p className="text-muted-foreground">Última actualización: Octubre 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceptación de los Términos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Al acceder y utilizar Boliches - Salta Capital, aceptás estos términos y condiciones en su totalidad. 
                  Si no estás de acuerdo con alguna parte de estos términos, no deberías usar este sitio web.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Naturaleza del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Boliches - Salta Capital es una plataforma informativa que proporciona datos sobre precios de tragos en 
                  diferentes establecimientos de Salta Capital. Este servicio es:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Completamente gratuito</li>
                  <li>Independiente - no tenemos relación comercial con los boliches listados</li>
                  <li>De carácter informativo - no procesamos transacciones ni reservas</li>
                  <li>Mantenido de forma voluntaria</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Información de Precios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="font-semibold text-foreground">
                  IMPORTANTE: Los precios mostrados son referenciales y pueden no estar actualizados.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los establecimientos pueden cambiar sus precios sin previo aviso</li>
                  <li>No garantizamos la exactitud del 100% de la información</li>
                  <li>Los precios pueden variar según promociones, días especiales o eventos</li>
                  <li>Siempre consultá precios directamente con el establecimiento antes de consumir</li>
                </ul>
                <p className="mt-4">
                  <strong>No nos hacemos responsables</strong> por discrepancias entre los precios mostrados 
                  en nuestra plataforma y los precios reales cobrados en los establecimientos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Uso Apropiado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>Al usar Tragos Salta, te comprometés a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usar la información de manera responsable</li>
                  <li>No utilizar la plataforma para fines comerciales sin autorización</li>
                  <li>No intentar acceder de forma no autorizada a nuestros sistemas</li>
                  <li>No publicar contenido ofensivo o inapropiado</li>
                  <li>Respetar las leyes locales sobre consumo de alcohol</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Contenido de Terceros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Los nombres, logos y marcas de los establecimientos mostrados son propiedad de sus 
                  respectivos dueños. La inclusión de un establecimiento en nuestra plataforma no implica 
                  endorsement, patrocinio o afiliación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitación de Responsabilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Boliches - Salta Capital se proporciona "tal cual" sin garantías de ningún tipo. No nos hacemos 
                  responsables por:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Errores u omisiones en la información de precios</li>
                  <li>Cambios de precios no actualizados en la plataforma</li>
                  <li>Experiencias negativas en los establecimientos listados</li>
                  <li>Interrupciones del servicio o errores técnicos</li>
                  <li>Pérdida de datos o información</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Colaboración y Reportes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Alentamos a los usuarios a reportar precios incorrectos o desactualizados. Al enviar 
                  información, garantizás que:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>La información proporcionada es veraz</li>
                  <li>Tenés derecho a compartir dicha información</li>
                  <li>Nos otorgás permiso para usar la información en la plataforma</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Modificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                  serán efectivos inmediatamente después de su publicación en el sitio. El uso continuado 
                  del servicio después de cambios constituye aceptación de los nuevos términos.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
