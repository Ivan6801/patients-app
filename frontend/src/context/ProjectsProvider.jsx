/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alerta, setAlerta] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const showAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/projects", projects, config);
      setTimeout(() => {
        setAlerta({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlerta,
        alerta,
        submitProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

// function ProjectsProvider({ children }) {
//   const [projects, setProjects] = useState([]);
//   const [alerta, setAlerta] = useState({});
//   const [project, setProject] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [modalFormTask, setModalFormTask] = useState(false);
//   const [task, setTask] = useState({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const { data } = await clienteAxios("/projects/", config);
//         setProjects(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getProjects();
//   }, []);

//   const showAlerta = (alerta) => {
//     setAlerta(alerta);

//     setTimeout(() => {
//       setAlerta({});
//     }, 3000);
//   };

//   const editProject = async (project) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const { data } = await clienteAxios.put(
//         `/projects/${project.id}`,
//         project,
//         config
//       );

//       // Sincronizar el state
//       const proyectosActualizados = projects.map((proyectoState) =>
//         proyectoState._id === data._id ? data : proyectoState
//       );
//       setProjects(proyectosActualizados);

//       setAlerta({
//         msg: "Proyecto Actualizado Correctamente",
//         error: false,
//       });

//       setTimeout(() => {
//         setAlerta({});
//         navigate("/projects");
//       }, 3000);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const newProject = async (project) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await clienteAxios.post("/projects/", project, config);
//       setProjects([...projects, data]);
//       setAlerta({
//         msg: "Project Creating correct",
//         error: false,
//       });
//       setTimeout(() => {
//         setAlerta({});
//         navigate("/projects");
//       }, 2000);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const submitProject = async (project) => {
//     if (project.id) {
//       editProject(project);
//     } else {
//       newProject(project);
//     }
//   };

//   const getProject = async (id) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await clienteAxios(`/projects/${id}`, config);
//       setProject(data);
//       setAlerta({});
//     } catch (error) {
//       navigate("/projects");
//       setAlerta({
//         msg: error.response.data.msg,
//         error: true,
//       });
//       setTimeout(() => {
//         setAlerta({});
//       }, 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletedProject = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const { data } = await clienteAxios.delete(`/projects/${id}`, config);

//       // Sincronizar el state
//       const projectsUpdated = projects.filter(
//         (proyectoState) => proyectoState._id !== id
//       );
//       setProjects(projectsUpdated);

//       setAlerta({
//         msg: data.msg,
//         error: false,
//       });

//       setTimeout(() => {
//         setAlerta({});
//         navigate("/projects");
//       }, 3000);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleModalTask = () => {
//     setModalFormTask(!modalFormTask);
//     setTask({});
//   };

//   const editTask = async (task) => {
//     console.log(task);
//   };

//   const createTask = async (task) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const { data } = await clienteAxios.post("/tasks/", task, config);
//       setTask(data);
//       const projectUpdated = { ...project };
//       projectUpdated.tasks = [...project.tasks, data];
//       setProject(projectUpdated);
//       setAlerta({});
//       setModalFormTask(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const submitTask = async (task) => {
//     if (task?.id) {
//       await editTask(task);
//     } else {
//       console.log("Add Task");
//       await createTask(task);
//     }
//   };

//   const handleModalEditTask = (task) => {
//     setTask(task);
//     setModalFormTask(true);
//   };

//   return (
//     <ProjectsContext.Provider
//       value={{
//         projects,
//         showAlerta,
//         alerta,
//         submitProject,
//         getProject,
//         project,
//         loading,
//         deletedProject,
//         handleModalTask,
//         modalFormTask,
//         submitTask,
//         handleModalEditTask,
//         task,
//       }}
//     >
//       {children}
//     </ProjectsContext.Provider>
//   );
// }

export { ProjectsProvider };

export default ProjectsContext;
