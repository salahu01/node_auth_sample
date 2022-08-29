const express = require("express");
const app = express();
const currentPort = 4000 || process.env.port;
const authRoutes = require("./routes/auth");
const connectDb = require("./db/mongodb");

app.use(express.json());
app.get('/',(req,res)=>{
res.send('worked');
})

app.use("/auth", authRoutes);

app.all("/*", (req, res) => {
  res.status(404).send("Page Not Found");
});

connectDb().then(() =>
  app.listen(currentPort, () => {
    console.log(`Server is running at ${currentPort}`);
  })
);
