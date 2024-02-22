const express = require('express');
const app = express();

const db = require('./models')

app.use(express.json()); // to parse the incoming requests with JSON payloads

//ROUTERS
const postRouter = require('./routes/Posts')
app.use("/posts",postRouter)

//MIDDLEWARES
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});

