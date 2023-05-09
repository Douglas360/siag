import { Request, Response } from "express";
import { AuthUserService } from "../../services/User/AuthUserService";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { login, password } = request.body;
       
        const authUserService = new AuthUserService();

        const token = await authUserService.execute({ login, password });

        return response.json(token);
    }
}

export { AuthUserController }