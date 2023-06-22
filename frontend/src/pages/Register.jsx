import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Formik,
  Form,
  FormikProvider,
  Field,
  ErrorMessage,
  useFormik,
} from "formik";
import * as Yup from "yup";
import Alerta from "../components/Alert";
import clienteAxios from "../../config/clienteAxios.js";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Your Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

export default function Register() {
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (values) => {
    // Submit logic here

    try {
      // TODO: Mover hacia un cliente Axios
      const { data } = await clienteAxios.post(`/users/`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      Alerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      Alerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const { errors, touched, getFieldProps, values } = formik;

  const { msg } = alerta;

  const handleChange = (field, value) => {
    formik.setFieldValue(field, value);
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Sign up and manage your <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <FormikProvider value={formik}>
        <Form
          noValidate
          autoComplete="off"
          className="my-10 bg-white shadow rounded-lg p-10 py-5"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="name"
            >
              Your Name
            </label>
            <Field
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              {...getFieldProps("name")}
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              id="email"
              type="email"
              placeholder="Registration email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              {...getFieldProps("email")}
            />
            {errors.email && touched.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              {...getFieldProps("password")}
            />
            {errors.password && touched.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="repeatPassword"
            >
              Repeat password
            </label>
            <Field
              id="repeatPassword"
              type="password"
              placeholder="Repeat password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              {...getFieldProps("repeatPassword")}
            />
            {errors.repeatPassword && touched.repeatPassword && (
              <div className="text-red-500">{errors.repeatPassword}</div>
            )}
          </div>
          <input
            type="submit"
            value="Create Account"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </Form>
      </FormikProvider>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          You do not have an account? Log in
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forget-password"
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
}
