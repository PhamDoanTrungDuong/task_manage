const taskController = require("../controllers/taskController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

//Create Task
router.post("/", verifyToken, taskController.createTasks);
//Get Tasks
router.get("/", verifyToken, taskController.getAllTasks);
//Get Task by Id
router.get("/:id", verifyToken, taskController.getTaskById);
//Update Tasks
router.put("/:id", verifyToken, taskController.updateTasks);
//Delete Tasks
router.delete("/:id", verifyToken, taskController.deleteTasks);

module.exports = router;
