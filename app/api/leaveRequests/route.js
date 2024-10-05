import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { calculateDaysOff } from "@/app/services/leaveRequest";
import { getRemainingDaysOff } from "@/app/services/leaveRequest";

export async function GET(request){
    const allLeaveRequests  = await prisma.LeaveRequest.findMany({
        include: {
          Employee: {
            select: {
              id:true,
              firstName: true,
              middleName: true,
              lastName: true,
              usedDaysOff: true,
            }
          }
        }
      });

      const events = allLeaveRequests.map(leaveRequest => ({
        id: leaveRequest.id,
        employeeId:  `${leaveRequest.Employee.id}`,
        title:  `${leaveRequest.Employee.firstName} ${leaveRequest.Employee.middleName[0]}. ${leaveRequest.Employee.lastName}`,
        start: leaveRequest.start.toISOString().slice(0,10),
        end: leaveRequest.end.toISOString().slice(0,10),
        status: leaveRequest.status,
        usedDaysOff: leaveRequest.Employee.usedDaysOff
      }));

      return NextResponse.json({
        status: 201,
        events,
    });
}


export async function POST(request) {
  const body = await request.json();
  const daysOffRequested = calculateDaysOff(body["daysoff-start"], body["daysoff-end"]);
  const session = await getServerSession(authOptions);
  
  const employeeEmail = session.user.email;
  const employeeData = await prisma.employee.findUnique({
    where: { email: employeeEmail },
  });
  
  const remainingDaysOff = getRemainingDaysOff(employeeData.id);
  
  
  
  if (daysOffRequested > remainingDaysOff) {
    return NextResponse.json({
      status: 400, // Bad Request
      message: `You have ${remainingDaysOff} days off remaining and your request exceeds this.`,
    });
  }  
  


  if (!body["daysoff-start"] || !body["daysoff-end"]) {
          return NextResponse.json({
            status: 400, // Bad Request
            message: "End date cannot be before start date.",
          });    
  }



  if (body["daysoff-start"] > body["daysoff-end"])
  {
    return NextResponse.json({
      status: 400, // Bad Request
      message: "End date cannot be before start date.",
    });
  }
  
  

  await prisma.LeaveRequest.create({
      data: {
          start: new Date(body["daysoff-start"]), 
          end: new Date(body["daysoff-end"]),
          employeeId: employeeData.id, 
      },
  });


  
  return NextResponse.json({
      status: 201,
      message: "Days off successfully scheduled",
  });
}