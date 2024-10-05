import { NextResponse } from "next/server";
import { updateLeaveRequestStatus } from "@/app/services/leaveRequest";

export async function PUT(request) {
  try {
    const leaveRequestId  = await request.json();

    const leaveRequest = await updateLeaveRequestStatus(leaveRequestId, 'Approved');
    return NextResponse.json({
      message: "Молбата за отпуск е одобрена",
      leaveRequest: leaveRequest,
    });
  } catch (error) {
    return NextResponse.json({
        message: "Неуспех при одобряване на молба за отпуск",
      error: error.message,
    }, { status: 500 });
  }
}
