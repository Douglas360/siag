import prismaClient from "../../../../prisma";

interface ICompanyRequest {
    nome: string;
    endereco: string;
    cnpj: string;
    email: string;
    telefone: string;
}

interface ICompany {
    id_empresa: number;
    nome: string;
    endereco: string;
    cnpj: string;
    email: string;
    telefone: string | null;
    dt_criado?: Date;

}

class CompanyService {
    async create({ nome, endereco, cnpj, email, telefone }: ICompanyRequest): Promise<ICompany> {
        // Validate user input
        if (!nome) {
            throw new Error("Nome is required");
        }
        if (!endereco) {
            throw new Error("Endereco is required");
        }
        if (!cnpj) {
            throw new Error("Cnpj is required");
        }
        if (!email) {
            throw new Error("Email is required");
        }
        if (!telefone) {
            throw new Error("Telefone is required");
        }

        //Check if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        // Check if cnpj is valid
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        if (!cnpjRegex.test(cnpj)) {
            throw new Error("Cnpj is invalid");
        }

        //Check if cnpj already exists
        const existingCnpj = await prismaClient.empresa.findUnique({
            where: { cnpj },
        });
        if (existingCnpj) {
            throw new Error("Company with this cnpj already exists");
        }

        // Check if company already exists
        const existingCompany = await prismaClient.empresa.findUnique({
            where: { email },
        });
        if (existingCompany) {
            throw new Error("Company with this email already exists");
        }

        // Create the company
        const company = await prismaClient.empresa.create({
            data: {
                nome,
                endereco,
                cnpj,
                email,
                telefone,
            },
        });

        return company;
    }

    //function to update company
    async update({ id_empresa, nome, endereco, cnpj, email, telefone }: ICompany): Promise<ICompany> {
        // Validate user input
        if (!nome) {
            throw new Error("Nome is required");
        }
        if (!endereco) {
            throw new Error("Endereco is required");
        }
        if (!cnpj) {
            throw new Error("Cnpj is required");
        }
        if (!email) {
            throw new Error("Email is required");
        }
        if (!telefone) {
            throw new Error("Telefone is required");
        }
       

        // Check if cnpj is valid
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        if (!cnpjRegex.test(cnpj)) {
            throw new Error("Cnpj is invalid");
        }

        //Get the current company's CNPJ
        const currentCompany = await prismaClient.empresa.findFirst({
            where: { id_empresa: id_empresa },
            select: {
                cnpj: true,
                email: true,
                nome: true,
            },
        });

        if (cnpj !== currentCompany?.cnpj && email !== currentCompany?.email && nome !== currentCompany?.nome) {
            const existingCompany = await prismaClient.empresa.findFirst({
                where: { cnpj: cnpj, email: email },
            });
            if (existingCompany) {
                throw new Error("A company with this CNPJ and email already exists");
            }
        }
        // Create the company
        const company = await prismaClient.empresa.update({
            where: { id_empresa },
            data: {
                nome,
                endereco,
                cnpj,
                email,
                telefone,
                dt_atualizado: new Date(),
            },
        });

        return company;
    }
}

export { CompanyService };