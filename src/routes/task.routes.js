import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {  createSchema } from "../schemas/task.schema.js";

const router = Router()


router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createSchema), createTask)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, updateTask)



export default router