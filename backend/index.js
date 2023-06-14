import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import userRouters from "./routers/userRoutes.js";
import projectRoutes from "./routers/projectRoutes.js";
import taskRoutes from "./routers/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (!origin || whitelist.includes(origin)) {
      // Permitir solicitudes sin origen (como API clients)
      // o solicitudes desde un origen permitido en whitelist
      callback(null, true);
    } else {
      // No está permitido
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors());

// Routing
app.use("/api/users", userRouters);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
