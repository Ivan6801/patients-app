import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
  const { project } = req.body;

  const existsProject = await Project.findById(project);

  if (!existsProject) {
    const error = new Error("The project does not exist");
    return res.status(404).json({ msg: error.message });
  }

  if (existsProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error("You do not have the permissions to add tasks");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const taskStored = await Task.create(req.body);
    existsProject.tasks.push(taskStored._id);
    await existsProject.save();
    res.json(taskStored);
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion not valid");
    return res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion not valid");
    return res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deliverDate = req.body.deliverDate || task.deliverDate;

  try {
    const taskStored = await task.save();
    res.json(taskStored);
  } catch (error) {
    console.log(error);
  }
};

const removeTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion not valid");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);
    await Promise.allSettled([await project.save(), await task.deleteOne()]);
    res.json({ msg: "Task remove" });
  } catch (error) {
    console.log(error);
  }
};

const changeStatus = async (req, res) => {};

export { addTask, getTask, updateTask, removeTask, changeStatus };
