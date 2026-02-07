import { forwardRef } from "react";

const Button = forwardRef(
    ({ children, className = "", disabled = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={`inline-flex items-center justify-center rounded-md
        px-4 py-2 text-sm font-medium transition
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                style={{
                    backgroundColor: "var(--accent-violet)",
                    color: "var(--text-primary)",
                }}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
