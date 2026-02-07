export default function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-lg p-4 shadow-sm ${className}`}
            style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
            }}
        >
            {children}
        </div>
    )
}
