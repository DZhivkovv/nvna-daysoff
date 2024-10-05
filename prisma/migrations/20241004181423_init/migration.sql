-- CreateEnum
CREATE TYPE "Department" AS ENUM ('KORABNI_MASHINI_MEHANIZMI', 'ELEKTROTEHNIKA', 'MEHATRONIKA', 'ELEKTRONIKA', 'INFORMACIONNI_TEHNOLOGII', 'ORGANIZACIA_UPRAVLENIE_VOENNI_FORMIRANIA', 'KORABOVODENE', 'NACIONALNA_SIGURNOST', 'EKSPLOATACIA_MENIDZHMANT_MORSKI_TRANSPORT', 'EZIKOVA_PODGOTOVKA');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "department" "Department" NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "usedDaysOff" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "id" SERIAL NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,
    "employeeId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
