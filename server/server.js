const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

//db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync({})

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

require("./app/routes/account.routes")(app);
require("./app/routes/classes.routes")(app);
require("./app/routes/pose.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/teacher.routes")(app);

// const PORT = process.env.PORT || 8080;
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
