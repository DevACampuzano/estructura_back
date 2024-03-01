const express = require("express");
const { createUser, login } = require("../controllers/user");
const jwt = require("../middlewares/jwt");
const validateCreate_user = require("../middlewares/validate-create_user");

module.exports = (app) => {
  const router = express.Router();
  app.use("/user", router);

  router.post("/", [jwt, validateCreate_user], createUser);
  router.post("/login", login);
};
