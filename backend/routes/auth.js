const express = require("express");
const { generators } = require("openid-client");
const { client } = require("../config/cognito");

const router = express.Router();

// Login route
router.get("/login", (req, res) => {
  if (!client) return res.status(500).send("Cognito client not initialized");
  
  const nonce = generators.nonce();
  const state = generators.state();

  req.session.nonce = nonce;
  req.session.state = state;

  const authUrl = client.authorizationUrl({
    scope: "email openid phone",
    state: state,
    nonce: nonce,
  });

  res.redirect(authUrl);
});

// Callback route
router.get("/callback", async (req, res) => {
  try {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(
      process.env.COGNITO_REDIRECT_URI,
      params,
      {
        nonce: req.session.nonce,
        state: req.session.state,
      }
    );
    const userInfo = await client.userinfo(tokenSet.access_token);
    req.session.userInfo = userInfo;
    res.redirect("/");
  } catch (err) {
    console.error("Callback error:", err);
    res.redirect("/");
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.session.destroy();
  const logoutUrl = `${process.env.COGNITO_DOMAIN}/logout?client_id=${process.env.COGNITO_APP_CLIENT_ID}&logout_uri=${process.env.COGNITO_LOGOUT_URI}`;
  res.redirect(logoutUrl);
});

module.exports = router;
