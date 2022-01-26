const express = require("express");
const app = express();
const SERVER_PORT = 3001;

app.get("/api", (_, res) => {
    res.json({ message: "How you doin?" });
});

app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`);
});