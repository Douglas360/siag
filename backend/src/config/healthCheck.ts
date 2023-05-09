import { Request, Response } from "express";

class HealthCheck {
    async healthCheck(req: Request, res: Response) {
        return res.status(200).json({ message: 'OK' });
    }
}

//export default new HealthCheck();
export { HealthCheck };