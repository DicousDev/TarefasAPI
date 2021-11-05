let taskCount = 1;
const taskList = [
    {
        id: 1,
        description: "ESTUDAR", 
        priority: "MÁXIMA", 
        stateTask: "ANDAMENTO" 
    },
    {
        id: 2,
        description: "TOMAR CAFÉ", 
        priority: "MÁXIMA", 
        stateTask: "ANDAMENTO"
    }
];

module.exports = {
    async getTasks() {
        return {
            code: 200,
            data: taskList
        }
    },

    async getTaskById(id) {
        const taskId = taskList.findIndex(task => task.id == id);

        if(taskId <= -1) {
            return {
                code: 404,
                message: "Tarefa não encontrada."
            }
        }

        return {
            code: 200,
            data: taskList[taskId]
        }
    },

    async generateTask(data) {
        taskCount += 1;
        const {description, priority, stateTask} = data;
        taskList.push({id: taskCount, description: description, priority: priority, stateTask: stateTask});

        return {
            code: 201,
            data: {
                id: taskCount,
                description: description,
                priority: priority,
                stateTask: stateTask
            },
            message: "Tarefa adicionada com sucesso."
        }
    },

    async setTaskById(id, data) {
        const taskId = taskList.findIndex(task => task.id == id);
    
        if (taskId <= -1) {
            return {
                code: 404,
                message: "Tarefa não encontrada."
            }
        }
    
        const {description, priority, stateTask} = data;
    
        taskList[taskId] = {
            id: taskList[taskId].id,
            description: description || taskList[taskId].description,
            priority: priority || taskList[taskId].priority,
            stateTask: stateTask || taskList[taskId].stateTask
        }

        return {
            code: 200,
            data: taskList[taskId],
            message: `Tarefa ${id} alterada com sucesso.`
        }
    },

    async deleteTaskById(id) {
        const taskId = taskList.findIndex(task => task.id == id);

        if(taskId <= -1) {
            return {
                code: "404",
                message: "Tarefa não encontrada."
            }
        }

        const task = taskList.splice(taskId, 1);
        return {
            code: 200,
            data: task,
            message: `Tarefa ${id} removida com sucesso.`
        }
    }
}