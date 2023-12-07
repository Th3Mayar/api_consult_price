import express from "express";
import cors from "cors";
import scrapeEbayProductInfo from "./scrapping.js";
import logic from './logic.js';

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

app.get('/logic', async (res) => {
  try {
    const productosConAlertas = await obtenerProductosConAlertas();
    res.json(productosConAlertas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos con alertas' });
  }
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
  logic();
});
