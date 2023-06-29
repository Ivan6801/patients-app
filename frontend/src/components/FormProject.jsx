import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alerta from "./Alert";

export default function FormProject() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliverDate, setDeliverDate] = useState("");
  const [client, setClient] = useState("");

  const { showAlerta, alerta, submitProject } = useProjects();

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deliverDate, client].includes("")) {
      showAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    // Pasar los datos hacia el provider
    await submitProject({
      id,
      name,
      description,
      deliverDate,
      client,
    });
    setId(null);
    setName("");
    setDescription("");
    setDeliverDate("");
    setClient("");
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Name project
        </label>
        <input
          id="name"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Name for project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="deliverDate"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Deliver Date
        </label>
        <input
          id="deliverDate"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Deliver Date"
          value={deliverDate}
          onChange={(e) => setDeliverDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Customer name
        </label>

        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Customer name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={"Update proyect" && "Create project"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
}
