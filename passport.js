import { Strategy as Auth0Strategy } from "passport-auth0";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as MockStrategy } from "passport-mock-strategy";
import passport from "passport";

export const strategies = [];

if (
  process.env.AUTH0_DOMAIN &&
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET
) {
  strategies.push("auth0");
  passport.use(
    new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: "/api/auth/auth0/callback",
      },
      function (accessToken, refreshToken, extraParams, profile, done) {
        done(null, profile);
      }
    )
  );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  strategies.push("google");
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  strategies.push("github");
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/api/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
}

// If no OAuth credential is present in env variables, we create a mock strategy for easy development purpose
if (strategies.length == 0) {
  strategies.push("mock");
  passport.use(
    "mock",
    new MockStrategy(
      {
        name: "mock",
        user: {
          id: "mock",
          displayName: "Mocked User",
        },
        passReqToCallback: false,
      },
      function (user, done) {
        done(null, user);
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
