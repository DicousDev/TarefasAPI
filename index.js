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
    res.json({
        "code": 200,
        "body": taskList
    });
});

app.get("/tasks/:id", (req, res) => {
    const taskId = taskList.findIndex(task => task.id == req.params.id);

    if(taskId <= -1) {
        return res.json({"code": 404, "message": "Tarefa não encontrada."});
    }

    res.json({
        "code": 200,
        "body": taskList[taskId],
    });
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
    const taskId = taskList.findIndex(task => task.id == req.params.id);
    
    if (taskId <= -1) {
        return res.json({"code": 404, "message": "Essa tarefa não existe."});
    }

    const {description, priority, stateTask} = req.body;

    taskList[taskId] = {
        id:  taskList[taskId].id,
        description: description || taskList[taskId].description,
        priority: priority || taskList[taskId].priority,
        stateTask: stateTask || taskList[taskId].stateTask
    }

    res.json({
        "code":200,
        "body": taskList[taskId], 
        "message": `Tarefa ${req.params.id} modificada com sucesso.`});
})

app.listen(port, () => {
    console.log(`Server running in port ${port} 🚀`)
});