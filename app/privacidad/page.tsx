import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad | Boliches - Salta Capital",
  description: "Cómo protegemos tu información en Boliches - Salta Capital.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Política de <span className="text-primary">Privacidad</span>
            </h1>
            <p className="text-muted-foreground">Última actualización: Octubre 2025</p>
          </div>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Nuestro Compromiso</h3>
                    <p className="text-muted-foreground">
                      En Boliches - Salta Capital, respetamos tu privacidad. Esta política explica qué información 
                      recopilamos (o mejor dicho, qué NO recopilamos) y cómo la manejamos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  1. Información que NO Recopilamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Boliches - Salta Capital NO requiere registro de usuarios.
                </p>
                <p>No recopilamos ni almacenamos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nombres, apellidos o datos personales identificables</li>
                  <li>Direcciones de email (excepto si nos contactás voluntariamente)</li>
                  <li>Números de teléfono</li>
                  <li>Información de tarjetas de crédito o pago</li>
                  <li>Contraseñas o credenciales de acceso</li>
                  <li>Ubicación GPS precisa</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  2. Información Técnica Automática
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Como la mayoría de sitios web, nuestro servidor puede registrar automáticamente:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dirección IP (de forma anónima)</li>
                  <li>Tipo de navegador y sistema operativo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Referencia de dónde llegaste al sitio</li>
                </ul>
                <p className="mt-3">
                  Esta información es utilizada únicamente para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mejorar el funcionamiento del sitio</li>
                  <li>Detectar y prevenir errores técnicos</li>
                  <li>Entender qué contenido es más útil para los usuarios</li>
                </ul>
                <p className="mt-3 font-semibold text-foreground">
                  Esta información NO se vincula a tu identidad personal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Utilizamos cookies mínimas y esenciales para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Recordar tus preferencias de tema (claro/oscuro)</li>
                  <li>Mantener la funcionalidad básica del sitio</li>
                </ul>
                <p className="mt-3">
                  NO utilizamos cookies de seguimiento publicitario de terceros. Podés deshabilitar las 
                  cookies en tu navegador, aunque esto puede afectar algunas funcionalidades del sitio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Publicidad (Google AdSense)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Este sitio puede mostrar anuncios a través de Google AdSense. Google puede utilizar 
                  cookies para mostrar anuncios basados en tus visitas previas a este u otros sitios web.
                </p>
                <p className="mt-3">
                  Podés optar por no participar en la publicidad personalizada visitando{" "}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Configuración de anuncios de Google
                  </a>.
                </p>
                <p className="mt-3 text-sm">
                  Para más información sobre cómo Google maneja datos, consultá su{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Política de Privacidad
                  </a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  5. Contacto Voluntario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Si elegís contactarnos por email o WhatsApp para reportar errores o sugerir mejoras:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tu información de contacto se usará únicamente para responder tu consulta</li>
                  <li>NO compartiremos tu información con terceros</li>
                  <li>NO te agregaremos a listas de correo sin tu consentimiento explícito</li>
                  <li>Podés solicitar la eliminación de tu información en cualquier momento</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Enlaces a Sitios de Terceros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Nuestro sitio puede contener enlaces a redes sociales de los establecimientos 
                  (Instagram, etc.). No somos responsables de las prácticas de privacidad de estos 
                  sitios externos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Aunque no manejamos información personal sensible, implementamos medidas de seguridad 
                  razonables para proteger nuestro sitio y la información técnica que pueda recopilarse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Menores de Edad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Este sitio proporciona información sobre establecimientos que sirven alcohol. No está 
                  dirigido intencionalmente a menores de 18 años. No recopilamos conscientemente 
                  información de menores.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Tus Derechos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>Tenés derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Saber qué información tenemos (prácticamente ninguna)</li>
                  <li>Solicitar la eliminación de cualquier información que hayas compartido</li>
                  <li>Optar por no recibir comunicaciones</li>
                  <li>Navegar el sitio de forma anónima</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Cambios a esta Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Podemos actualizar esta política ocasionalmente. La fecha de "última actualización" 
                  al inicio indica cuándo se realizó la última modificación. Te recomendamos revisar 
                  esta página periódicamente.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Resumen:</strong> Respetamos tu privacidad. No recopilamos 
                información personal, no vendemos datos, y usamos la información mínima necesaria para que 
                el sitio funcione correctamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
