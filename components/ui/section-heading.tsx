import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  titleId?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="section-heading-action">{children}</div>}
    </div>
  );
}
