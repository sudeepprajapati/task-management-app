import { useState, useEffect } from "react";
import { apiRequest } from "../services/api";
import Card from "./Card";
import { Loader } from "lucide-react";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

export default function TaskForm({ onSuccess, initialTask = null, isEditMode = false }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title || "");
            setDescription(initialTask.description || "");
            setStatus(initialTask.status || "pending");
        }
    }, [initialTask]);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Task title cannot be empty");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: title.trim(),
                description: description.trim(),
                status,
            };

            if (isEditMode && initialTask) {
                await apiRequest(`/tasks/${initialTask._id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await apiRequest("/tasks", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }

            setTitle("");
            setDescription("");
            setStatus("pending");
            onSuccess();
        } catch (err) {
            setError(err.message || `Failed to ${isEditMode ? "update" : "create"} task`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <form onSubmit={submit} className="space-y-4">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                        {isEditMode ? "Edit Task" : "Create New Task"}
                    </h2>
                    <p className="text-sm text-zinc-400">
                        {isEditMode ? "Update your task details" : "Add a new task to your list"}
                    </p>
                </div>

                {/* Title */}
                <div>
                    <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Task Title</label>
                    <input
                        className="w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition text-white"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            focusRingColor: "var(--accent-violet)",
                        }}
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Description</label>
                    <textarea
                        rows={4}
                        className="w-full resize-none rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition text-white"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                        }}
                        placeholder="Enter task description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Status</label>
                    <select
                        className="w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition text-white"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                        }}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-sm rounded-md px-3 py-2" style={{ backgroundColor: "var(--status-pending)", color: "var(--status-pending-text)" }}>{error}</p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--accent-violet)" }}
                >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Task" : "Create Task")}
                </button>
            </form>
        </Card>
    );
}
