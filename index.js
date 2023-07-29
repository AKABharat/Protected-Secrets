//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let correctPassword = "ILoveProgramming";
let authorization = false;

function checkPassword(req, res, next) {
  let password = req.body["password"];
  if (password === correctPassword) {
    authorization = true;
  }
  next();
}

app.use(checkPassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/check", (req, res) => {
  if (authorization) {
    res.sendFile(__dirname + "/public/secret.html");
  }
  else {
    res.sendFile(__dirname + "/public/index.html");
  }

});


app.listen(port, () => {
  console.log("app listening incomming HTTP request on port  " + port);
});