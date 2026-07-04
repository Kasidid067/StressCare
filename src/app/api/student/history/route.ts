import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {

    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== Role.STUDENT
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

    const history =
        await prisma.stressResult.findMany({
            where: {
                userId:
                    Number(session.user.id),
            },

            orderBy: {
                createdAt: "desc",
            },
        });

    return NextResponse.json(
        history
    );

}