import express from 'express'; 
import posts from './routes/postRoutes.js';
import mongoose from 'mongoose';
// import connectDb  from './db/connect.js'; 
const app= express();
app.use(express.json());
app.use('/api', posts); 





mongoose
  .connect(
   "mongodb+srv://faheem123:faheem123@blog1.5del1jl.mongodb.net/ExpressBlog",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
res.send('Hello World!'); 
}); 


 app.listen(3000, ()=> {
    console.log("Api is working")
 });