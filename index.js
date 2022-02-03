import 'dotenv/config'
import authRoute from "./routes/auth.js";
import pokemonRoute from "./routes/pokemon.js";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import passport from "passport";
import path from "path";
import {fileURLToPath} from 'url';
import "./passport.js";
const app = express();

app.use(
  cookieSession({
      name: "session",
      keys: ["lama"],
      maxAge: 8640000
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"./client/build")));

app.use("/api/auth", authRoute);
app.use("/api/pokemon", pokemonRoute);
app.use("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html")
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});