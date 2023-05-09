import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, admin, password, login, id_empresa, cargo } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            admin,
            password,
            login,
            cargo,
            id_empresa,
        });

        return res.json(user);
    }
}

export { CreateUserController };

