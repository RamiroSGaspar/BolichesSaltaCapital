import { Wine, Linkedin, MessageCircle, Settings } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wine className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-card-foreground">Tragos Salta</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu guía definitiva para encontrar los mejores precios de tragos en la vida nocturna de Salta Capital.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#boliches" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Boliches
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Información</h3>
            <ul className="space-y-2">
              <li>
                <a href="/sobre-nosotros" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/terminos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Contacto</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Conectate conmigo para consultas o sugerencias
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/ramiro-sebastian-gaspar-b41697317/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5"  />
              </a>
              <a
                href="https://wa.me/5493875750817"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <p>© 2025 Tragos Salta. Todos los derechos reservados. Beber con moderación.</p>
            <a
              href="/admin/login"
              className="inline-flex items-center justify-center p-1.5 rounded-md hover:bg-secondary transition-colors opacity-30 hover:opacity-100"
              aria-label="Admin"
            >
              <Settings className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}