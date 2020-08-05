import { model, Schema } from "mongoose";

const TodoSchema = new Schema({
    description: String,
    done: Boolean,
});

export const Todo = model("Todo", TodoSchema);
