import { Request, Response } from "express";
import { UserProfileService } from "../../../../services/Modules/Registration/UserProfile/UserProfileService";

class UserProfileController {
    async create(request: Request, response: Response) {
        const { nome_perfil, roles } = request.body;



        const userProfileService = new UserProfileService();

        const userProfile = await userProfileService.create({
            nome_perfil,
            id_permissao: roles,
        });

        return response.json(userProfile);
    }

    async listPermissions(request: Request, response: Response) {
        const userProfileService = new UserProfileService();

        const permissions = await userProfileService.listPermissions();

        return response.json(permissions);
    }
}

export { UserProfileController };