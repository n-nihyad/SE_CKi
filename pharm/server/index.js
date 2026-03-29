const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // res.status(404).json({ error: "User not found" });
  // res.sendStatus(500);
  // res.download("app.js");
  res.json({ message: "Hello World!" });
});

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(3000);
