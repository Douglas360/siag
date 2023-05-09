import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    login: string;
    email: string;
    admin?: boolean;
    password: string;
    cargo?: string;
    id_empresa: number;
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

}

class CreateUserService {
    async execute({ name, email, admin = false, password, login, id_empresa, cargo }: IUserRequest): Promise<IUser> {
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

        // Hash the password
        const passwordHash = await hash(password, 8);

        // Create the user
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                login,
                admin,
                cargo,
                id_empresa,
                password: passwordHash,
            },
        });

        return user;
    }
}

export { CreateUserService };
