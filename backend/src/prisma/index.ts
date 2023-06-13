import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const Appointment = prismaClient.appointment // Access the `Appointment` model


export default prismaClient;