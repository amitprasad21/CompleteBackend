import { readTasks, writeTasks } from "../utils/file.utils.js";

export const getAllTasks = async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await readTasks();

    res.json(tasks.filter(task => task.username === req.session.user.username));
}   

export const createTask = async (req, res) => {
    const {title , description} = req.body;
    const tasks = await readTasks();

    const newTask = {
        id:Date.now(),
        username:req.session.username,
        title,
        description,
        completed:false
    }

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask)
}   

export const updateTask = (req, res) => {
  // Logic to update a specific task for the authenticated user
  res.json({ message: `Update task with ID ${req.params.id}` });
}   

export const deleteTask = (req, res) => {
  // Logic to delete a specific task for the authenticated user
  res.json({ message: `Delete task with ID ${req.params.id}` });
}