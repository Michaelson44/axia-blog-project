const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// mongo connect
mongoose.connect(process.env.mongo_url)
        .then(() => console.log("mongodb connected"))
        .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cookieParser());

// routes
app.use(userRoute);
app.use(authRoute);
app.use(postRoute);
app.use(commentRoute);

app.listen(process.env.port || 4400, () => console.log("blog backend connected"));