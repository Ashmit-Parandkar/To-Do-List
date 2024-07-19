const express = require('express');
const { newTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/new', isAuthenticated, newTask);

router.get('/all', isAuthenticated, getAllTasks);

router.route('/:taskId')
.put( isAuthenticated, updateTask)
.delete( isAuthenticated, deleteTask)

module.exports = router