import { Request, Response } from "express";
import { CompanyService } from "../../../../services/Modules/Registration/Company/CompanyService";


class CompanyController {

    // Create Company
    async create(request: Request, response: Response) {
        const { nome, endereco, cnpj, email, telefone } = request.body;

        const createCompanyService = new CompanyService();

        const company = await createCompanyService.create({
            nome,
            endereco,
            cnpj,
            email,
            telefone,
        });

        return response.json(company);
    }

    //Update Company
    async update(request: Request, response: Response) {
        const { id_empresa, nome, endereco, cnpj, email, telefone } = request.body;

        const updateCompanyService = new CompanyService();

        const company = await updateCompanyService.update({
            id_empresa: Number(id_empresa),
            nome,
            endereco,
            cnpj,
            email,
            telefone,
        });

        return response.json(company);
    }
}

export { CompanyController };