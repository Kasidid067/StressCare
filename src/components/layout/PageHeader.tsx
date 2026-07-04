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

      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-gray-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}