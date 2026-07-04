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
    color = "bg-green-600",

}: SummaryCardProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex justify-between">
                <div>
                    <p className="text-gray-500">
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