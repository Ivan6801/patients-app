import User from "../models/User.js";
import generarId from "../helpers/generateId.js";
import generarJWT from "../helpers/generateJWT.js";
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
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generarJWT(user._id),
    });
  } else {
    const error = new Error("The password it is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Token not valid");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirm = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User confirmed correct" });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("The User not exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generarId();
    await user.save();
    res.json({ msg: "we have sent an email with the instructions" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const tokenValid = await User.findOne({ token });

  if (tokenValid) {
    res.json({ msg: "Valid token and user exists" });
  } else {
    const error = new Error("Token not valid");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password Modified Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token not valid");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
};
