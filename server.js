if (process.env.NODE_ENV == "dev") {
  require("dotenv").config({ path: ".dev-env" });
} else {
  require("dotenv").config({ path: ".env" });
}

const { app } = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
