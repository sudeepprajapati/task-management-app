import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import { Plus, LogOut } from "lucide-react";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            const res = await apiRequest("/tasks");
            setTasks(res.data);
            setError("");
        } catch (err) {
            setError("Failed to load tasks");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteTask = async (taskId) => {
        try {
            await apiRequest(`/tasks/${taskId}`, { method: "DELETE" });
            await fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <nav className="border-b" style={{ backgroundColor: "var(--navbar-bg)", borderColor: "var(--navbar-border)" }}>
                <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/tasks/create")}
                            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition"
                            style={{ backgroundColor: "var(--accent-violet)" }}
                        >
                            <Plus size={18} />
                            New Task
                        </button>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition"
                            style={{ backgroundColor: "var(--accent-rose)" }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
                {error && (
                    <div className="rounded-md border p-3 text-sm" style={{ backgroundColor: "var(--status-pending)", borderColor: "#fcd34d", color: "var(--status-pending-text)" }}>
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="mb-4" style={{ color: "var(--text-muted)" }}>No tasks yet. Create one to get started!</p>
                            <button
                                onClick={() => navigate("/tasks/create")}
                                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition"
                                style={{ backgroundColor: "var(--accent-violet)" }}
                            >
                                <Plus size={18} />
                                Create Your First Task
                            </button>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
