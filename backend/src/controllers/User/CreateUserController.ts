import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {

    async handle(req: Request, res: Response) {
        const folderName = 'avatar';
        const { name, email, admin, password, login, id_empresa, id_cargo, id_perfil, id_grupo, id_user } = req.body;
        const { file } = req;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            admin,
            password,
            login,
            id_cargo: Number(id_cargo),
            id_empresa: Number(id_empresa),
            id_perfil: Number(id_perfil),
            id_grupo: Number(id_grupo),
            id_user: Number(id_user),
            file,
            folderName

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

    async updateUser(req: Request, res: Response) {
        const { name, email, password, login, id_empresa, id_cargo, id_grupo, id_perfil, ativo, avatarUrl } = req.body;
        const { file } = req;
        const status = ativo === 'on' ? true : false;
        console.log(avatarUrl)
        const createUserService = new CreateUserService();

        const updatedUserData = {
            name,
            email,
            password,
            login,
            ativo: status,
            updatedAt: new Date(),
            id_cargo: Number(id_cargo),
            id_empresa: Number(id_empresa),
            id_perfil: Number(id_perfil),
            file,
            avatar: avatarUrl
        };

        const updatedUser = await createUserService.updateUser(Number(req.params.id), updatedUserData, Number(id_perfil), Number(id_grupo));
        return res.json(updatedUser);


    }

    async updateUserStatus(req: Request, res: Response) {
        const { ativo } = req.body;


        const createUserService = new CreateUserService();

        await createUserService.updateUserStatus(Number(req.params.id), ativo);

        return res.json({ message: "User updated" })

    }

    async listUserById(req: Request, res: Response) {

        const createUserService = new CreateUserService();

        const user = await createUserService.listUserById(Number(req.params.id));

        return res.json(user);
    }

    async deleteUser(req: Request, res: Response) {

        const createUserService = new CreateUserService();

        const user = await createUserService.deleteUser(Number(req.params.id));

        return res.json(user);
    }



}

export { CreateUserController };

