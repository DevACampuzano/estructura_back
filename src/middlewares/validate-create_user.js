module.exports = (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre) {
      return resp.status(400).json({
        msg: "El nombre es requerido.",
        status: false,
      });
    }

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

    const emailFormat = /^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9.]+$/;

    if (!emailFormat.test(email)) {
      return resp.status(400).json({
        msg: "Debe ingrasar un correo eletronico valido.",
        status: false,
      });
    }

    const passwordFormat =
      /^[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,15}/;

    if (!passwordFormat.test(password)) {
      return resp.status(400).json({
        msg: "Debe ingresar una contraseña valida.",
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
