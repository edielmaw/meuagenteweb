const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const mensagem = req.body.text?.message;
  const numero = req.body.phone;

  console.log('Mensagem recebida:', mensagem);
  console.log('Número:', numero);

  if (!mensagem || !numero) {
    return res.status(400).send('Dados incompletos');
  }

  try {
    const resposta = await axios.post(
      'https://api.z-api.io/instances/3E1D541989A4908E01239EE979D4A7C0/token/B8871F7CF06847251BD657DB/send-text',
      {
        phone: numero,
        message: 'Obrigado pela sua mensagem! Em breve um atendente responderá.'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': 'B8871F7CF06847251BD657DB'
        }
      }
    );

    console.log('Resposta enviada com sucesso');
    res.status(200).send('Mensagem enviada!');
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.response?.data || error.message);
    res.status(500).send('Erro ao enviar resposta');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
