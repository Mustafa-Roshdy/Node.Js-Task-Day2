const userController=require('../controllers/userController')
const userValid=require('../validation/userValidation')
const bcrypt=require('bcrypt')
const express =require('express')
const route = express.Router()


// Register
route.post("/register", async (req, res) => {
  const { error } = userValid.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    const user = await userController.createUser({...req.body , pass: hashedPass,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
})


// Login
route.post('/login',async(req,res)=>{
  const {email,pass} =req.body
  const result =await userController.authLogin(email,pass)
  if(result.error){
    res.status(401).json(result)
  }
  res.json(result)
})

// to test Token
route.get('/profile',userController.authMiddleware,async(req,res)=>{
  res.json({ message: "Welcome to your profile", user: req.user });
})


// show all users
route.get("/users",async(req,res)=>{
    const users=await userController.getAllUsers()
    res.json(users)
})

// READ user by id
route.get("/users/:id",async(req,res)=>{
    const userData= await userController.getUserById(req.params.id)
    if(!userData){
        res.status(400).json({error:"User Not Found"})
    }
    res.json(userData)
})

// UPDATE user
route.put('/users/:id', async (req, res) => {const { error } = userValid.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
    }

  try {

    if (req.body.pass) {
      req.body.pass = await bcrypt.hash(req.body.pass, 10);
    }

    const user = await userController.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }

})


// DELETE user
route.delete('/users/:id', async (req, res) => {
  const user = await userController.deleteUser(req.params.id);
  if (!user){ 
    return res.status(404).json({ error: "User not found" })
  }
  res.json({ message: "User deleted", user });
});


module.exports=route