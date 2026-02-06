import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create Task
export const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            throw new ApiError(400, "Task title is required");
        }

        const task = await Task.create({
            title,
            description,
            status,
            user: req.user.id
        });

        return res.status(201).json(
            new ApiResponse(201, task, "Task created successfully")
        );
    } catch (error) {
        next(error);
    }
};

// Get all Tasks
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, tasks, "Tasks fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};


// Get single Task
export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        return res.status(200).json(
            new ApiResponse(200, task, "Task fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};


// Update Task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        return res.status(200).json(
            new ApiResponse(200, task, "Task updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

// Delete Task
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Task deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};
