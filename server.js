const express = require("express");
const mongoose = require("mongoose");
const Router = require("express");

const app = express();

const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const postRoute = require("./routes/post.js");
// import connectDb  from './db/connect.js';

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Api is working");
});
