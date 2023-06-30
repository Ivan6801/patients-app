import express from "express";
import {
  register,
  autenticar,
  confirm,
  forgetPassword,
  buyerToken,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirm/:token", confirm);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(forgetPassword).post(buyerToken);

router.get("/profile", checkAuth, profile);

export default router;
