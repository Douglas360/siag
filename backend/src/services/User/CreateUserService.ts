import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    login: string;
    email: string;
    admin?: boolean;
    avatar?: string;
    password: string;
    cargo?: string;
    id_empresa: number;
    id_perfil?: number;
    id_grupo?: number;
    id_user?: number;

}

interface IUser {
    id: number;
    name: string | null;
    login: string;
    email: string;
    admin: boolean;
    cargo?: string | null;
    password: string;
    id_empresa?: number;
    createdAt: Date;
    avatar?: string | null;


}

class CreateUserService {
    async execute({ name, email, admin = false, password, login, id_empresa, id_perfil, cargo, id_grupo, avatar, id_user }: IUserRequest): Promise<IUser> {
        try {
            // Validate user input
            if (!name) {
                throw new Error("Name is required");
            }
            if (!login) {
                throw new Error("Login is required");
            }
            if (!email) {
                throw new Error("Email is required");
            }
            if (!password || password.length < 8) {
                throw new Error("Password should be at least 8 characters long");
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error("Invalid email format");
            }

            // Check if user already exists
            const existingUser = await prismaClient.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            // Check if login and empresa linked user already exists
            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    login: login,
                    id_empresa: id_empresa,
                },
            });
            if (userAlreadyExists) {
                throw new Error("User with this login already exists");
            }




            // Hash the password
            const passwordHash = await hash(password, 8);

            // Create the user
            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    avatar,
                    login,
                    admin,
                    cargo,
                    id_empresa,
                    password: passwordHash,
                },
            });

            //Create user profile mapping for the user created above 
            if (id_perfil) {
                const userProfile = await prismaClient.userProfile.findFirst({
                    where: {
                        id_perfil: id_perfil
                    },
                });

                if (userProfile) {
                    await prismaClient.userProfileMapping.create({
                        data: {
                            id_perfil: userProfile.id_perfil,
                            id_usuario: user.id,
                        },
                    });
                } else {
                    throw new Error("User profile not found");
                }
            }

            //Create user group mapping for the user created above
            if (id_grupo) {
                const userGroup = await prismaClient.groupUser.findFirst({
                    where: {
                        id_grupo: id_grupo
                    },
                });

                if (userGroup) {
                    await prismaClient.userGroupMapping.create({
                        data: {
                            id_grupo: userGroup.id_grupo,
                            id_usuario: user.id,
                        },
                    });
                } else {
                    throw new Error("User group not found");
                }
            }



            //Create Log for user created above 
            await prismaClient.log.create({
                data: {
                    id_user: id_user,
                    id_empresa: id_empresa,
                    descricao: `Usuário ${name} criado com sucesso`,
                },
            });

            return user;

        } catch (error: any) {
            //console.error(error);
            throw error;
        }
    }

    //Verifica se o login já existe com a empresa informada
    async checkLoginExists(login: string, id_empresa: number): Promise<boolean> {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                login: login,
                id_empresa: id_empresa,
            },
        });
        if (userAlreadyExists) {
            throw new Error("User with this login already exists");
        } else {
            return false;
        }
    }

    //Lista todos os usuários cadastrados na empresa informada
    async listUsers(id_empresa: number): Promise<IUser[]> {
        try {
            const users = await prismaClient.user.findMany({
                where: {
                    id_empresa: id_empresa,
                },
                orderBy: {
                    name: 'asc',
                },

            });

            const usersWithPassword = users.map((user) => {
                return {
                    ...user,
                    password: undefined as any,
                };
            });

            return usersWithPassword;
        } catch (error: any) {
            throw error;
        }
    }


}

export { CreateUserService };
