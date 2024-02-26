const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const userApi = require("./router/user");

const app = express();
app.use(bodyParser.json());

userApi(app);

app.listen(config.port, () => {
  console.log("listen port", config.port);
});
