const { Issuer } = require("openid-client");
require("dotenv").config();

let client;

async function initializeClient() {
  if (!process.env.AWS_REGION || !process.env.COGNITO_USER_POOL_ID) {
    console.error("AWS_REGION or COGNITO_USER_POOL_ID is missing!");
    return;
  }

  const issuerUrl = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
  try {
    const issuer = await Issuer.discover(issuerUrl);
    client = new issuer.Client({
      client_id: process.env.COGNITO_APP_CLIENT_ID,
      client_secret: process.env.COGNITO_APP_CLIENT_SECRET || undefined,
      redirect_uris: [process.env.COGNITO_REDIRECT_URI],
      response_types: ["code"],
    });
    console.log("Cognito client initialized successfully");
  } catch (err) {
    console.error("Failed to initialize Cognito client:", err);
  }
}

initializeClient();

module.exports = { client };
