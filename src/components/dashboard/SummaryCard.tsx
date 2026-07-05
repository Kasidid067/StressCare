interface SummaryCardProps {
    title: string;
    value: number;
    icon?: React.ReactNode;
    color?: string;

}

export default function SummaryCard({
    title,
    value,
    icon,
    color = "bg-[var(--accent)]",

}: SummaryCardProps) {
    return (
        <div className="theme-card rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex justify-between">
                <div>
                    <p className="text-[var(--content-muted)]">
                        {title}
                    </p>
                    <h2 className="mt-3 text-4xl font-bold">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-3xl text-white ${color}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}