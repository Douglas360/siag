import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthRequest {

    login: string;
    password: string;
    avatar?: string;
}

class AuthUserService {
    async execute({ login, password }: IAuthRequest) {
        const prisma = new PrismaClient();
        const email = login;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },
                    {
                        login,
                    },
                ],
            },
            include: {
                empresa: true // include the linked Empresa record
            }
        });

        try {


            if (!user) {
                throw new Error("User not found");
            }

            if (!user.empresa.ativo) {
                throw new Error('Company is not active');
            }

            if (!user.ativo) {
                throw new Error('User is not active');
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Email/Password incorrect');
            }

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    lastLogin: new Date(),
                },
            });

            const token = sign(
                {
                    email: user.email,
                    login: user.login,
                }, process.env.JWT_SECRET!,
                {
                    expiresIn: "1d",
                }
            );

            // Update lastLogin field of User record
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                include: {
                    empresa: true // include the linked Empresa record
                },
                data: {
                    lastLogin: new Date()
                }
            });

            const userProfileMappings = await prisma.userProfileMapping.findMany({
                where: {
                    id_usuario: updatedUser.id,
                },
                select: {
                    profile: {
                        select: {
                            id_perfil: true,
                        }

                    },
                },
            });

            const profileIds = userProfileMappings.map((mapping) => mapping.profile.id_perfil);

            const profile_permissions = await prisma.profilePermission.findMany({
                where: {
                    id_perfil: {
                        in: profileIds,
                    },
                },
                select: {
                    permission: {
                        include: {
                            modulo: {
                                select: {
                                    id_modulo: true,
                                    nome_modulo: true,
                                },
                            },
                        },
                    },
                },
            });

            const permissions = profile_permissions.reduce((acc, { permission }) => {
                const modulo = permission.modulo;

                // Find the existing entry for the modulo or create a new one
                let moduloEntry = acc.find((entry) => entry.id === modulo?.id_modulo);
                if (!moduloEntry) {
                    moduloEntry = {
                        id: modulo?.id_modulo as number,
                        name: modulo?.nome_modulo as string,
                        subroles: [],
                    };
                    acc.push(moduloEntry);
                }

                // Add the permission as a subrole
                moduloEntry.subroles.push({
                    id: permission.id_permissao,
                    name: permission.nome_permissao,
                });

                return acc;
            }, [] as { id: number; name: string; subroles: { id: number; name: string; }[] }[]);


            return {
                token,
                id: updatedUser.id,
                name: updatedUser.name,
                login: updatedUser.login,
                email: updatedUser.email,
                cargo: updatedUser.cargo,
                admin: updatedUser.admin,
                avatar: updatedUser.avatar,
                empresa: {
                    id_empresa: updatedUser.empresa.id_empresa,
                    nome: updatedUser.empresa.nome,
                    endereco: updatedUser.empresa.endereco,
                    cnpj: updatedUser.empresa.cnpj,
                    telefone: updatedUser.empresa.telefone,
                    email: updatedUser.empresa.email,

                },
                perfil_acesso: permissions,

            }
            //return updatedUser

        } catch (error: any) {


            await prisma.log.create({
                data: {
                    id_user: user?.id || null,
                    id_empresa: user?.empresa.id_empresa || null,
                    descricao: `Error: ${error.message}`,
                },
            });

            throw error;



        }
    }
}

export { AuthUserService }
