import prismaClient from "../../../../prisma";


interface IUserProfileRequest {
    nome_perfil?: string;
    descricao_perfil?: string;
    id_permissao?: number[]

}

interface Role {
    id: number;
    name: string;
    subroles: Subrole[];
}

interface Subrole {
    id: number;
    name: string;
}

class UserProfileService {
    //CREATE USER PROFILE
    async create({ nome_perfil, descricao_perfil, id_permissao }: IUserProfileRequest) {
        try {
            // Validate user input
            if (!nome_perfil) {
                throw new Error("Profile name is required");
            }

            //Validate if user profile already exists
            const userProfileAlreadyExists = await prismaClient.userProfile.findFirst({
                where: {
                    nome_perfil: nome_perfil,
                },
            });
            if (userProfileAlreadyExists) {
                throw new Error("User profile already exists");
            }

            //Create user profile
            const userProfile = await prismaClient.userProfile.create({
                data: {
                    nome_perfil,
                    descricao_perfil,

                },
            });

            // Create profile permission mappings
            if (id_permissao && id_permissao.length > 0) {
                const profilePermissionMappings = id_permissao.map((id_permissao) => ({
                    id_perfil: userProfile.id_perfil,
                    id_permissao,
                }));

                await prismaClient.profilePermission.createMany({
                    data: profilePermissionMappings,
                });
            }

            return userProfile;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    //LIST PERMISSIONS
    async listPermissions() {
        try {
            const permissions = await prismaClient.permission.findMany({
                orderBy: {
                    id_permissao: 'asc',
                },
                include: {
                    modulo: true,
                },
            });

            const formattedPermissions = permissions.reduce((acc: Role[], permission) => {
                const existingRole = acc.find((role) => role.id === permission.modulo?.id_modulo);

                if (existingRole) {
                    existingRole.subroles.push({
                        id: permission.id_permissao,
                        name: permission.nome_permissao,
                    });
                } else {
                    const newRole: Role = {
                        id: permission.modulo?.id_modulo || 0,
                        name: permission.modulo?.nome_modulo || '',
                        subroles: [
                            {
                                id: permission.id_permissao || 0,
                                name: permission.nome_permissao || '',
                            },
                        ],
                    };

                    acc.push(newRole);
                }

                return acc;
            }, []);


            return formattedPermissions;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    //LIST USER PROFILES
    async list() {
        try {
            const userProfiles = await prismaClient.userProfile.findMany({

                orderBy: {
                    id_perfil: 'asc',
                },
                include: {
                    profilePermission: true,
                },

            });

            return userProfiles;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
 

    //UPDATE USER PROFILE
    async update({ nome_perfil, descricao_perfil, id_permissao }: IUserProfileRequest, id_perfil: number) {
        try {
            if (!nome_perfil) {
                throw new Error("Profile name is required");
            } else if (!id_perfil) {
                throw new Error("Profile id is required");
            } else if (!id_permissao || id_permissao.length === 0) {
                throw new Error("Profile permissions are required");
            }

            //Validate if user profile exists
            const userProfileAlreadyExists = await prismaClient.userProfile.findFirst({
                where: {
                    id_perfil: id_perfil,
                },
            });
            if (!userProfileAlreadyExists) {
                throw new Error("User profile does not exists");
            } else {
                //Validate if user profile already exists
                const userProfileAlreadyExists = await prismaClient.userProfile.findFirst({
                    where: {
                        nome_perfil: nome_perfil,
                        id_perfil: {
                            not: id_perfil,

                        },
                    },
                });
                if (userProfileAlreadyExists) {
                    throw new Error("User profile already exists");
                }
            }




            //Update user profile
            const userProfile = await prismaClient.userProfile.update({
                where: {
                    id_perfil: id_perfil,
                },
                data: {
                    nome_perfil,
                    descricao_perfil,
                },
            });

            //Delete profile permission mappings
            await prismaClient.profilePermission.deleteMany({
                where: {
                    id_perfil: id_perfil,
                },
            });

            //Create profile permission mappings
            const profilePermissionMappings = id_permissao.map((id_permissao) => ({
                id_perfil: userProfile.id_perfil,
                id_permissao,
            }));

            await prismaClient.profilePermission.createMany({
                data: profilePermissionMappings,
            });


            return userProfile;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }


    //DELETE USER PROFILE
    async delete(id_perfil: number) {
        try {
            //Validate if user profile exists
            const userProfileAlreadyExists = await prismaClient.userProfile.findFirst({
                where: {
                    id_perfil: id_perfil,
                },
            });
            if (!userProfileAlreadyExists) {
                throw new Error("User profile does not exists");
            }

            //Validate if user profile is being used by any user
            const userProfileInUse = await prismaClient.userProfileMapping.findFirst({
                where: {
                    id_perfil: id_perfil,
                },
            });
            if (userProfileInUse) {
                throw new Error("User profile is being used by a user");
            }


            //First delete profile permission mappings
            await prismaClient.profilePermission.deleteMany({
                where: {
                    id_perfil: id_perfil,
                },
            });

            //Then delete user profile
            await prismaClient.userProfile.delete({
                where: {
                    id_perfil: id_perfil,
                },
            });


            return { message: "User profile deleted successfully" };
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }



} export { UserProfileService };