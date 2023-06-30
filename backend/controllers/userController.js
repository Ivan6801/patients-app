import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegistro, emailForgotPassword } from "../helpers/email.js";

const register = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existsUsuario = await User.findOne({ email });

  if (existsUsuario) {
    const error = new Error("User already registered");
    return res.status(400).json({ msg: error.message });
  }

  // Evitar registros guardado
  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save();

    // Enviar el email de confirmacion
    emailRegistro({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "User Created Correctly, Check your Email to confirm your account",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Username does not exist");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar si el usuario esta confirmado
  if (!user.confirmed) {
    const error = new Error("Your account has not been confirmed");
    return res.status(403).json({ msg: error.message });
  }
  // Comprobar su password
  if (await user.buyerPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirmed = await User.findOne({ token });
  if (!userConfirmed) {
    const error = new Error("Token dot valid");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirmed.confirmed = true;
    userConfirmed.token = "";
    await userConfirmed.save();
    res.json({ msg: "User confirmed correct" });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Username does not exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();
    // Enivar el email
    emailForgotPassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({ msg: "We have sent an email with the instructions" });
  } catch (error) {
    console.log(error);
  }
};

const buyerToken = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password successfully modified" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token dot valid");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export { register, autenticar, confirm, forgetPassword, buyerToken, profile };
