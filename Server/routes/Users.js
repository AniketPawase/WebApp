const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require ('jsonwebtoken')
const {validateToken} = require('../middlewares/AuthMIddleware')

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) {
      res.status(404).json({ error: "User Doesn't Exist" }); // Return 404 status for user not found
      return; // Exit the function early
    }
   
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
    
      const accessToken = sign({username: user.username, id : user.id},
                            "importantSecret");
      res.json({token: accessToken,
                username: username,
                id: user.id});
    });
  });

  //Authentication Request
  router.get('/auth',validateToken, (req,res)=>{
   res.json(req.user)
  })

  //Getting Profile INfo
  //1.Basic Info
  router.get('/basicInfo/:id',async (req,res)=>{
    const id = req.params.id;
    const basinInfo = await Users.findByPk(id,
      {
        attributes:{
          exclude: ['password']
        },
      });
      res.json(basinInfo);
  })

  //Changing Password Update INfo
  router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({
        where: { username: req.user.username }
    });

    bcrypt.compare(oldPassword, user.password).then(async (match) => { 
        if (!match) res.json({ error: "Wrong Password Combination" });

        const hash = await bcrypt.hash(newPassword, 10); 
        await Users.update(
            { password: hash }, // New password hash
            { where: { username: req.user.username } } // Add a where clause
        ); 
        res.json("SUCCESS"); 
    }); 
});  



module.exports = router;