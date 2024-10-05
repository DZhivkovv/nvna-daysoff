import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
export async function PUT(request) {
    const {id,updatedData} = await request.json();

    try {
        const updatedLeaveRequest = await prisma.LeaveRequest.update({
            where: {
                id: id
            },
            data: {
                start: new Date(updatedData.startDate),
                end: new Date(updatedData.endDate)
            }
        });
        return NextResponse.json({ message: "Request updated successfully", updatedLeaveRequest });
    } catch (error) {
        return NextResponse.error(new Error("Failed to update request"));
    }
}