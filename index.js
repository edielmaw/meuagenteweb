const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  console.log("📩 Corpo recebido:", req.body);

  const message = req.body?.text?.message;
  const phone = req.body?.phone;

  if (!message || !phone) {
    return res.status(200).send("Mensagem ignorada");
  }

  console.log("📨 Mensagem recebida:", message);
  console.log("📞 Número:", phone);

  try {
    await axios.post(
      "https://api.z-api.io/instances/3E1D541989A4908E01239EE979D4A7C0/token/B8871F7CF06847251BD657DB/send-text",
      {
        phone,
        message: "Olá! 👋 Recebemos sua mensagem e logo retornaremos.",
      }
    );

    console.log("✅ Mensagem enviada com sucesso!");
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Erro ao enviar resposta:", error?.response?.data || error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Servidor ativo para o agente do WhatsApp!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
