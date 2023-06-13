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
const corsOptions = {
  origin: "http://localhost:5173", // Cambia esto a tu URL de frontend permitida
};

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRouters);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
