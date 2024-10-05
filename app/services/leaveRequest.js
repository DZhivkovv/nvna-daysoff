import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { isWeekday } from '../utils/date';

export const MAX_DAYS_OFF = 20;

// Function to calculate the number of days off excluding weekends
export const calculateDaysOff = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let totalDaysOff = 0;

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    if (isWeekday(date)) {
      totalDaysOff++;
    }
  }

  return totalDaysOff;
};


export const getRemainingDaysOff = async (employeeId) => {
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  return MAX_DAYS_OFF - employee.usedDaysOff;
};



export const createLeaveRequest = async (employeeId, start, end) => {
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  const daysOffRequested = calculateDaysOff(start, end);
  const remainingDaysOff = await getRemainingDaysOff(employeeId);

  if (daysOffRequested > remainingDaysOff) {
    throw new Error('Not enough remaining days off.');
  }

  const leaveRequest = await prisma.leaveRequest.create({
    data: {
      start,
      end,
      employeeId,
      status: 'Pending',
    },
  });

  return leaveRequest;
};



export const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
  try {
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: leaveRequestId },
      include: { Employee: true },
    });

    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }

    if (newStatus !== 'Approved' && newStatus !== 'Declined') {
      throw new Error('Invalid status');
    }

    if (newStatus === 'Approved') {
      const daysOffRequested = calculateDaysOff(leaveRequest.start, leaveRequest.end);
      const remainingDaysOff = await getRemainingDaysOff(leaveRequest.employeeId);

      if (remainingDaysOff >= daysOffRequested) {

        await prisma.employee.update({
          where: { id: leaveRequest.employeeId },
          data: {
            usedDaysOff: {
              increment: daysOffRequested,
            },
          },
        });

        const updatedLeaveRequest = await prisma.leaveRequest.update({
          where: { id: leaveRequestId },
          data: {
            status: newStatus,
          },
        });

        return updatedLeaveRequest;
      } else {
        throw new Error ('Служителят няма достатъчно оставащи дни отпуск.');
      }
    }
    else if (newStatus === 'Declined')
    {
      const updatedLeaveRequest = await prisma.leaveRequest.update({
        where: { id: leaveRequestId },
        data: {
          status: newStatus,
        },
      });
      
      return updatedLeaveRequest;
    }
  } catch (error) {
    throw error; // Re-throw the error after logging it
  }
};
