const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require("passport")

const GOOGLE_CLIENT_ID = ""
const GOOGLE_CLIENT_SECRET = ""

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (_, _, profile, done) {
    done(null,profile)
}));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})