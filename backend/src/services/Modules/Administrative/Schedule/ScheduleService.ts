import { Appointment, UserGroupMapping, Priority } from '@prisma/client';
import prismaClient from '../../../../prisma';

class ScheduleService {

    async createAppointment(
        startDate: Date,
        endDate: Date,
        text: string,
        description: string | null,
        ownerId: number | null,
        priorityId: number | null,
        userIds: number[],
        groupId: number[],
    ): Promise<Appointment> {
        if (!startDate || !endDate || startDate >= endDate) {
            throw new Error('Invalid start and end dates');
        }

        if (!text) {
            throw new Error('Appointment text is required');
        }

        const existingUsers = await prismaClient.user.findMany({
            where: {
                id: { in: userIds },
            },
        });

        if (existingUsers.length !== userIds.length) {
            throw new Error('One or more user IDs are invalid');
        }



        try {
            const appointment = await prismaClient.$transaction(async (prisma) => {
                const createdAppointment = await prisma.appointment.create({
                    data: {
                        startDate,
                        endDate,
                        text,
                        description,
                        ownerId,
                        priorityId,
                    },
                });

                if (userIds.length > 0) {
                    const userAppointmentMappings = userIds.map((userId) => ({
                        id_user: userId,
                        id_appointment: createdAppointment.id,
                    }));

                    await prisma.appointmentUser.createMany({
                        data: userAppointmentMappings,
                    });
                }

                if (groupId?.length > 0) {
                    const userGroupMappings = groupId.map((groupId) => ({
                        id_group: groupId,
                        id_appointment: createdAppointment.id,
                    }));

                    await prisma.appointmentGroup.createMany({
                        data: userGroupMappings,
                    });

                }



                return createdAppointment;
            });

            return appointment;


        } catch (error: any) {
            throw error
        }
    }

    async getAppointments(userId: number): Promise<any[]> {
        const appointments = await prismaClient.appointment.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { users: { some: { id_user: userId } } },
                ],
            },
            include: {
                owner: true,
                users: true,
                priority: true,
                groups: true,
            },
        });

        const formattedAppointments = appointments.map((appointment) => {
            const ownerId = appointment.ownerId ? [appointment.ownerId] : [];
            const usersId = appointment.users.map((user) => user.id_user);
            const groupId = appointment.groups.map((group) => group.id_group);

            return {
                id: appointment.id,
                startDate: appointment.startDate.toISOString(),
                endDate: appointment.endDate.toISOString(),
                text: appointment.text,
                priorityId: appointment.priority?.id,
                description: appointment.description,
                ownerId,
                usersId,
                groupId,
            };
        });

        return formattedAppointments;
    }

    async removeAppointment(id: number, user_id: number): Promise<void> {
        // Retrieve the authenticated user's ID or the user ID with the necessary permission
        const authenticatedUserId = user_id

        // Retrieve the appointment details, including the owner ID
        const appointment = await prismaClient.appointment.findUnique({
            where: {
                id,
            },
        });

        if (!appointment) {
            throw new Error('Appointment not found');
        }

        // Compare the owner ID with the authenticated user's ID
        if (appointment.ownerId !== authenticatedUserId) {
            throw new Error('Only the owner can delete the appointment');
        }

        // If the comparison is successful, proceed with the appointment deletion
        await prismaClient.appointment.delete({
            where: {
                id,
            },
        });
    }

    async updateAppointment(
        id: number,
        startDate: Date,
        endDate: Date,
        text: string,
        description: string | null,
        ownerId: number | null,
        priorityId: number | null,
        userIds: number[],
        groupId: number[],

    ): Promise<void> {
        // Retrieve the authenticated user's ID or the user ID with the necessary permission
        const authenticatedUserId = ownerId

        try {
            // Retrieve the appointment details, including the owner ID
            const appointment = await prismaClient.appointment.findUnique({
                where: {
                    id: id,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            // Compare the owner ID with the authenticated user's ID
            if (appointment.ownerId !== authenticatedUserId) {
                throw new Error('Only the owner can update the appointment');
            }

            // If the comparison is successful, proceed with the appointment update
            await prismaClient.appointment.update({
                where: {
                    id: id,
                },
                data: {
                    startDate: startDate,
                    endDate: endDate,
                    text: text,
                    description: description,
                    priorityId: priorityId,
                }
            });

            // Delete all existing user mappings within a transaction
            await prismaClient.$transaction(async (prisma) => {
                await prisma.appointmentUser.deleteMany({
                    where: {
                        id_appointment: id,
                    },
                });

                if (userIds.length > 0) {
                    const userAppointmentMappings = userIds.map((userId: number) => ({
                        id_user: userId,
                        id_appointment: id,
                    }));

                    await prisma.appointmentUser.createMany({
                        data: userAppointmentMappings,
                    });
                }

            });

            // Delete all existing group mappings within a transaction
            await prismaClient.$transaction(async (prisma) => {
                await prisma.appointmentGroup.deleteMany({
                    where: {
                        id_appointment: id,
                    },
                });

                if (groupId?.length > 0) {
                    const userGroupMappings = groupId.map((groupId: number) => ({
                        id_group: groupId,
                        id_appointment: id,
                    }));

                    await prisma.appointmentGroup.createMany({
                        data: userGroupMappings,
                    });
                }

            });
        } catch (error: any) {
            throw error
        }
    }

    async getUserGroupMappings(): Promise<UserGroupMapping[]> {
        return prismaClient.userGroupMapping.findMany();
    }

    async getPriorities(): Promise<Priority[]> {
        return prismaClient.priority.findMany();
    }



}

export { ScheduleService };