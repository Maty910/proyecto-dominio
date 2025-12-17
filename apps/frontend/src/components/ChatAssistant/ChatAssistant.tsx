import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendMessageToGemini } from '../../services/gemini'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// 1. Importamos useLocation para saber en qué página estamos
import { useLocation } from 'react-router-dom'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '¡Hola! Soy el asistente virtual de Hotel Now. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // 2. Hook para detectar la ruta
  const location = useLocation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 3. Lógica para ocultar el chat en Login y Register
  // Si estamos en alguna de estas rutas, no renderizamos NADA.
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  if (isAuthPage) return null

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
        const responseText = await sendMessageToGemini(inputText)
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'bot'
        }
        setMessages(prev => [...prev, botMessage])
    } catch (error) {
        // Manejo básico de error por si falla Gemini
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Lo siento, tuve un problema al procesar tu mensaje.",
            sender: 'bot'
        }
        setMessages(prev => [...prev, errorMessage])
    } finally {
        setIsLoading(false)
    }
  }

  return (
    // 4. Subimos el z-index a 60 (la Navbar tiene 50) para evitar conflictos visuales
    <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Asistente Hotel Now</h3>
                <p className="text-emerald-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  En línea
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm",
                      msg.sender === 'user'
                        ? "bg-emerald-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.sender === 'user' ? 'Tú' : 'Bot'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  )
}