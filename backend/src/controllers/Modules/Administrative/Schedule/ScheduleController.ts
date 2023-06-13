import { Request, Response } from "express";
import { ScheduleService } from "../../../../services/Modules/Administrative/Schedule/ScheduleService";

export class ScheduleController {
    async createAppointment(req: Request, res: Response) {
        const { startDate, endDate, text, description, ownerId, priorityId, userIds, groupId } = req.body;

        const scheduleService = new ScheduleService();

        const appointment = await scheduleService.createAppointment(new Date(startDate), new Date(endDate), text, description, ownerId, priorityId, userIds, groupId);
        return res.status(201).json(appointment);

    }

    async getAppointments(req: Request, res: Response) {
        const { userId } = req.params;

        const scheduleService = new ScheduleService();

        const appointments = await scheduleService.getAppointments(Number(userId));
        return res.json(appointments);

    }

    async deleteAppointment(req: Request, res: Response) {

        const loggedUserId = req.query.d_user
        const { id } = req.params;

        const scheduleService = new ScheduleService();

        await scheduleService.removeAppointment(Number(id), Number(loggedUserId));
        //return message if success or not 
        return res.status(200).json({ message: "Appointment deleted successfully" });

    }

    async updateAppointment(req: Request, res: Response) {
        const { startDate, endDate, text, description, priorityId, userIds, groupId } = req.body;
        const ownerId = req.query.d_user
        const { id } = req.params;

        const scheduleService = new ScheduleService();

        const appointment = await scheduleService.updateAppointment(Number(id), new Date(startDate), new Date(endDate), text, description, Number(ownerId), priorityId, userIds, groupId);
        return res.status(200).json(appointment);

    }

    async getUserGroupMappings(req: Request, res: Response) {
        const scheduleService = new ScheduleService();

        try {
            const userGroupMappings = await scheduleService.getUserGroupMappings();
            return res.json(userGroupMappings);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getPriorities(req: Request, res: Response) {
        const scheduleService = new ScheduleService();

        try {
            const priorities = await scheduleService.getPriorities();
            return res.json(priorities);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}
