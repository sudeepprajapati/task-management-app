import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft } from "lucide-react";

export default function CreateTask() {
    const navigate = useNavigate();
    const { logout } = useAuth();

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
                <TaskForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
}
