const { response, request } = require("express");
const { sequileze, Users: userModel } = require("../models");
const { keyToken } = require("../config");
const jwt = require("jsonwebtoken");
const { validePassword, encrytPassword } = require("../helpers/bcryptPassword");
const createUser = async (req = request, resp = response) => {
  const transaction = await sequileze.transaction();
  try {
    const { nombre, email, password, profile } = req.body;

    const passwordHash = encrytPassword(password);

    const userCreated = await userModel.create(
      { nombre, email, password: passwordHash, profile },
      {
        transaction,
      }
    );

    await transaction.commit();
    return resp.status(200).json({
      status: true,
      msg: "Usuario registado",
      userCreated,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return resp.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const login = async (req = request, resp = response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return resp
        .status(404)
        .json({ msg: "Usuario no encontrado.", status: false });
    }

    const userData = user?.toJSON();
    const passwordHash = userData.password;

    if (!validePassword(password, passwordHash)) {
      return resp
        .status(404)
        .json({ msg: "Contraseña incorrecta.", status: false });
    }

    const token = jwt.sign({ id: userData.id }, keyToken);

    return resp.json({ token, status: true });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

module.exports = {
  createUser,
  login,
};
