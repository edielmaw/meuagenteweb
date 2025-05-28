const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const data = req.body;
  console.log('Corpo recebido do Z-API:', JSON.stringify(data, null, 2));

  try {
    const phone = data.phone || data?.message?.phone;
    const message = data.text?.message || data?.message?.text?.body;

    if (!phone || !message) {
      console.log('⚠️ Número ou mensagem ausente');
      return res.sendStatus(200);
    }

    console.log('Mensagem recebida:', message);
    console.log('Número:', phone);

    const instance = '3E1D541989A4908E01239EE979D4A7C0';
    const token = 'B8871F7CF06847251BD657DB';

    await axios.post(`https://api.z-api.io/instances/${instance}/token/${token}/send-text`, {
      phone,
      message: 'Recebido com sucesso! ✅'
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao responder mensagem:', error.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});