const mongoose = require("mongoose");

// live DB
// const db_string = "mongodb+srv://admin:admin@dummy.zguad.mongodb.net/test"

// local DB
const db_string = "mongodb://localhost:27017/dummy"

mongoose
  .connect(db_string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
