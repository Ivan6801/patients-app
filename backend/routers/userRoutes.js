import express from "express";
const router = express.Router();
import { register, authenticate } from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", register); // Crea un nuevo usuario
router.post("/login", authenticate);
// router.get("/confirmar/:token", confirmar);
// router.post("/olvide-password", olvidePassword);
// router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
// router.get("/perfil", checkAuth, perfil);

export default router;
