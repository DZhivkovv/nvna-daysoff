
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from 'bcrypt';

export async function POST(request){    
    const body = await request.json();
    const hashedPassword = await hash(body.password, 10);
    const existingEmail = await prisma.employee.findUnique({
        where:{
            email:body.email
        }
    })

    if (existingEmail) {
        return NextResponse.json({
          status: 400,
          message: 'Потребител с такъв email адрес вече съществува',
        }, { status: 400 });
    }

    const result = await prisma.employee.create({
      data: {
       firstName: body.firstName,
       middleName: body.middleName,
       lastName: body.lastName,
       email: body.email,
       password: hashedPassword,
       department: body.department,    
        }
    });
        
    return NextResponse.json({
        user: result,
        status: 201,
    });
}
