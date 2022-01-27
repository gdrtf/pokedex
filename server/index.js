import 'dotenv/config'
import authRoute from "./routes/auth.js";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import passport from "passport";
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
      origin: `http://localhost:${process.env.CLIENT_PORT}`,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});