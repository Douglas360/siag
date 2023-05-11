import { Request, Response } from "express";
import { UserProfileService } from "../../../../services/Modules/Registration/UserProfile/UserProfileService";

class UserProfileController {
    //CREATE USER PROFILE
    async create(req: Request, res: Response) {
        const { nome_perfil, descricao_perfil, roles } = req.body;



        const userProfileService = new UserProfileService();

        const userProfile = await userProfileService.create({
            nome_perfil,
            descricao_perfil,
            id_permissao: roles,
        });

        return res.json(userProfile);
    }

    //READ PERMISSIONS
    async listPermissions(req: Request, res: Response) {
        const userProfileService = new UserProfileService();

        const permissions = await userProfileService.listPermissions();

        return res.json(permissions);
    }

    //READ USER PROFILE
    async list(req: Request, res: Response) {
        const userProfileService = new UserProfileService();

        const userProfiles = await userProfileService.list();

        return res.json(userProfiles);
    }

    //UPDATE USER PROFILE
    async update(req: Request, res: Response) {
        const { nome_perfil, descricao_perfil, roles } = req.body;
        const { id } = req.params;

        const userProfileService = new UserProfileService();

        const userProfile = await userProfileService.update({
            nome_perfil,
            descricao_perfil,
            id_permissao: roles,
        }, Number(id));

        return res.json(userProfile);
    }


    //DELETE USER PROFILE
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const userProfileService = new UserProfileService();

        const userProfile = await userProfileService.delete(Number(id));

        return res.json(userProfile);
    }

}

export { UserProfileController };