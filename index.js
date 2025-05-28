const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 10000;

// Substitua pelos dados da sua instância Z-API:
const instanceId = '3E1D541989A4908E01239EE979D4A7C0';
const token = 'B8871F7CF06847251BD657DB';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.post('/webhook', async (req, res) => {
  console.log('Corpo recebido do Z-API:', JSON.stringify(req.body, null, 2));

  try {
    const { phone, message } = req.body;

    console.log(`Mensagem recebida: ${message}`);
    console.log(`Número: ${phone}`);

    if (!phone || !message) {
      console.log('⚠️ Número ou mensagem ausente');
      return res.sendStatus(200);
    }

    const resposta = await axios.post(
      `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`,
      {
        phone,
        message: `Recebemos sua mensagem: "${message}"`
      }
    );

    console.log('✅ Mensagem enviada com sucesso!');
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Erro ao responder mensagem:', error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
