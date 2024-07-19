// Start TaskBuddy --> npm run start
// Start TaskBuddy(development) --> npm run dev

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.js');
const taskRouter =  require('./routes/task.js');

const app = express();

dotenv.config({
    path: "./config.env"
});

app.set('view engine', 'ejs')

// Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


// Using Routes
app.use(userRouter);
app.use('/api/v1/tasks', taskRouter);       // No need to write /api/v1/tasks in every route in task.js

// Connecting to database
mongoose.connect( process.env.MONGO_URI,{
    dbName:"backend"
})
.then(()=>{console.log('Database Connected')})
.catch((err)=>{console.log(err)})

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

// app.get('/register',(req,res)=>{
//     res.render('register');
// })
// app.post('/register',(req,res)=>{
//     console.log(req.body);
// })

app.listen( process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})