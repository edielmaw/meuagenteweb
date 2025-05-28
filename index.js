const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;

  console.log("📩 Corpo recebido:", JSON.stringify(data, null, 2));

  if (data.type === "ReceivedCallback" && data.text) {
    const numero = data.phone;
    const mensagem = "Olá! Recebemos sua mensagem e em breve retornaremos. 😉";

    try {
      const resposta = await axios.post(
        "https://api.z-api.io/instances/3E1D541989A4908E01239EE979D4A7C0/token/B8871F7CF06847251BD657DB/send-text",
        {
          phone: numero,
          message: mensagem
        }
      );

      console.log("✅ Mensagem enviada com sucesso:", resposta.data);
    } catch (erro) {
      console.error("❌ Erro ao enviar resposta:", erro.response?.data || erro.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
