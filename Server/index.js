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
const likesRouter = require('./routes/Likes')

app.use("/posts",postRouter)
app.use("/comments",commentsRouter)
app.use("/auth",usersRouter)
app.use("/likes",likesRouter)



//MIDDLEWARES
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});

