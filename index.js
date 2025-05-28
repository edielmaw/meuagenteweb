const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const data = req.body;
  console.log("📬 Corpo recebido: ", data);

  const message = data?.text?.message;
  const phone = data?.phone; // Número que enviou a mensagem
  const instanceId = data?.instanceId;

  if (!message || !phone || !instanceId) {
    console.log("❌ Dados incompletos");
    return res.sendStatus(400);
  }

  // Troque o número abaixo pelo correto e válido com 11 dígitos
  const numeroDestino = "5541996740365";

  try {
    const response = await axios.post(
      `https://api.z-api.io/instances/${instanceId}/token/B8871F7CF06847251BD657DB/send-text`,
      {
        phone: numeroDestino,
        message: `Mensagem recebida: ${message}\nNúmero: ${phone}`
      }
    );

    console.log("✅ Mensagem enviada com sucesso", response.data);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Erro ao enviar resposta:", error.message);
    res.sendStatus(500);
  }
});

app.listen(10000, () => {
  console.log('✅ Servidor rodando na porta 10000');
});
