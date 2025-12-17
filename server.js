const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-video-diffusion-img2vid",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
