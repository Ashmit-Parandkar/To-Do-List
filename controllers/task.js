const task = require('../models/task.js')

const newTask = async (req, res, next) =>{

    const {title, description} = req.body;

    console.log(title, description)

    await task.create({
        title,
        description,
        user: req.user
    })

    res.status(201)
    // .json({
    //     success: true,
    //     message: "Task Added Successfully"
    // })
    res.redirect('/api/v1/tasks/all')
}

const getAllTasks = async (req, res, next) =>{

    const userId = req.user._id;

    const tasks = await task.find({user:userId});

    // res.status(200).json({
    //     success: true,
    //     message: tasks
    // })

    res.render('home',{tasks})
}

const updateTask = async (req, res, next) =>{

    const taskId = req.params.taskId;

    const oneTask = await task.findById(taskId);

    oneTask.isCompleted = (!(oneTask.isCompleted));

    await oneTask.save();

    res.status(200).json({
        success: true,
        message: "Task Updated"
    })

}

const deleteTask = async (req, res, next) =>{

    const taskId = req.params.taskId;

    const oneTask = await task.findById(taskId);

    await oneTask.deleteOne();

    // res.status(200).json({
    //     success: true,
    //     message: "Task Deleted"
    // })

    // On successful deletion
    res.status(204).end();

}

module.exports = {newTask, getAllTasks, updateTask, deleteTask}