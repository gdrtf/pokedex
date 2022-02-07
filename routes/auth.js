import express from "express";
import passport from "passport";
import { strategies } from "../passport.js";

const router = express.Router();
const port = process.env.CLIENT_PORT ?? 3000;
const host = port != null ? `http://localhost:${port}` : "/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(host);
});

router.get(
  "/auth0",
  passport.authenticate("auth0", {
    scope: ["profile"],
  })
);

router.get(
  "/auth0/callback",
  passport.authenticate("auth0", {
    successRedirect: host,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: host,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: host,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/mock",
  passport.authenticate("mock", {
    successRedirect: host,
    failureRedirect: "/login/failed",
  })
);

// The client needs to know the strategies implemented
router.get("/strategies", (req, res) => {
  res.status(200).json(strategies);
});

export default router;
