const express = require("express");
const fs = require("fs");
const app = express();

//const homePage = fs.readFileSync("./views/index.html", "utf8");

app.use(express.static("./views"));

app.use((req, res, next) => {
  console.log("Method: ", req.method, "URL:", req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/about", (req, res) => {
  res.send("Welcome from About Page");
});
app.get("/products", (req, res) => {
  res.send([
    { id: 1, title: "product 1", price: 300 },
    { id: 2, title: "product 2", price: 400 },

    { id: 3, title: "product 3", price: 200 },
  ]);
});

app.listen("3001", () => {
  console.log("listening on port 3001");
});
