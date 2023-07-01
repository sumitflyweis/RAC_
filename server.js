const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
const path = require("path");
app.use(compression({ threshold: 500 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV == "production") {
    console.log = function () { };
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/vendor', require('./routes/vendor.routes'));
app.use('/api/v1/admin', require('./routes/admin.route'));
app.use("/api/v1/images", require("./routes/banner"));
app.use("/api/v1/serviceArea",require("./routes/serviceArea"))
app.use("/api/v1/serviceableDist",require("./routes/serviceableDistance"))
app.use("/api/v1/service",require("./routes/service"))
app.use("/api/v1/noti",require("./routes/notifcation"))
app.use("/api/v1/city",require("./routes/selectcity"))
app.use("/api/v1/wallett",require("./routes/wallet"))

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = { handler: serverless(app) };
