import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request){
    const session = await getServerSession(authOptions);

    const employeeData = await prisma.employee.findFirst({
        where: {
          email: session.user.email,
        },
    });
 
    const employeeId = employeeData.id;
 
    const employeeDaysOff = await prisma.LeaveRequest.findMany({
        where:{
            employeeId: employeeId
        }
    });
    
    return NextResponse.json(employeeDaysOff);
}
