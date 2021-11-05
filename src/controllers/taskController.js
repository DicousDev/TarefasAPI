const model = require("../model/taskModel");

module.exports = {
    async getTasks(req, res) {
        const data = await model.getTasks();
        return res.status(data.code).json(data);
    },

    async getTaskById(req, res) {
        const data = await model.getTaskById(req.params.id);
        return res.status(data.code).json(data);
    },

    async generateTask(req, res) {
        const data = await model.generateTask(req.body);
        return res.status(data.code).json(data);
    },

    async setTaskById(req, res) {
        const data = await model.setTaskById(req.params.id, req.body);
        return res.status(data.code).json(data);
    },

    async deleteTaskById(req, res) {
        const data = await model.deleteTaskById(req.params.id);
        return res.status(data.code).json(data);
    }
}