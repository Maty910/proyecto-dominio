const API_KEY = ""; // La API key se inyecta en el entorno de ejecución

export async function sendMessageToGemini(message: string) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: {
            parts: [{ text: "Eres un asistente virtual amable y servicial para un hotel llamado 'Hotel Now'. Tu objetivo es ayudar a los huéspedes con información sobre habitaciones, reservas y servicios del hotel. Responde de manera concisa y amigable." }]
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la petición a Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude entender tu consulta.";
  } catch (error) {
    console.error("Error al comunicarse con Gemini:", error);
    return "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente más tarde.";
  }
}