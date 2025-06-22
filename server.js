const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(cors());

// GET /news => supports category, search (q), and date
app.get("/news", async (req, res) => {
  const { q, category, date } = req.query;

  const baseUrl = "https://newsapi.org/v2/everything";
  const query = q || category || "technology"; // use search query or fallback to category or default

  const dateParam = date ? `&from=${date}&to=${date}` : "";

  const url = `${baseUrl}?q=${query}${dateParam}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
