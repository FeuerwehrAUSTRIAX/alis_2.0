import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/einsaetze", async (req, res) => {
  try {
    const response = await fetch(
      "https://einsatzuebersicht.lfv.steiermark.at/einsatzkarte/data/public_current.json"
    );

    const data = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.send(data);

  } catch (err) {
    res.status(500).json({
      error: "Proxy error",
      message: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy läuft!");
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
