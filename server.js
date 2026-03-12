import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Proxy läuft!");
});

app.get("/test", (req, res) => {
  res.send("Test funktioniert!");
});

app.get("/api/einsaetze", async (req, res) => {
  try {
    const response = await fetch(
      "https://einsatzuebersicht.lfv.steiermark.at/einsatzkarte/data/public_current.json"
    );

    const text = await response.text();

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(text);
  } catch (error) {
    res.status(500).json({
      error: "Abruf fehlgeschlagen",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
