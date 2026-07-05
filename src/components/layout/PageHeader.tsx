interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-6">

      <h1 className="text-3xl font-bold text-[var(--content-text)]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-[var(--content-muted)]">
          {subtitle}
        </p>
      )}

    </div>
  );
}