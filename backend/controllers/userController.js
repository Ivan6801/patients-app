import User from "../models/User.js";
import generarId from "../helpers/generateId.js";
// import generarJWT from "../helpers/generateJWT.JS";
// import { emailRecord } from "../helpers/email.js";

const register = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existsUser = await User.findOne({ email });

  if (existsUser) {
    const error = new Error("User already registered");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generarId();
    const userStored = await user.save();
    res.json(userStored);
  } catch (error) {
    console.log(error);
  }
  res.json({ msg: "Create user" });
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  // Comprobar si el usuario existe

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("The user not exist");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar si el usuario esta confirmado
  if (!user.confirmed) {
    const error = new Error("Your account has not been confirmed");
    return res.status(403).json({ msg: error.message });
  }
  // Comprobar su password
  if (await user.checkPassword(password)) {
    console.log("Its right");
  } else {
    console.log("It is incorrect");
  }
};

export {
  register,
  authenticate,
  // confirmar,
  // olvidePassword,
  // comprobarToken,
  // nuevoPassword,
  // perfil,
};
