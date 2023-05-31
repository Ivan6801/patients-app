import express from "express";
const router = express.Router();
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); // Crea un nuevo usuario
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
// router.get("/forgot-password/:token", checkToken);
// router.post("/forgot-password/:token", newPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);
// router.get("/perfil", checkAuth, perfil);

export default router;
