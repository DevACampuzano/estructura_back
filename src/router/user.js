const express = require("express");
const { creatUser } = require("../controllers/user");
module.exports = (app) => {
  const router = express.Router();
  app.use("/user", router);

  router.post("/", creatUser);
};
