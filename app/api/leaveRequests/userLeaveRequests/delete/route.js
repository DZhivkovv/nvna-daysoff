import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request) {
    const body = await request.json();
    const requestId = body.requestId;
    
    await prisma.LeaveRequest.delete({
        where: { id: requestId },
    });

    return NextResponse.json({ message: "Days off deleted successfully" });
}