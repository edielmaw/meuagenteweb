const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const { message, phone } = req.body;
  console.log('Mensagem recebida:', message);
  console.log('Número:', phone);

  if (!message || !phone) {
    return res.status(400).send({ error: 'Mensagem ou telefone ausente' });
  }

  try {
    await axios.post('https://api.z-api.io/instances/3E1D541989A4908E01239EE979D4A7C0/token/B8871F7CF06847251BD657DB/send-message', {
      phone: phone,
      message: 'Olá! Recebemos sua mensagem: ' + message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.send({ status: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.response?.data || error.message);
    res.status(500).send({ error: 'Erro ao enviar resposta' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor rodando');
});

app.listen(10000, () => {
  console.log('Servidor rodando na porta 10000');
});
