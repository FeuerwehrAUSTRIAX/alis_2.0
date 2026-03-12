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
  const url =
    "https://einsatzuebersicht.lfv.steiermark.at/einsatzkarte/data/public_current.json";

  try {
    const response = await fetch(url);

    const text = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(text);
  } catch (error) {
    res.status(500).json({
      error: "Abruf fehlgeschlagen",
      message: error.message,
      cause: error.cause ? {
        message: error.cause.message,
        code: error.cause.code,
        errno: error.cause.errno,
        syscall: error.cause.syscall,
        hostname: error.cause.hostname
      } : null,
      stack: error.stack
    });
  }
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
