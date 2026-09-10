interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const cls = { sm: "text-xl", md: "text-2xl", lg: "text-[28px]" }[size]
  return (
    <div
      className={`font-extrabold tracking-tight ${cls} text-white select-none leading-none`}
    >
      E<span className="text-white/30">•</span>
    </div>
  )
}
