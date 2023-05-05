import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Desde API/USUARIO");
});

router.post("/", (req, res) => {
  res.send("POST API/USUARIO");
});

export default router;
