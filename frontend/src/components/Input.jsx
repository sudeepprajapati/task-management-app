import { forwardRef } from "react";

const Input = forwardRef(
    ({ type = "text", placeholder = "", className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-2 transition ${className}`}
                style={{
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    placeholderColor: "var(--text-muted)",
                }}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
export default Input;
