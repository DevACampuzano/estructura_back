module.exports = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return resp.status(400).json({
        msg: "El correo es requerido.",
        status: false,
      });
    }

    if (!password) {
      return resp.status(400).json({
        msg: "La contraseña es requerida.",
        status: false,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor.",
    });
  }
};
