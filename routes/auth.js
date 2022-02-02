import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure"
  })
})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

router.get('/google', passport.authenticate("google", {
  scope: ["profile"]
}))

router.get('/google/callback', passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login/failed"
}))

router.get('/github', passport.authenticate("github", {
  scope: ["profile"]
}))

router.get('/github/callback', passport.authenticate("github", {
  successRedirect: "/",
  failureRedirect: "/login/failed"
}))

export default router;