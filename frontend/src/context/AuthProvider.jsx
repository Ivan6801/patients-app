/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setloading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/users/profile/", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      }
      setloading(false);
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
