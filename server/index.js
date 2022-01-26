const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const SERVER_PORT = 3001;

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
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on ${SERVER_PORT}`);
});