import express from "express";
import cors from "cors";
import scrapeEbayProductInfo from "./scrapping.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/scrapping", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No se proporcionó una URL válida" });
  }

  try {
    const producto = await scrapeEbayProductInfo(url);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
