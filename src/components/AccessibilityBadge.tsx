import { LucideIcon } from "lucide-react";

interface AccessibilityBadgeProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function AccessibilityBadge({ icon: Icon, label, active, onClick }: AccessibilityBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-soft"
          : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
