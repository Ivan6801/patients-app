import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function RutaProtect() {
  const { auth, loading } = useAuth();
  if (loading) {
    return "Cargando...";
  }
  return (
    <div>
      <h1>
        {auth._id ? (
          <div className="bg-gray-100">
            <Header />

            <div className="md:flex md:min-h-screen">
              <Sidebar />

              <main className="p-10 flex-1 bg-red-100">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </h1>
    </div>
  );
}
