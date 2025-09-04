const express =require('express')
const multer = require('multer')
const mult =require('multer')
const path =require('path')

const route =express.Router()

// const upload =mult({
//   dest : "uploads/",
// })

const storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"uploads/")
  },
  filename: function(req,file,cb){
    const ex =path.extname(file.originalname)
    console.log(file);
    // make overwrite of the file with the same name file in uploads folder
    cb(null,file.originalname.split(".")[0]+ex)
  }
})

const upload =mult({storage:storage})

route.post('/upload',upload.single("file"),(req,res)=>{
  res.json({message:"file Uplaoded Successfully!"})
})

module.exports=route