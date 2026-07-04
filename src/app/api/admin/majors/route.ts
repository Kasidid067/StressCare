import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const majors =
        await prisma.major.findMany({

            orderBy: {

                id: "asc",

            },

        });

    return NextResponse.json(majors);

}