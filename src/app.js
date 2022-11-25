const express = require("express");
require("./config/db");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3200;

var user = require("./routers/user");

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use("/users", user);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
