import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import { ChevronLeft, Loader } from "lucide-react";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await apiRequest(`/tasks/${id}`);
                setTask(res.data);
                setError("");
            } catch (err) {
                setError("Failed to load task");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleSuccess = () => {
        navigate("/");
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <nav className="border-b" style={{ backgroundColor: "var(--navbar-bg)", borderColor: "var(--navbar-border)" }}>
                <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 text-sm transition"
                        style={{ color: "var(--text-muted)" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                        onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                    >
                        <ChevronLeft size={18} />
                        Back to Tasks
                    </button>
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-md px-4 py-2 text-sm font-medium text-white transition"
                        style={{ backgroundColor: "var(--accent-rose)" }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="mx-auto max-w-2xl px-4 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader className="animate-spin" size={32} style={{ color: "var(--accent-violet)" }} />
                    </div>
                ) : error ? (
                    <div className="rounded-md border p-4 text-sm" style={{ backgroundColor: "var(--status-pending)", borderColor: "#fcd34d", color: "var(--status-pending-text)" }}>
                        {error}
                    </div>
                ) : task ? (
                    <TaskForm
                        onSuccess={handleSuccess}
                        initialTask={task}
                        isEditMode={true}
                    />
                ) : null}
            </div>
        </div>
    );
}
