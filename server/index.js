const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();
const PORT = 8080 || process.env.PORT;

dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use("/api/user", userRouter); // rest APIs, to make code cleaner
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);



app.listen(PORT, () => console.log("server running on port  " + PORT));