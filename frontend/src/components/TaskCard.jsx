import { Link } from "react-router-dom";
import { Trash2, Edit2 } from "lucide-react";
import Card from "./Card";

const STATUS_COLORS = {
    pending: { bg: "var(--status-pending)", text: "var(--status-pending-text)" },
    "in-progress": { bg: "var(--status-progress)", text: "var(--status-progress-text)" },
    completed: { bg: "var(--status-completed)", text: "var(--status-completed-text)" },
};

export default function TaskCard({ task, onDelete }) {
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            onDelete(task._id);
        }
    };

    const statusColor = STATUS_COLORS[task.status] || { bg: "#334155", text: "#000000" };

    return (
        <Card className="flex flex-col gap-4 border transition" style={{ borderColor: "var(--card-hover)" }}>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{task.title}</h3>
                {task.description && (
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {task.description}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t" style={{ borderTopColor: "var(--navbar-border)" }}>
                <span className="text-xs rounded-full px-3 py-1 capitalize font-medium" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                    {task.status}
                </span>

                <div className="flex items-center gap-2">
                    <Link
                        to={`/tasks/${task._id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition text-sm font-medium text-white"
                        style={{ backgroundColor: "var(--accent-cyan)" }}
                    >
                        <Edit2 size={16} />
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition text-sm font-medium text-white"
                        style={{ backgroundColor: "var(--accent-rose)" }}
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </Card>
    );
}
