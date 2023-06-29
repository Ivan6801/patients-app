import React from "react";
import FormProject from "../components/FormProject";

export default function NewProject() {
  return (
    <>
      <h1 className="text-4xl font-black">Create project</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
}
