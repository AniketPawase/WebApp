const express = require('express');
const app = express();
const cors = require ('cors');

const db = require('./models')

app.use(express.json());
app.use(cors()); // to parse the incoming requests with JSON payloads

//ROUTERS
const postRouter = require('./routes/Posts')
const commentsRouter = require('./routes/Comments')
const usersRouter = require('./routes/Users')

app.use("/posts",postRouter)
app.use("/comments",commentsRouter)
app.use("/auth",usersRouter)


//MIDDLEWARES
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});

