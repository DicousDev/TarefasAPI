const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use("/", require("./src/routers/index"));

app.listen(port, () => {
    console.log(`Server running in port ${port} 🚀`)
});