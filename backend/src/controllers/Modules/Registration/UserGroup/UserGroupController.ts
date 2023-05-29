import { Request, Response } from "express";
import { UserGroupService } from "../../../../services/Modules/Registration/UserGroup/UserGroupService";

class UserGroupController {
    async create(req: Request, res: Response) {

        const { nome_grupo, descricao_grupo } = req.body;

        const userGroupService = new UserGroupService();

        const userGroup = await userGroupService.create({
            nome_grupo,
            descricao_grupo,
        });

        return res.json(userGroup);

    }

    async list(req: Request, res: Response) {

        const userGroupService = new UserGroupService();

        const userGroups = await userGroupService.getAll();

        return res.json(userGroups);

    }

    async getUsersInsideGroup(req: Request, res: Response) {

        const { id } = req.params;

        const userGroupService = new UserGroupService();

        const userGroup = await userGroupService.getUsersInsideGroup(Number(id));
        
        return res.json(userGroup);

    }


    async update(req: Request, res: Response) {

        const { nome_grupo, descricao_grupo } = req.body;
        const { id } = req.params;

        const userGroupService = new UserGroupService();

        const userGroup = await userGroupService.update(
            {
                nome_grupo,
                descricao_grupo,
            },
            Number(id)
        );

        return res.json(userGroup);
    }

    async delete(req: Request, res: Response) {

        const { id } = req.params;

        const userGroupService = new UserGroupService();

        const userGroup = await userGroupService.delete(Number(id));

        return res.json(userGroup);

    }
}

export { UserGroupController };