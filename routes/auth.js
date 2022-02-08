import express from "express";
import passport from "passport";
import { strategies } from "../passport.js";

const router = express.Router();

const getHost = () => {
  if (process.env.CLIENT_PORT != null || strategies.includes("mock"))
    // This means we are in a local/dev environment
    return `http://localhost:${process.env.CLIENT_PORT ?? 3000}`;
  return "/";
};

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
  res.redirect(getHost());
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
    successRedirect: getHost(),
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
    successRedirect: getHost(),
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
    successRedirect: getHost(),
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/mock",
  passport.authenticate("mock", {
    successRedirect: getHost(),
    failureRedirect: "/login/failed",
  })
);

// The client needs to know the strategies implemented
router.get("/strategies", (req, res) => {
  res.status(200).json(strategies);
});

export default router;
