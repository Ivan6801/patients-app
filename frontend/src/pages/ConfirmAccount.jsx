/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alert";
import clienteAxios from "../../config/clienteAxios";

export default function ConfirmAccount() {
  const [alerta, setAlerta] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmBill = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clienteAxios.get(url);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmBill();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirm your account start creating your
        <span className="text-slate-700">Project</span>
      </h1>

      <div>
        {msg && <Alerta alerta={alerta} />}
        {confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Log in
          </Link>
        )}
      </div>
    </>
  );
}
