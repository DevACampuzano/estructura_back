const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const { keyToken } = require("../config/index.js");

module.exports = (req = request, resp = response, next) => {
  const token = req.headers["access-token"];
  try {
    if (!token) {
      return resp.status(500).json({ msg: "Not provided token." });
    }

    jwt.verify(token, keyToken, (err, decoded) => {
      if (err) {
        return resp.status(500).json({ msg: "Invalid Token." });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    resp.status(400).json({ msg: "Error al validar token." });
  }
};
