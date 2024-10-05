import { calculateTotalDays } from '../date.js';
import jsPDF from 'jspdf'; // Import jsPDF library
applyPlugin(jsPDF);
import { applyPlugin } from 'jspdf-autotable';
import { getAuthenticatedEmployeeData } from '../employees.js';
import { amiriFont } from '@/app/fonts/amiriBase64.js';

export async function saveDaysOffInDatabase(data)
{
    const response = await fetch('/api/leaveRequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    return result
}


export async function fetchDaysOff(url)
{
  const response = await fetch(url);
  const data = await response.json();

  return data;
}


export async function removeDaysOffFromDatabase(id)
{
  await fetch('/api/leaveRequests/userLeaveRequests/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestId: id,
    }),
  });

}


export async function updateDaysOffInDatabase(id, updatedData) {
    const response = await fetch(`/api/leaveRequests/userLeaveRequests/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id,updatedData}),
    });
    
    const data = await response.json();
    return data;  
}


export async function approveDaysOff(id)
{
  const response = await fetch('/api/leaveRequests/approveDaysOff', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });

  const data = await response.json();
  return data;  
}


export async function declineDaysOff(id)
{
  const response = await fetch('/api/leaveRequests/declineDaysOff', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });
  
  const data = await response.json();
  return data;  
}


export async function downloadDaysOffInvoice(id, startDate, endDate) 
{
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: `Invoice - Days Off - ID: ${id}`,
    author: 'Your Company Name', // Replace with your company name
    subject: 'Invoice for Days Off',
    keywords: 'invoice, days off, employee',
  });

  // Set font and style
  doc.setFontSize(12);
  doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
  doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
  doc.setFont("Amiri");

  // Add company logo with adjusted dimensions to maintain aspect ratio
  const logoWidth = 40; // Adjust the width if needed
  const logoHeight = 20; // Adjust the height if needed to maintain aspect ratio
  doc.addImage('/nvna-logo.png', 'PNG', 15, 15, logoWidth, logoHeight);

  // Title and address section
  const title = 'Справка - отпуска';
  const companyName = 'ВВМУ "Н. Й. Вапцаров"';
  const companyAddress = 'ул. „Васил Друмев“ 73, 9002 Варна';

  // Set the company name and address next to the logo
  doc.setFontSize(12);
  const textX = 60; // Adjust X coordinate as needed to align with the logo
  doc.text(companyName, textX, 25);
  doc.text(companyAddress, textX, 35);

  // Set the title below the address
  doc.setFontSize(18);
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 70, { align: 'center' });

  // Draw a line below the header
  doc.setLineWidth(0.5);
  doc.line(20, 75, doc.internal.pageSize.getWidth() - 20, 75);

  // Fetch employee details
  const employeeData = await getAuthenticatedEmployeeData();

  // Employee details section
  doc.setFontSize(12);
  doc.setFont("Amiri", "bold");
  doc.setFont("Amiri", "normal");
  
  const employeeDepartment = employeeData.department; // Replace with actual department if needed
  
  // Calculate total days off
  const totalDays = calculateTotalDays(startDate, endDate);
  // Add a table for a better layout of dates and details (optional)
  const tableData = [
    ['Номер на справка', id],
    ['Дата', new Date().toLocaleDateString()],
    ['Служител', `${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName}`],
    ['Отдел', employeeDepartment],
    ['Позиция', employeeData.position],
    ['Начало на отпуск', startDate.substring(0,10)],
    ['Край на отпуск', endDate.substring(0,10)],
    ['Общо дни', totalDays]
  ];

  doc.autoTable({
    head: [['Описание', 'Данни']],
    body: tableData,
    startY: 90,
    theme: 'striped',
    headStyles: { fillColor: [0, 0, 128] }, // Navy blue color for the header
    styles: { font: "Amiri", fontSize: 12} // Navy blue color for the text
  });

  // Add signature section
  const finalY = doc.autoTable.previous.finalY + 20; // Get the Y coordinate after the table
  doc.text('Подпис:', 20, finalY);

  // Save the PDF
  doc.save(`invoice-${id}.pdf`);
}