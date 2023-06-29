import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/projects">
          <h2 className="text-4xl text-sky-700 font-black text-center">
            UpTask
          </h2>
        </Link>
        <input
          type="search"
          placeholder="Buscar Proyecto"
          className="rounded-lg xl:w-96 mb:w-full outline-0 black p-2 mb-2 mt-2 border-2"
        />
        <div className="flex items-center gap-4">
          <Link className="font-bold uppercase" to="/projects">
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-700 hover:bg-sky-800 p-3 rounded-md uppercase font-bold"
          >
            Sign off
          </button>
        </div>
      </div>
    </header>
  );
}
