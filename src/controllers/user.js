const { response, request } = require("express");
const { sequileze, Users: userModel } = require("../models");

const creatUser = async (req = request, resp = response) => {
  const transaction = await sequileze.transaction();
  try {
    const { nombre, email, password, profile } = req.body;

    if (!nombre && !email && !password) {
      await transaction.rollback();
      return resp.status(400).json({
        msg: "Todos los campos son obligatorios.",
        status: false,
      });
    }

    const userCreated = await userModel.create(
      { nombre, email, password, profile },
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

module.exports = {
  creatUser,
};
