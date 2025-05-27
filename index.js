const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const msg = req.body.message;
  const phone = req.body.phone;

  console.log('Mensagem recebida:', msg);

  // Mensagem de resposta
  const resposta = 'Olá! Recebemos sua mensagem. Em breve retornaremos.';

  // Enviar mensagem de volta pela Z-API
  await axios.post('https://api.z-api.io/instance000000/send-text', {
    phone,
    message: resposta
  }, {
    headers: {
      'Authorization': 'Bearer SUA_API_KEY_AQUI'
    }
  });

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
