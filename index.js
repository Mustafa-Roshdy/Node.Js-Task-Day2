require('dotenv').config();
const express=require('express')
const mongoo=require('mongoose')
const userRoute=require('./routes/userRoute')
const accountRoute=require('./routes/accountRoute')
const uploadRoute=require('./upload/upload')

const app = express()
app.use(express.json())
app.use(express.urlencoded())



main().catch(err => console.log(err));

async function main() {
  try {
    await mongoo.connect('mongodb://127.0.0.1:27017/BankTestDB');
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}




app.use(userRoute)
app.use(accountRoute)



app.listen(8000,()=>{
    console.log("app running at port 8000");
})