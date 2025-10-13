export function AdBanner({
  size = "medium",
  className = "",
}: {
  size?: "small" | "medium" | "large" | "leaderboard"
  className?: string
}) {
  const sizeClasses = {
    small: "h-24",
    medium: "h-32 md:h-40",
    large: "h-48 md:h-64",
    leaderboard: "h-20 md:h-24",
  }

  return (
    <div className={`w-full ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-muted/30 border border-border rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2 px-4">
          <p className="text-sm text-muted-foreground">Espacio Publicitario</p>
          <p className="text-xs text-muted-foreground/60">
            {size === "leaderboard"
              ? "728x90"
              : size === "large"
                ? "300x250"
                : size === "medium"
                  ? "300x100"
                  : "300x50"}
          </p>
        </div>
      </div>
    </div>
  )
}
