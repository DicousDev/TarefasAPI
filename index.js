const port = 4000;
const express = require("express");
const app = express();

app.use(express.json());
const taskList = [{description: "ESTUDAR", priority: "MÁXIMA", stateTask: "ANDAMENTO"}]

app.get("/", (req, res) => {
    res.json({"message": "Lista de projetos API"});
});

app.get("/tasks", (req, res) => {
    res.json(taskList);
});

app.post("/generateTask", (req, res) => {
    const {description, priority, stateTask} = req.body;
    taskList.push({description: description, priority: priority, stateTask: stateTask});
    res.json({"code":200 ,"message": "Tarefa adicionada com sucesso!"})
});

app.listen(port, () => {
    console.log(`Server running in port ${port} 🚀`)
});