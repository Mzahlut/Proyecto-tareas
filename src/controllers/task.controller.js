import task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)
    console.log(req.user.id)


}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    const newTask = new task({
        title,
        description,
        date,
        user: req.user.id
    })


    const savedTask = await newTask.save()
    res.json(savedTask)

}



export const getTask = async (req, res) => {
    const Task = await task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(Task)

}

export const deleteTask = async (req, res) => {
    const Task = await task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    return res.sendStatus(204)

}

export const updateTask = async (req, res) => {
    const Task = await task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if (!Task) return res.status(404).json({ message: 'Task not found' })
    res.json(Task)

}

