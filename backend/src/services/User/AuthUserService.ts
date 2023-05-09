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

                }
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




        /* const user = await prisma.user.findFirst({
             where: {
                 email,
                 login
             },
             include: {
                 empresa: true // include the linked Empresa record
             }
         });
 
         if (!user) {
 
             const error = new Error("User not found");
             await prisma.log.create({
                 data: {
                     id_user: null,
                     id_empresa: null,
                     descricao: `Error: ${error.message}`,
 
                 }
             });
             throw error;
 
 
         }
 
         // Check if the linked Empresa is active
         if (!user.empresa.ativo) {
 
             const error = new Error("Company is not active");
             await prisma.log.create({
                 data: {
                     id_user: user.id,
                     id_empresa: user.empresa.id_empresa,
                     descricao: `Error: ${error.message}`,
 
                 }
             });
             throw error;
         } else if (user.ativo) {
             const error = new Error("User is not active");
             await prisma.log.create({
                 data: {
                     id_user: user.id,
                     id_empresa: user.empresa.id_empresa,
                     descricao: `Error: ${error.message}`,
 
                 }
             });
             throw error;
         }
 
 
 
 
         const passwordMatch = await compare(password, user.password);
 
         if (!passwordMatch) {
             const error = new Error("Email/Password incorrect");
             await prisma.log.create({
                 data: {
                     id_user: user.id,
                     id_empresa: user.empresa.id_empresa,
                     descricao: `Error: ${error.message}`,
 
                 }
             });
             throw error;
         }
 
 
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
             data: {
                 lastLogin: new Date()
             }
         });
 
         return {
             token,
             name: updatedUser.name,
             login: updatedUser.login,
             email: updatedUser.email,
             admin: updatedUser.admin,
             avatar: updatedUser.avatar
         }*/


    }
}

export { AuthUserService }
