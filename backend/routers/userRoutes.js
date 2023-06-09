import express from "express";
const router = express.Router();
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); // Crea un nuevo usuario
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forget-password", forgotPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;
