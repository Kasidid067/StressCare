interface Props {
    no: number;
    question: string;
    value: number | null;
    onChange: (score: number) => void;
}

export default function ST5Question({
    no,
    question,
    value,
    onChange,
}: Props) {

    return (

        <div className="theme-card rounded-xl p-6">
            <h2 className="mb-3 text-xl font-bold">
                ข้อ {no}
            </h2>

            <p className="mb-6 text-lg">
                {question}
            </p>

            <div className="flex flex-wrap gap-6">
                {[0, 1, 2, 3].map((score) => (
                    <label
                        key={score}
                        className="flex cursor-pointer items-center gap-2"
                    >

                        <input
                            type="radio"
                            name={`question-${no}`}
                            value={score}
                            checked={value === score}
                            onChange={() => onChange(score)}
                            className="h-5 w-5"
                        />

                        <span className="text-lg">
                            {score}
                        </span>
                    </label>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-4 text-center text-sm text-[var(--content-muted)]">
                <span>0<br />ไม่เลย</span>
                <span>1<br />บางครั้ง</span>
                <span>2<br />บ่อย</span>
                <span>3<br />เป็นประจำ</span>
            </div>
        </div>
    );
}