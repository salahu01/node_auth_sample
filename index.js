const express = require("express");
const app = express();
const currentPort = process.env.PORT || 4000;
const authRoutes = require("./routes/auth");
const connectDb = require("./db/mongodb");

app.get("/",(req,res)=>{
  res.status(200).send("Server Runnig Successfully");
});

app.use(express.json());

app.use("/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

connectDb().then(() =>
  app.listen(currentPort, () => {
    console.log(`Server is running at ${currentPort}`);
  })
);
