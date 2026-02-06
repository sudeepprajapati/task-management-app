import { Router } from "express";
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";


const router = Router();

router.use(protect);

router.route("/")
    .post(createTask)
    .get(getAllTasks);

router.route("/:id")
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

export default router;
