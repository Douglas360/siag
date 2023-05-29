import { Request, Response } from "express";
import { JobNameService } from "../../../../services/Modules/Registration/JobName/JobNameService";


class JobNameController {
    async create(req: Request, res: Response) {
        const { nome_cargo, id_empresa } = req.body;

        const jobNameService = new JobNameService();


        const jobName = await jobNameService.create({ nome_cargo, id_empresa });

        return res.json(jobName);

    }

    async list(req: Request, res: Response) {
        const { id } = req.params;

        const jobNameService = new JobNameService();



        const jobNames = await jobNameService.list(Number(id));

        return res.json(jobNames);

    }

    async update(req: Request, res: Response) {
        const { nome_cargo } = req.body;
        const { id } = req.params;


        const jobNameService = new JobNameService();


        const jobName = await jobNameService.update({ nome_cargo }, Number(id));

        return res.json(jobName);

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const jobNameService = new JobNameService();


        await jobNameService.delete(Number(id));

        return res.json({ message: "Job name deleted successfully" });

    }
}

export { JobNameController };