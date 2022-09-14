const express = require("express");
const path = require("path");
const basicAuth = require("express-basic-auth");

const authorizer = (username, password) => {
  const userMatches = basicAuth.safeCompare(username, "admin");
  const passwordMatches = basicAuth.safeCompare(password, "123");

  return userMatches && passwordMatches;
};

const app = express();
app.use(basicAuth({ authorizer }));

app.get("/", (req, res) => {
  res.send("yay");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
