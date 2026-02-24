import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "text";
  external?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-[2px] text-[11px] font-medium tracking-[3px] uppercase transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent text-background px-9 py-4 hover:bg-accent-hover hover:-translate-y-px",
    outline:
      "border border-accent/30 text-foreground px-8 py-[15px] hover:border-accent hover:text-accent",
    ghost:
      "text-foreground-muted px-0 py-2 hover:text-foreground border-none bg-none",
    text:
      "text-foreground-muted px-0 py-0 hover:text-foreground border-none bg-none",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
