import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  const project = await Project.find().where("creador").equals(req.user);

  res.json(proyectos);
};

const newProject = async (req, res) => {
  const project = new Project(req.body);

  project.creator = req.user._id;

  try {
    const projectStored = await project.save();
    console.log(projectStored);
    res.json(projectStored);
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id).populate("tasks");

  if (!project) {
    const error = new Error("Not Found");
    return res.status(404).json({ msg: error.message });
  }

  if (
    project.creator.toString() !== req.user._id.toString() &&
    !project.collaborators.some(
      (colaborador) => colaborador._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Invalid Action");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

const editProject = async (req, res) => {};

const deleteProject = async (req, res) => {};

const searchCollaborator = async (req, res) => {};

const addCollaborator = async (req, res) => {};

const deleteCollaborator = async (req, res) => {};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
};
