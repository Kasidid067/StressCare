interface Props {
    fullname: string;
}

export default function WelcomeCard({
    fullname,
}: Props) {

    return (
        <div className="rounded-2xl bg-green-600 p-8 text-white shadow">
            <h1 className="text-3xl font-bold">
                👋 สวัสดี
                {" "}
                {fullname}
            </h1>

            <p className="mt-2">
                ยินดีต้อนรับเข้าสู่ระบบประเมินความเครียด
            </p>
        </div>
    );
}