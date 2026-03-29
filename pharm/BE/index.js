const express = require("express");
const app = express();

// app.get("/", (req, res) => {
//   console.log("Here");

//   res.render("index", { text123: "World" });
//   res.status(404).json({ error: "User not found" });
//   res.sendStatus(500);
//   res.download("app.js");
// });

const userRouter = require("./routes/user");

app.use("/user", userRouter);

app.listen(3000);
