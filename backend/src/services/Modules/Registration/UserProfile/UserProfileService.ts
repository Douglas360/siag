import prismaClient from "../../../../prisma";


interface IUserProfileRequest {
    nome_perfil?: string;
    id_permissao?: number[]
}

class UserProfileService {
    //CREATE USER PROFILE
    async create({ nome_perfil, id_permissao }: IUserProfileRequest) {
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

            const formattedPermissions = permissions.map((permission) => ({
                id: permission.modulo?.id_modulo,
                name: permission.modulo?.nome_modulo,
                subroles: [
                    {
                        id: permission.id_permissao,
                        name: permission.nome_permissao,
                    }
                ],
            }));

            return formattedPermissions;
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

} export { UserProfileService };