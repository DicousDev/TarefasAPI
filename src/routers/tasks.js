const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController.js");

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/generateTask", taskController.generateTask);
router.patch("/:id", taskController.setTaskById);
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;