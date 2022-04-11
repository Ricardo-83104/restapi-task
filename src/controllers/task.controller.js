import Task from '../models/Task';
import {getPagination} from '../libs/getPagination';


export const findAllTasks = async (req, res) => {
    try {
        const {size, page, title} = req.query

        const condition = title 
        ?  {
            title: { $regex: new RegExp(title), $options: "i"},
        }
        : {};

        const {limit, offset} = getPagination(page, size)

        const data = await Task.paginate(condition, { offset, limit});
        res.json({

            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1

        })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong retrieving the tasks'
        })
    }
}

export const createTask = async (req, res) => {
    try {
        //crea el objeto
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        //guardarlo en la db
        const taskSaved = await newTask.save()
        res.json('New Task created')

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong creating a task'
        })
    }
}

export const findOneTask = async (req, res) => {

    const { id } = req.params;
    try {

        const task = await Task.findById(id)

        if (!task) return res.status(404).json({
            message: `Task with id ${id} does not exists`
        })

        res.json(task)

    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving Task with id: ${id}`,
        })
    }
}

export const deleteTask = async (req, res) => {
const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id)
    res.json({
        message: "Task was deleted succesfully",
    })

    } catch (error) {
        res.status(500).json({
            message: `Error deleting Task with id: ${id}`,
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ done: true });
    res.json(tasks)
}

export const updateTask = async (req, res) => {
    try {
       await Task.findByIdAndUpdate(req.params.id, req.body); 
        res.json({ message: 'Task was updated Succesfully' })
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error updating Task with id: ${id}`,
        })
    }
}