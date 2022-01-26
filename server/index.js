require('dotenv').config()
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
require("./passport");
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