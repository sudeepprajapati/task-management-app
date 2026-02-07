export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="w-full max-w-sm space-y-6">
                <header className="space-y-1 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {title}
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {subtitle}
                    </p>
                </header>

                <div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
