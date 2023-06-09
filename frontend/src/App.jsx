import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";
import Projects from "./pages/Projects";
import RutaProtect from "./layouts/RutaProtect";
import NewProject from "./pages/NewProject";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgotPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path="/projects" element={<RutaProtect />}>
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
