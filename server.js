const express = require("express");
const path = require("path");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const fetch = require("isomorphic-fetch");

const authorizer = (username, password) => {
  const userMatches = basicAuth.safeCompare(username, "admin");
  const passwordMatches = basicAuth.safeCompare(password, "123");

  return userMatches && passwordMatches;
};

const app = express();
app.use(cors());
app.use(basicAuth({ authorizer }));

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://swapi.dev/api");

    if (response.status !== 200) {
      return res.sendStatus(response.status);
    }

    const data = await response.json();

    return res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
