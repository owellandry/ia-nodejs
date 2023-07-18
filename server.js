const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const axios = require('axios');

const apiKey = 'TU_CLAVE_API'; // Reemplaza con tu clave de API de OpenAI

// Servir la página web
app.use(express.static('public'));

// Endpoint para manejar las solicitudes de voz al servidor
app.post('/voice', express.json(), async (req, res) => {
  const { voiceMessage } = req.body;
  try {
    // Llamar a la función que procesa el mensaje de voz usando la API de OpenAI
    const botResponse = await processVoiceMessage(voiceMessage);
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error en la solicitud de voz:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud de voz.' });
  }
});

// Función para procesar el mensaje de voz usando la API de OpenAI
async function processVoiceMessage(voiceMessage) {
  // Aquí puedes usar la biblioteca o API de tu elección para realizar el procesamiento del lenguaje natural con el mensaje de voz recibido.
  // Por ejemplo, si estás utilizando la API de GPT-3 de OpenAI, puedes hacer una solicitud similar a la que mencioné en el ejemplo anterior.
  // Recuerda adaptar la solicitud según la API que elijas.
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: voiceMessage,
    max_tokens: 150,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  return response.data.choices[0].text.trim();
}

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Manejar conexiones de socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado.');

  // Escuchar el evento de envío de mensajes de voz desde el cliente
  socket.on('voiceMessage', async (data) => {
    try {
      const botResponse = await processVoiceMessage(data.message);
      socket.emit('botResponse', { response: botResponse });
    } catch (error) {
      console.error('Error en la solicitud de voz:', error);
      socket.emit('botResponse', { response: 'Error al procesar la solicitud de voz.' });
    }
  });

  // Manejar desconexiones de socket.io
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
  });
});
