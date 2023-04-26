const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const authenticatedApiKeys = new Set();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/authenticate", async (req, res) => {
  try {
    const apiKey = req.body.apiKey;
    const response = await axios.get("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (response.status === 200) {
      authenticatedApiKeys.add(apiKey);
      res.status(200).json({ authenticated: true });
    } else {
      res
        .status(401)
        .json({ authenticated: false, message: "Invalid API Key" });
    }
  } catch (error) {
    res.status(500).json({
      authenticated: false,
      message: "Error occurred during authentication",
    });
    console.error(error);
  }
});

app.post("/api/chat", async (req, res) => {
  const apiKey = req.body.apiKey;
  const messages = req.body.messages;

  if (!authenticatedApiKeys.has(apiKey)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error during conversation", error);
    res.status(500).json({ message: "Error during conversation" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
