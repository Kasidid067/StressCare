interface Props {
    title: string;
    value: number;
}

export default function ReportSummary({
    title,
    value,
}: Props) {
    return (

        <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">
                {title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-600">
                {value}
            </h2>
        </div>
    );
}