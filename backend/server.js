const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;

// Middleware pro práci s JSON
app.use(express.json());

// Načíst data ze souboru database.json
const loadDatabase = () => JSON.parse(fs.readFileSync("database.json", "utf8"));

// Uložit data do souboru database.json
const saveDatabase = (data) => fs.writeFileSync("database.json", JSON.stringify(data, null, 2));

// Endpoint: Získat položky skladu pro vilu
app.get("/api/items/:villa", (req, res) => {
  const { villa } = req.params;
  const data = loadDatabase();
  res.json(data.villas[villa] || []);
});

// Endpoint: Aktualizovat množství položky
app.put("/api/items/:villa/:name", (req, res) => {
  const { villa, name } = req.params;
  const { quantity } = req.body;

  const data = loadDatabase();
  const items = data.villas[villa];

  const item = items.find((item) => item.name === name);
  if (item) {
    item.quantity = quantity;
    saveDatabase(data);
    res.json({ success: true, message: `Položka ${name} byla aktualizována.` });
  } else {
    res.status(404).json({ success: false, message: `Položka ${name} nebyla nalezena.` });
  }
});

// Spustit server
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});