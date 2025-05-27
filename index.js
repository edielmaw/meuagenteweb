const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;

  // Log para verificar o conteúdo recebido
  console.log('📦 Corpo recebido:', JSON.stringify(body, null, 2));

  const msg = body?.text?.message || '';
  const phone = body?.phone || ''; // <- Agora sim, o número correto

  console.log('Mensagem recebida:', msg);
  console.log('Número:', phone);

  const resposta = 'Olá! Recebemos sua mensagem. Em breve retornaremos.';

  try {
    await axios.post('https://api.z-api.io/instances/3E1D541989A4908E01239EE979D4A7C0/token/B8871F7CF06847251BD657DB/send-text', {
      phone,
      message: resposta
    });

    res.sendStatus(200);
  } catch (err) {
    console.error('Erro ao enviar resposta:', err.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
