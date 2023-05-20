import { Request, Response } from "express";
import { UserGroupService } from "../../../../services/Modules/Registration/UserGroup/UserGroupService";

class UserGroupController {
    async create(req: Request, res: Response) {
        try {
            const { nome_grupo, descricao_grupo } = req.body;

            const userGroupService = new UserGroupService();

            const userGroup = await userGroupService.create({
                nome_grupo,
                descricao_grupo,
            });

            return res.json(userGroup);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const userGroupService = new UserGroupService();

            const userGroups = await userGroupService.getAll();

            return res.json(userGroups);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
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
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userGroupService = new UserGroupService();

            const userGroup = await userGroupService.delete(Number(id));

            return res.json(userGroup);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UserGroupController };