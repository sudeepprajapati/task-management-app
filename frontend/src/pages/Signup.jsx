import { useState } from "react";
import { apiRequest } from "../services/api.js";
import AuthLayout from "../components/AuthLayout.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Signup({ onSuccess, onToggleLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            onSuccess();
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Get started with task management"
        >
            <form onSubmit={submit} className="space-y-4">
                <Input
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                    <p className="text-sm text-red-400">{error}</p>
                )}

                <Button className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <div className="mt-4 text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <button
                    onClick={onToggleLogin}
                    className="text-white hover:underline font-medium"
                >
                    Sign in
                </button>
            </div>
        </AuthLayout>
    );
}
