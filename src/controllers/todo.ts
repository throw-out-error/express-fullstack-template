import { Router } from "express";
import { Todo } from "../models/Todo";

const router = Router();

router.get("/todos", async (_, res) => {
    try {
        res.json(await Todo.find({}));
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/todo", async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/todo", async (req, res) => {
    try {
        const todo = await Todo.updateOne({ _id: req.body._id }, req.body);
        res.json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
});

export const todoController = router;
