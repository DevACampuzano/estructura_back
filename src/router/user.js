const express = require("express");
const { creatUser, login } = require("../controllers/user");
const jwt = require("../middlewares/jwt");
module.exports = (app) => {
  const router = express.Router();
  app.use("/user", router);

  router.post("/", [jwt], creatUser);
  router.post("/login", login);
};
