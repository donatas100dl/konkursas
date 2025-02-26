const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createServer } = require("node:http");
const port = 4000;

const userRouter = require("./routs/user/userRouts.js");
const calandarRouter = require("./routs/calandar/calandarRouts.js")


dotenv.config();
const app = express();
const server = createServer(app);
const bodyParser = require('body-parser');

const corsOptions = {
  origin: ["http://localhost:5173","http://192.168.0.242:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};;

  app.use(cors(corsOptions));
  server.listen(port, () => {
    console.log(`server running at ${port}`);
  });
  
// app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const url = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    url
  )
  .then(() => {
    // Successfully connected
    console.log(" Connected to mongoose");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB. Error: " + err);
  });

app.use(bodyParser.json());
app.use('/user', userRouter )
app.use("/calander", calandarRouter)
