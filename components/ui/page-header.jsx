import { cn } from "@/lib/cn";

export function PageHeader({ title, description, className, children }) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="section-heading">{title}</h1>
      {description ? <p className="section-subheading">{description}</p> : null}
      {children}
    </div>
  );
}
