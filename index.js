const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

const Z_API_INSTANCE = '3E1D541989A4908E01239EE979D4A7C0';
const Z_API_TOKEN = 'B8871F7CF06847251BD657DB';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    const messageData = req.body;

    const phone = messageData?.phone;
    const text = messageData?.text?.message;

    if (!phone || !text) {
      console.log('⚠️ Número ou mensagem ausente');
      return res.sendStatus(200);
    }

    console.log('📩 Mensagem recebida:', text);
    console.log('📞 Número:', phone);

    const reply = `Recebemos sua mensagem: ${text}`;

    await axios.post(`https://api.z-api.io/instances/${Z_API_INSTANCE}/token/${Z_API_TOKEN}/send-text`, {
      phone,
      message: reply,
    });

    console.log('✅ Resposta enviada!');
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Erro ao responder mensagem:', error.response?.data || error.message);
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
