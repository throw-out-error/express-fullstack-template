import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { todoController } from "./controllers/todo";

// Initializes the .env file into process.env
try {
    dotenv.config();
} catch (err) {
    console.error("Unable to parse .env file.");
}

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
export const app = express();

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());

        app.get("/", (_, res) => {
            res.json({ message: "Hello, world! This is an api." });
        });

        app.use(todoController);

        /* 
        Error handling
        Make sure this is the last route in order for it to work properly
        */
        app.use("*", (_, res) => {
            res.status(404).send({ message: "Requested resource not found." });
        });
    })
    .catch(console.error);
