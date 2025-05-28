const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const body = req.body;
  const message = body.text?.message;
  const phone = body.phone;

  console.log('Mensagem recebida:', message);
  console.log('Número:', phone);

  if (!message || !phone) {
    return res.status(400).send({ error: 'Mensagem ou telefone ausente' });
  }

  try {
    await axios.post('https://api.z-api.io/instances/${instanceId}/token/${token}/send-text', {
      phone: phone,
      message: 'Olá! Recebemos sua mensagem: ' + message
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.send({ status: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.response?.data || error.message);
    res.status(500).send({ error: 'Erro ao enviar resposta' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor rodando com sucesso.');
});

app.listen(10000, () => {
  console.log('Servidor rodando na porta 10000');
});
