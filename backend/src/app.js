import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Task Management API running"
    });
});

export default app;
