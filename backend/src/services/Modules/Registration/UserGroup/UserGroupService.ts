import prismaClient from "../../../../prisma";

interface IUserGroupRequest {
    nome_grupo?: string;
    descricao_grupo?: string;
}

class UserGroupService {
    //CREATE USER GROUP
    async create({ nome_grupo, descricao_grupo }: IUserGroupRequest) {
        try {
            // Validate user input
            if (!nome_grupo) {
                throw new Error("Group name is required");
            }

            //Validate if user group already exists
            const userGroupAlreadyExists = await prismaClient.groupUser.findFirst({
                where: {
                    nome_grupo: nome_grupo,
                },
            });
            if (userGroupAlreadyExists) {
                throw new Error("User group already exists");
            }

            //Create user group
            const userGroup = await prismaClient.groupUser.create({
                data: {
                    nome_grupo,
                    descricao_grupo,

                },
            });

            return userGroup;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //GET ALL USER GROUPS
    /* async getAll() {
         try {
             const userGroups = await prismaClient.groupUser.findMany({
                 orderBy: {
                     id_grupo: 'asc'
                 }
             });
             return userGroups;
         } catch (error: any) {
             throw new Error(error.message);
         }
     }*/

    //GET ALL USER GROUPS BY NAME AND HOW MANY USERS ARE IN THE GROUP AND RETURN ID_USER
    async getAll() {
        try {
            const userGroups = await prismaClient.$queryRaw`SELECT
            gu.id_grupo,
            gu.nome_grupo,
            gu.descricao_grupo,
            COUNT(ugm.id_usuario) AS qtd_usuarios
        FROM
            
        t_grupo_usuario gu
        LEFT JOIN
            
        t_usuario_grupo ugm ON ugm.id_grupo = gu.id_grupo
        GROUP BY
            gu.id_grupo,
            gu.nome_grupo,
            gu.descricao_grupo
        ORDER BY
            gu.id_grupo ASC;`;
            return userGroups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //GET USER INSIDES GROUP
    async getUsersInsideGroup(id_grupo: number) {
        try {
            //Validate if user group exists
            const userGroupAlreadyExists = await prismaClient.groupUser.findFirst({
                where: {
                    id_grupo: id_grupo,
                },
            });
            if (!userGroupAlreadyExists) {
                throw new Error("User group does not exists");
            }

            //Get users inside group
            const usersInsideGroup = await prismaClient.$queryRaw`SELECT
            u.id,
            u.name,
            u.login
           
        FROM

            t_usuario_grupo ugm
        LEFT JOIN

            t_user u ON u.id = ugm.id_usuario
        WHERE
            
            ugm.id_grupo = ${id_grupo};`;

            return usersInsideGroup;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //UPDATE USER GROUP
    async update({ nome_grupo, descricao_grupo }: IUserGroupRequest, id_grupo: number) {
        try {
            if (!nome_grupo) {
                throw new Error("Group name is required");
            } else if (!id_grupo) {
                throw new Error("Group id is required");
            }
            //Validate if user group exists
            const userGroupAlreadyExists = await prismaClient.groupUser.findFirst({
                where: {
                    id_grupo: id_grupo,
                },
            });
            if (!userGroupAlreadyExists) {
                throw new Error("User group does not exists");
            } else {
                //Validate if user group already exists
                const userGroupAlreadyExists = await prismaClient.groupUser.findFirst({
                    where: {
                        nome_grupo: nome_grupo,
                        id_grupo: {
                            not: id_grupo
                        }
                    },
                });
                if (userGroupAlreadyExists) {
                    throw new Error("User group already exists");
                }

            }


            //Update user group
            const userGroup = await prismaClient.groupUser.update({
                where: {
                    id_grupo: id_grupo,
                },
                data: {
                    nome_grupo,
                    descricao_grupo,
                },
            });

            return userGroup;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //DELETE USER GROUP
    async delete(id_grupo: number) {
        try {
            //Validate if user group exists
            const userGroupAlreadyExists = await prismaClient.groupUser.findFirst({
                where: {
                    id_grupo: id_grupo,
                },
            });
            if (!userGroupAlreadyExists) {
                throw new Error("User group does not exists");
            }

            //Validate if user group is being used
            const userGroupIsBeingUsed = await prismaClient.userGroupMapping.findFirst({
                where: {
                    id_grupo: id_grupo,
                },
            });
            if (userGroupIsBeingUsed) {
                throw new Error("User group is being used");
            }

            //Delete user group
            await prismaClient.groupUser.delete({
                where: {
                    id_grupo: id_grupo,
                },
            });

            return { message: "User group deleted successfully" };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export { UserGroupService };


