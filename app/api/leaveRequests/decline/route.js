import { NextResponse } from "next/server";
import { updateLeaveRequestStatus } from "@/app/services/leaveRequest";
export async function PUT(request) {
  try {
    const leaveRequestId  = await request.json();
    const leaveRequest = await updateLeaveRequestStatus(leaveRequestId, 'Declined');

    return NextResponse.json({
      message: "Успешно отхвърляне на молба за отпуск",
      leaveRequest: leaveRequest,
    });
  } catch (error) {
    return NextResponse.json({
        message: "Неуспех при отхвърляне на молба за отпуск",
      error: error.message,
    }, { status: 500 });
  }
}
