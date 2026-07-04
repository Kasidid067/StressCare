import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    try {
        const body = await req.json();

        const {
            studentId,
            fullname,
            email,
            phone,
            password,
            role,
            year,
            majorId,
            advisorId,
        } = body;

        // ตรวจสอบข้อมูล
        if (
            !studentId ||
            !fullname ||
            !email ||
            !password
        ) {
            return NextResponse.json(
                {
                    message: "กรุณากรอกข้อมูลให้ครบ",
                },
                {
                    status: 400,
                }
            );
        }

        // ตรวจสอบ Student ID
        const existsStudent = await prisma.user.findUnique({
            where: {
                studentId,
            },
        });

        if (existsStudent) {
            return NextResponse.json(
                {
                    message: "Student ID นี้ถูกใช้งานแล้ว",
                },
                {
                    status: 400,
                }
            );
        }

        // ตรวจสอบ Email
        const existsEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existsEmail) {
            return NextResponse.json(
                {
                    message: "Email นี้ถูกใช้งานแล้ว",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                studentId,
                fullname,
                email,
                phone,
                password: hashedPassword,
                role,
                year,
                majorId,
                advisorId,
            },
        });

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}