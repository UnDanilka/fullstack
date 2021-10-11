const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route");
const app = express();

app.use("/api/auth", authRoute);

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
    });
    app.listen(PORT, console.log(`app has been started on port ${PORT}...`));
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
};

start();
