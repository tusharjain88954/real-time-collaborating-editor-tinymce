const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----
`;

app.post("/jwt", function (req, res) {
  console.log("api hit");
  // NOTE: Before you proceed with the TOKEN, verify your users' session or access.
  const payload = {
    sub: "123", // Unique user ID string
    exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
  };

  try {
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
    console.log(token);
    res.set("content-type", "application/json");
    res.status(200);
    res.send(
      JSON.stringify({
        token: token,
      })
    );
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
});

app.listen(3000);
