import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  login: string;
  email: string;
  admin?: boolean;
  avatar?: string;
  password: string;
  id_cargo?: number | null;
  id_empresa: number;
  id_perfil?: number;
  id_grupo?: number;
  id_user?: number;
}

interface IUpdateUserRequest {
  name?: string;
  login?: string;
  email?: string;
  avatar?: string;
  password?: string;
  id_cargo?: number | null;
  id_perfil?: number;
  id_grupo?: number;
  id_empresa?: number;
  id?: number;
}

interface IUser {
  id: number;
  name: string | null;
  login: string;
  email: string;
  admin: boolean;
  password: string;
  id_empresa?: number;
  createdAt: Date;
  avatar?: string | null;
}

class CreateUserService {
  async execute({
    name,
    email,
    admin = false,
    password,
    login,
    id_empresa,
    id_perfil,
    id_cargo,
    id_grupo,
    avatar,
    id_user,
  }: IUserRequest): Promise<IUser> {
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
          id_cargo,
          id_empresa,
          password: passwordHash,
        },
      });

      // Create user profile mapping for the user created above
      if (id_perfil) {
        const userProfile = await prismaClient.userProfile.findFirst({
          where: {
            id_perfil: id_perfil,
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

      // Create user group mapping for the user created above
      if (id_grupo) {
        const userGroup = await prismaClient.groupUser.findFirst({
          where: {
            id_grupo: id_grupo,
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

      // Create Log for user created above
      await prismaClient.log.create({
        data: {
          id_user: id_user,
          id_empresa: id_empresa,
          descricao: `Usuário ${name} criado com sucesso`,
        },
      });

      return user;
    } catch (error: any) {
      throw error;
    }
  }

  // Verifica se o login já existe com a empresa informada
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

  // Lista todos os usuários cadastrados na empresa informada
  async listUsers(id_empresa: number): Promise<IUser[]> {
    try {
      const users = await prismaClient.user.findMany({
        where: {
          id_empresa: id_empresa,
        },
        orderBy: {
          name: "asc",
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

  async updateUser(id: number, updatedData: IUpdateUserRequest, id_perfil: number, id_grupo: number): Promise<IUser> {
    try {
      const existingUser = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Check if login and empresa linked user already exists
      if (updatedData.login && updatedData.email) {
        const userAlreadyExists = await prismaClient.user.findFirst({
          where: {
            login: updatedData.login,
            email: updatedData.email,
            NOT: {
              id: id,
            },
            id_empresa: existingUser.id_empresa,
          },
        });
        if (userAlreadyExists) {
          throw new Error("User with this login already exists");
        }
      }

      // Check if cargo exists
      if (updatedData.id_cargo) {
        const cargoExists = await prismaClient.jobName.findUnique({
          where: {
            id_cargo: updatedData.id_cargo,
          },
        });
        if (!cargoExists) {
          throw new Error("Cargo not found");
        }
      }

      const oldPassword: string = existingUser.password;

      if (updatedData.password === oldPassword) {
        updatedData.password = oldPassword;
      } else {
        const pass = updatedData.password || "";
        updatedData.password = await hash(pass, 8);
      }

      const updatedUserData = await prismaClient.user.update({
        where: { id },
        data: updatedData,
      });

      // Update user profile mapping for the user updated above
      if (id_perfil) {
        const userProfile = await prismaClient.userProfile.findFirst({
          where: {
            id_perfil: id_perfil,
          },
        });

        if (userProfile) {
          await prismaClient.userProfileMapping.updateMany({
            where: {
              id_usuario: id,
            },
            data: {
              id_perfil: userProfile.id_perfil,
            },
          });
        } else {
          throw new Error("User profile not found");
        }
      }

      // Update user group mapping for the user updated above
      if (id_grupo) {
        const userGroup = await prismaClient.groupUser.findFirst({
          where: {
            id_grupo: id_grupo,
          },
        });

        if (userGroup) {
          await prismaClient.userGroupMapping.updateMany({
            where: {
              id_usuario: id,
            },
            data: {
              id_grupo: userGroup.id_grupo,
            },
          });
        } else {
          throw new Error("User group not found");
        }
      }

      // Create Log for user updated above
      await prismaClient.log.create({
        data: {
          id_user: updatedUserData.id,
          id_empresa: updatedUserData.id_empresa,
          descricao: `Usuário ${updatedUserData.name} atualizado com sucesso`,
        },
      });

      return updatedUserData;
    } catch (error: any) {
      throw error;
    }
  }

  async updateUserStatus(id: number, ativo: boolean): Promise<IUser> {
    try {
      const existingUser = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("User not found");
      }

      const updatedUserData = await prismaClient.user.update({
        where: { id },
        data: {
          ativo: ativo,
          updatedAt: new Date(),
        },
      });

      // Create Log for user updated above
      await prismaClient.log.create({
        data: {
          id_user: updatedUserData.id,
          id_empresa: updatedUserData.id_empresa,
          descricao: `Usuário ${updatedUserData.name} atualizado com sucesso`,
        },
      });

      return { ...updatedUserData, password: undefined as any};
    } catch (error: any) {
      throw error;
    }
  }





  // List user by id
  async listUserById(id: number) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        },
        include: {
          userGroupMapping: {
            select: {
              id_grupo: true,
            },
          },
          userMapping: {
            select: {
              id_perfil: true,
            },
          },

        },


      });

      if (!user) {
        throw new Error("User not found");
      }

      const userData = {
        id: user.id,
        name: user.name,
        login: user.login,
        email: user.email,
        ativo: user.ativo,
        avatar: user.avatar,
        password: user.password,
        id_empresa: user.id_empresa,
        id_cargo: user?.id_cargo || null,
        id_perfil: user?.userMapping[0]?.id_perfil || null,
        id_grupo: user?.userGroupMapping[0]?.id_grupo || null,
      }
      return userData;
    } catch (error: any) {
      throw error;
    }
  }

  // Delete user by id
  async deleteUser(id: number) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      //Delete user profile mapping for the user deleted above
      await prismaClient.userProfileMapping.deleteMany({
        where: {
          id_usuario: id,
        },
      });

      //Delete user group mapping for the user deleted above
      await prismaClient.userGroupMapping.deleteMany({
        where: {
          id_usuario: id,
        },
      });

      await prismaClient.user.delete({
        where: {
          id: id,
        },
      });

      /*  // Create Log for user deleted above
        await prismaClient.log.create({
          data: {
            id_user:id,
            id_empresa: user?.id_empresa,
            descricao: `Usuário ${user.name} deletado com sucesso`,
          },
        });*/

      return { message: "User deleted successfully" };
    } catch (error: any) {
      throw new Error("Error deleting user");
    }
  }



}



export { CreateUserService };
