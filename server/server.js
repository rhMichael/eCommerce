const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5002;

const usersRoute = require("./routers/usersRoute");
const productsRoute = require("./routers/productsRoute");
const bidsRoute = require("./routers/bidRoute");
const notificationRoute = require("./routers/notificationRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationRoute);

app.listen(port, () => console.log(`Node JS Server started on port ${port}`));
