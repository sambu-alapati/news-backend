const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(cors());

// ✅ Health check route (optional)
app.get("/", (req, res) => {
  res.send("🟢 News API Backend is Running!");
});

// ✅ FIXED: Use top-headlines instead of everything
app.get("/news", async (req, res) => {
  const { q = "", category = "", date = "" } = req.query;

  const baseUrl = "https://newsapi.org/v2/top-headlines";
  const url = `${baseUrl}?country=in&category=${category}&q=${q}&apiKey=${NEWS_API_KEY}`;

  console.log("🔍 Fetching:", url);

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
