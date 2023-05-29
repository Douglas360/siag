import prismaClient from "../../../../prisma";

interface IJobNameRequest {
    nome_cargo?: string;
    id_empresa?: number;
}

class JobNameService {
    //CREATE JOB NAME
    async create({ nome_cargo, id_empresa }: IJobNameRequest) {
        try {
            // Validate user input
            if (!nome_cargo) {
                throw new Error("Job name is required");
            }

            //Validate if company exists
            const companyAlreadyExists = await prismaClient.empresa.findFirst({
                where: {
                    id_empresa: Number(id_empresa),
                },
            });
            if (!companyAlreadyExists) {
                throw new Error("Company not found");
            }


            //Validate if job name already exists
            const jobNameAlreadyExists = await prismaClient.jobName.findFirst({
                where: {
                    nome_cargo: nome_cargo,
                },
            });
            if (jobNameAlreadyExists) {
                throw new Error("Job name already exists");
            }

            //Create job name
            const jobName = await prismaClient.jobName.create({
                data: {
                    nome_cargo,
                    id_empresa: Number(id_empresa),
                },
            });

            return jobName;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //GET ALL JOB NAMES BY COMPANY
    async list(id_empresa: number) {
        try {
            //Validate if company exists
            const companyAlreadyExists = await prismaClient.empresa.findFirst({
                where: {
                    id_empresa: Number(id_empresa),
                },
            });
            if (!companyAlreadyExists) {
                throw new Error("Company not found");
            }

            //Validate input data
            if (!id_empresa) {
                throw new Error("Company id is required");
            }

            const jobNames = await prismaClient.jobName.findMany({
                where: {
                    id_empresa: Number(id_empresa),
                },
                orderBy: {
                    id_cargo: 'asc'
                },
                select: {
                    id_cargo: true,
                    nome_cargo: true,
                },

            });
            return jobNames;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //UPDATE JOB NAME
    async update({ nome_cargo }: IJobNameRequest, id_cargo: number) {
        try {
            if (!nome_cargo) {
                throw new Error("Job name is required");
            }

            const jobName = await prismaClient.jobName.update({
                where: {
                    id_cargo: id_cargo,
                },
                data: {
                    nome_cargo,
                },
            });

            return jobName;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //DELETE JOB NAME
    async delete(id_cargo: number) {
        try {
            //Validate if job name exists
            const jobNameAlreadyExists = await prismaClient.jobName.findFirst({
                where: {
                    id_cargo: id_cargo,
                },
            });
            if (!jobNameAlreadyExists) {
                throw new Error("Job name not found");
            }

            //Validate if job name is being used
            const jobNameInUse = await prismaClient.user.findFirst({
                where: {
                    id_cargo: id_cargo,
                },
            });
            if (jobNameInUse) {
                throw new Error("Job name is being used");
            }


            await prismaClient.jobName.delete({
                where: {
                    id_cargo: id_cargo,
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export { JobNameService };