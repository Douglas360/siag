import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { uploadFile } from "../../config/multer";

class CreateUserController {

    async handle(req: Request, res: Response) {
        const { name, email, admin, password, login, id_empresa, cargo, id_perfil, id_grupo, id_user } = req.body;
      
        //verify if file is empty       
        if (!req.file) {
            throw new Error('File is empty');
        }

        const createUserService = new CreateUserService();

        const folderName = 'avatar';

        const file = req.file;

        const fileUrl = await uploadFile(file, folderName);

        const user = await createUserService.execute({
            name,
            email,
            admin,
            password,
            login,
            cargo,
            id_empresa: Number(id_empresa),
            id_perfil: Number(id_perfil),
            id_grupo: Number(id_grupo),
            id_user: Number(id_user),
            avatar: fileUrl as string,

        });

        return res.json(user);
    }

    async checkLogin(req: Request, res: Response) {
        const { login, id_empresa } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.checkLoginExists(login, Number(id_empresa));

        return res.json(user);
    }

    async listUsers(req: Request, res: Response) {
        const { id_empresa } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.listUsers(Number(id_empresa));

        return res.json(user);
    }
}

export { CreateUserController };

