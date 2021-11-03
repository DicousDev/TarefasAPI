const port = 4000;
const express = require("express");
const app = express();

app.use(express.json());

let taskCount = 1;
const taskList = [{
    id: 1,
    description: "ESTUDAR", 
    priority: "MÁXIMA", 
    stateTask: "ANDAMENTO", 
}]

app.get("/", (req, res) => {
    res.json({"message": "Lista de projetos API"});
});

app.get("/tasks", (req, res) => {
    res.json(taskList);
});

app.post("/generateTask", (req, res) => {
    taskCount += 1;
    const {description, priority, stateTask} = req.body;
    taskList.push({id: taskCount, description: description, priority: priority, stateTask: stateTask});
    res.json({
        "code":201,
        "body":{id: taskCount, description: description, priority: priority, stateTask: stateTask},
        "message": "Tarefa adicionada com sucesso."})
});

app.patch("/setTask/:id", (req, res) => {
    const {description, priority, stateTask} = req.body;

    if (req.params.id - 1 > taskList.length - 1) {
        return res.json({"code": 404, "message": "Essa tarefa não existe."});
    }

    if (description) {
        taskList[req.params.id - 1].description = description; 
    }
    
    if(priority)
        taskList[req.params.id - 1].priority = priority;
    
    if (stateTask) {
        taskList[req.params.id - 1].stateTask = stateTask;
    }

    res.json({
        "code":200,
        "body": taskList[req.params.id - 1], 
        "message": `Tarefa ${req.params.id} modificada com sucesso.`});
})

app.listen(port, () => {
    console.log(`Server running in port ${port} 🚀`)
});