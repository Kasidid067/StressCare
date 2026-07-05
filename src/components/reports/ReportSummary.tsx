interface Props {
    title: string;
    value: number;
}

export default function ReportSummary({
    title,
    value,
}: Props) {
    return (

        <div className="theme-card rounded-xl p-6">
            <p className="text-[var(--content-muted)]">
                {title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-600">
                {value}
            </h2>
        </div>
    );
}