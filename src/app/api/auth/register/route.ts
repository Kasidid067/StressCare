import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/services/auth.service";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      studentId,
      fullname,
      phone,
      email,
      year,
      majorId,
      password,
    } = body;

    if (
      !studentId ||
      !fullname ||
      !phone ||
      !email ||
      !year ||
      !majorId ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณากรอกข้อมูลให้ครบ",
        },
        {
          status: 400,
        }
      );
    }

    await registerUser({
      studentId,
      fullname,
      phone,
      email,
      year,
      majorId,
      password,
    });;

    return NextResponse.json({
      success: true,
      message: "สมัครสมาชิกสำเร็จ",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_EXISTS"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email หรือ Student ID นี้ถูกใช้งานแล้ว",
        },
        {
          status: 400,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดของ Server",
      },
      {
        status: 500,
      }
    );
  }
}