import * as React from "react";

const InputPassword = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[10px]"
          >
            {showPassword ? "Esconder" : "Mostrar"}
          </button>
        )}
      </div>
    );
  }
);
InputPassword.displayName = "Input";

export { InputPassword };