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
MIIEpAIBAAKCAQEAsw3KvjWveioIT7v5DZ7AMxvNAoYxywcOAyawxERP3Aan9b2n
SnmXgLlFRjSzsZ3OLhnETzuZS8iKA1tRRE6MsBZAqwYtqC4QF/IY5wbUW8Ot4i3J
+mOup+ubLEIjNcgs0494640Mk5zjmXpY1OzOU4Gi9ax1dptnyHa+ZOMrf0bPbRP3
rTgCmHoTozVt01+OPyC/erodT4+re1RtQuYoJjqlWLGG14DJKj72G/kHFD02dLkj
8RualabLL1crDnBj9keUdm6tq8RBt1ZCl6rp+h9fwcOg9M3eM2i87tFB6vfYZL7e
xa/Xi4wmmJEjoHIv/RtSk35w1Pf3RDa8EDh88wIDAQABAoIBADyHRIrRZi0TiXS+
1B39FPcSBlc8mxeJnnyFN0tZ1m9IVr4VazibaxJKTzdA+J/p+zmNX1XzjUpXlAQ3
efzv2tJp61mFQKjyTWFy52Ut41rUBvOHTBiXWwML/AxVnUaAkVrBTPy/1UkPR8dp
2x67oLINCFQphRnfxhE3xvwe6WTgLleQ+mIxKyDwbzGzf3xsOkyN9FGBEOSWbh1h
y09EHyYZET5PRQgTwKI9pHtExnvwGvTBB1nayhCMjSmUBSm3ohP1xBztU7yWOdQm
0z6xt12tTIMPwLqJKsNGI1fuDxYKRc/Baz4tPWvJuLpch7blYFe49D5Z+8ThkDH2
ZzLeTpkCgYEA93qe90hCyP98lG3QhKiRq1P4q9XIaHjRKu0I+qK+x1e1VEi/EFr6
NBJr0si/7dwIAXLH/Sxj3p9aSh7CSdL4Dr3GUdg9NcbrLOT0tNegTBjvZn3n8xOt
pYfmYy5hYR6yAOIFuz7IjMzEnyT5ABYbezpeK3TcJ+dS5LriNN+oy1kCgYEAuTgL
bBBbFhZSuInHmgs1tpVv4d7mkvr0V2MEBdOn/Rmao0pmJlLq+jlxA6oyOGGquwhJ
NmdrVn3qT7AWbyCqECjvooG0XSl1Hj8aMJ1qrigJSlmA9i7NHOFegr+y2J8Zbluc
pkAAOhx2L50WCazFrfuAHN9X6IlIsAWsuigXXSsCgYEAl9zPH79f/CeLMyoQAtfO
S+xDdG7DhBhfgo/iKqsjlv/jbc0WMdsiHkIPmFFINZYH85uTzXAn+Lygk0s8vkCP
p7wcrqybIxzlw67b2v1WiFvkzGgGpcs1i5ZRchtL9mT3pkMMcVKdjok5Ps9ZXQwz
4PJ4RwJ29qWk4Gct2HRHCEECgYEAmNefzVgd4jcfofrIhNzVQUtF3U00VnvSoD4s
Nqa3jIvRaQhfDScFkuFN2mlbMd2epuKqj8N99wzHC2VSzfdVfypYvXBtJyer5v7J
nO559ydAq2L6oaxzRG7Rr/GDI3D+6muc9DACP/H2sUnewrMZGX5d9PV1NIX9Powg
QioNRasCgYBPiJ3O1lmXQOqdhcxPustT1NxAJuQQ2N0SPixYCHH/RSeUYFInEqsn
Bz6ryxxaPsdXYXoIktAl5/cdHPo8qRiY7gUS7PVPpzdOO8f1+jV+fsP/31QUXh4v
9uAaHqfEFkMm5AmiFR9qMKM6GrtV76DpAHqBgB7NRjUGwO0mM1h3PQ==
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
