const userRoute = require("./users.routes.js");
const todoRoute = require("./todo.routes.js");

function route(app){
    app.use("/todo", todoRoute);
    app.use("/users", userRoute);
}

module.exports = route