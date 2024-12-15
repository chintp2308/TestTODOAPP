import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import initWebRoutes from "./route/web";
import connectDB from "./Config/connectDB";
require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();
// // Home page route.
// app.get("/", (req, res) => {
//   res.send("Wiki home page");
// });
let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port : " + port);
});
