import { useState } from "react"
import { MapPin, Phone, Mail, Send, Loader2, MessageSquare } from "lucide-react"
// IMPORTANTE: Importá la imagen así para que React la procese bien
// Si esto te tira error, mové la imagen a la carpeta 'public' y usá src="/assets/map.png"
import mapImage from "../assets/map.png" 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setStatus("idle"), 3000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    // CAMBIO CLAVE: Agregamos 'relative z-10 bg-background' para tapar cualquier fondo raro del body
    <section className="bg-background py-20 min-h-screen flex items-center relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Encabezado */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 tracking-tight">
            Estamos acá para <span className="text-primary">ayudarte</span>
          </h2>
          <p className="text-lg text-secondary/70 leading-relaxed">
            ¿Tenés dudas sobre tu reserva o querés organizar un evento especial? 
            Escribinos y nuestro equipo te responderá a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Tarjeta de Info */}
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-secondary mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" size={24} />
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Ubicación</p>
                    <p className="text-secondary/70 text-sm">Av. Libertador 1234, CABA, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Teléfono</p>
                    <p className="text-secondary/70 text-sm">+54 11 4444-5555</p>
                    <p className="text-secondary/50 text-xs mt-1">Lunes a Viernes, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Email</p>
                    <p className="text-secondary/70 text-sm">reservas@hotelnow.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa con imagen corregida */}
            <div className="bg-secondary rounded-2xl overflow-hidden shadow-lg h-64 relative group">
              <img 
                src={mapImage} // Usamos la variable importada
                alt="Mapa ubicación" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a 
                  href="https://goo.gl/maps/placeholder" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-secondary px-6 py-2 rounded-full font-semibold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <MapPin size={16} className="text-primary" />
                  Ver en Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-surface p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-secondary mb-2">Envianos un mensaje</h3>
              <p className="text-secondary/60 mb-8 text-sm">Completá el formulario y te contactaremos lo antes posible.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-secondary">Nombre completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-secondary">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hola@ejemplo.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-secondary">Asunto</label>
                  <select 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange as any}
                    className="input-field cursor-pointer"
                  >
                    <option value="" disabled>Seleccioná un motivo</option>
                    <option value="reserva">Consulta sobre Reserva</option>
                    <option value="eventos">Eventos corporativos</option>
                    <option value="prensa">Prensa / Medios</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-secondary">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribí tu mensaje acá..."
                    className="input-field resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer
                    ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}
                  `}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Enviando...
                    </>
                  ) : status === 'success' ? (
                    <>
                      ¡Mensaje Enviado!
                    </>
                  ) : (
                    <>
                      Enviar Mensaje <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}