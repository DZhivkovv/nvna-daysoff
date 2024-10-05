import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET (req)
{
    const session = await getServerSession(authOptions);
    const employeeEmail = session.user.email;

    const employeeData = await prisma.employee.findUnique({
        where: {
            email: employeeEmail,
        },
    })
      
    return NextResponse.json({ body: employeeData });
}