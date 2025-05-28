const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

// Substitua pelos seus dados reais da Z-API:
const instanceId = '3E1D541989A4908E01239EE979D4A7C0';
const token = 'B8871F7CF06847251BD657DB';

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;

  try {
    const phone = body.phone;
    const message = body?.text?.message;

    console.log('Número:', phone);
    console.log('Mensagem recebida:', message);

    if (!phone || !message) {
      return res.status(400).send('Telefone ou mensagem ausentes');
    }

    const resposta = await axios.post(
      `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`,
      {
        phone,
        message: `Recebemos sua mensagem: "${message}"`
      }
    );

    console.log('Mensagem enviada com sucesso');
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao responder mensagem:', error.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
