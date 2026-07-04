import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { getAdminDashboardData } from "@/lib/dashboard/adminDashboard";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {
        return NextResponse.json(
            {
                message: "Forbidden",
            },
            {
                status: 403,
            }
        );
    }

    const dashboard =
        await getAdminDashboardData();

    return NextResponse.json(
        dashboard
    );

}