const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const instanceId = '3E1D541989A4908E01239EE979D4A7C0';
const token = 'B8871F7CF06847251BD657DB';
const apiUrl = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;

app.post('/webhook', async (req, res) => {
  const data = req.body;

  // Verifica se há uma mensagem recebida
  if (data && data.message && data.phone) {
    const phone = data.phone;
    const mensagemRecebida = data.message;

    console.log(`Mensagem recebida de ${phone}: ${mensagemRecebida}`);

    // Define a resposta automática
    const respostaAutomatica = `Olá! Recebemos sua mensagem: "${mensagemRecebida}"`;

    try {
      // Envia a resposta automática via API da Z-API
      const response = await axios.post(apiUrl, {
        phone,
        message: respostaAutomatica,
      });

      console.log('Mensagem enviada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
