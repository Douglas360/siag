import prismaClient from "../../../prisma";

interface IDocumentTypeRequest {
    descricao?: string;
    number_document?: string;
    type?: string;
    file?: string;
    id_user?: number;
}

class DocumentTypeService {
    //CREATE DOCUMENT TYPE    
    async create({
        descricao,
        number_document,
        type,
        file,
        id_user,
    }: IDocumentTypeRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: Number(id_user),
            },
            include: {
                empresa: true // include the linked Empresa record
            }

        });
        try {
            // Validate user input
            if (!descricao) {
                throw new Error("Descrição é obrigatório");
            }
            if (!number_document) {
                throw new Error("Número do documento é obrigatório");
            }
            if (!type) {
                throw new Error("Tipo é obrigatório");
            }
            if (!file) {
                throw new Error("Arquivo é obrigatório");
            }

            if (!id_user) {
                throw new Error("Usuário é obrigatório");
            }

            //Validate if number_document type linked user  already exists
            const documentTypeAlreadyExists = await prismaClient.documentType.findFirst({
                where: {
                    number_document: number_document,
                    type: type,
                    id_user: user?.id || null,
                },
            });

            if (documentTypeAlreadyExists) {
                throw new Error("Document type already exists");
            }




            const documentType = await prismaClient.documentType.create({
                data: {
                    descricao,
                    number_document,
                    type,
                    file,
                    id_user: user?.id || null,
                    id_empresa: user?.empresa.id_empresa || null,
                }
            });

            return documentType;
        } catch (error: any) {
            //console.log(error)
            // Save error in database
            await prismaClient.log.create({
                data: {
                    id_user: user?.id || null,
                    id_empresa: user?.empresa.id_empresa || null,
                    descricao: `Error: ${error}`,
                },
            });

            throw error;

        }
    }

    //READ DOCUMENT TYPE
    async read() {
        const documentType = await prismaClient.documentType.findMany({
            include: {
                user: {
                    select: {
                        id: true, // id_user
                        login: true,
                        empresa: {
                            select: {
                                id_empresa: true,
                            },
                        },
                    },
                },
            },
        });

        return documentType;
    }

    //UPDATE DOCUMENT TYPE
    async update(id: number, data: IDocumentTypeRequest) {
        try {
            const documentType = await prismaClient.documentType.findUnique({
                where: { id_doc_type: id },
            });

            if (!documentType) {
                throw new Error("Document type not found");
            }

            const updatedDocumentType = await prismaClient.documentType.update({
                where: { id_doc_type: id },
                data,
            });

            return updatedDocumentType;
        } catch (error: any) {

        }
    }

    //DELETE DOCUMENT TYPE
    async delete(id: number) {
        const documentType = await prismaClient.documentType.findUnique({
            where: { id_doc_type: id },
        });

        if (!documentType) {
            throw new Error("Document type not found");
        }

        const deletedDocumentType = await prismaClient.documentType.delete({
            where: { id_doc_type: id },
        });

        return { message: `Document type with id ${id} has been deleted` };
    }
}

export { DocumentTypeService };

