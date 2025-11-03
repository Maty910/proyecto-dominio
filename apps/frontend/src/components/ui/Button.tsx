type ButtonProps = {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  const base =
    "font-semibold rounded-lg transition-colors duration-200 inline-block"
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-primary",
  }
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  )
}