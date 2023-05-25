import { uploadFile, deleteFile } from "../../../config/multer";
import prismaClient from "../../../prisma";

interface FileObject {
    originalname: string;
    buffer: Buffer;
}

interface IDocumentTypeRequest {
    descricao?: string;
    numero_documento?: string;
    tipo?: string;
    arquivo?: string;
    id_user?: number;
    file?: FileObject;
    folderName?: string;
}

class OfficialDocumentService {
    //CREATE OFFICIAL DOCUMENT     

    async create({
        descricao,
        numero_documento,
        tipo,
        id_user,
        folderName,
        file
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
                throw new Error("Description is required");
            }
            if (!numero_documento) {
                throw new Error("Number document is required");
            }
            if (!tipo) {
                throw new Error("Type is required");
            }

            if (!id_user) {
                throw new Error("User is required");
            }

            //Validate if number_document type linked user  already exists
            const officialDocumentAlreadyExists = await prismaClient.officialDocument.findFirst({
                where: {
                    numero_documento: numero_documento,
                    tipo: tipo,
                    id_user: user?.id || null,
                },
            });

            if (officialDocumentAlreadyExists) {
                throw new Error("Official Document already exists");
            }

            const fileUrl = await uploadFile(file, folderName);

            const documentType = await prismaClient.officialDocument.create({
                data: {
                    descricao,
                    numero_documento,
                    tipo,
                    arquivo: fileUrl as string,
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

    async list() {
        try {
            const documentType = await prismaClient.officialDocument.findMany({
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
                orderBy: {
                    dt_criado: "desc",
                },
            });
            return documentType;
        } catch (error) {
            throw error;
        }
    }

    //LIST OFFICIAL BY USER DOCUMENT AND IF USER READ THIS OFFICIAL DOCUMENT IN LEITURA TABLE
    async listByUser(id_user: number) {
        try {
            const documents = await prismaClient.officialDocument.findMany({
                where: {
                    leitura: {
                        some: {
                            id_user: id_user,
                        },
                    },
                },
                include: {
                    leitura: true,
                },
            });

            const documentsRead = documents.map((document) => {
                return {
                    id_doc_oficial: document.id_doc_oficial,
                    dt_leitura: document.leitura[0]?.dt_leitura || null,
                };
            });

            return documentsRead;
        } catch (error) {
            throw error;
        }
    }

    //LIST HOW MANY USERS READ THIS OFFICIAL DOCUMENT IN LEITURA TABLE AND HOW MANY USER HAVE IN USER TABLE LINKED ID_EMPRESA
    async listRead(id_empresa: number) {
        try {
            const documents = await prismaClient.officialDocument.findMany({
                where: {
                    id_empresa: id_empresa,
                },
                include: {
                    leitura: true,
                    empresa: {
                        include: {
                            users: {
                                where: {
                                    ativo: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    id_doc_oficial: 'desc',
                },
            });

            const documentsRead = documents.map((document) => {
                return {
                    id_doc_oficial: document.id_doc_oficial,
                    qnt_user_read: document.leitura.length,
                    total_users: document.empresa?.users.length,
                };
            });

            return documentsRead;
        } catch (error) {
            throw error;
        }
    }





    //READ OFFICIAL DOCUMENT AND UPDATE LEITURA TABLE
    async read(id: number, id_user: number): Promise<{ message: string }> {

        const officialDocument = await prismaClient.officialDocument.findUnique({
            where: {
                id_doc_oficial: id
            },
            select: {
                id_user: true,
            }

        });

        if (!officialDocument) {
            throw new Error("Official document not found");
        }

        //Check if any user read this document type in Leitura
        const leitura = await prismaClient.leitura.findFirst({
            where: {
                id_doc_oficial: id,
                id_user: id_user
            },
        });

        if (!leitura) {
            await prismaClient.leitura.create({
                data: {
                    id_doc_oficial: id,
                    id_user: id_user,
                },
            });
        }



        return { message: `Official document has been read` };
    }

    //UPDATE OFFICIAL DOCUMENT 
    async update(id: number, { descricao, tipo, numero_documento, id_user }: IDocumentTypeRequest) {
        try {
            const officialDocument = await prismaClient.officialDocument.findUnique({
                where: { id_doc_oficial: id },
            });

            if (!officialDocument) {
                throw new Error("Official Document not found");
            }

            // Validate user input
            if (!descricao) {
                throw new Error("Description is required");
            }
            if (!numero_documento) {
                throw new Error("Number document is required");
            }
            if (!tipo) {
                throw new Error("Type is required");
            }

            if (!id_user) {
                throw new Error("User is required");
            }

            //Validate if number_document type linked user  already exists
            const officialDocumentAlreadyExists = await prismaClient.officialDocument.findFirst({
                where: {
                    numero_documento: numero_documento,
                    tipo: tipo,
                    id_user: id_user,
                },
            });

            if (officialDocumentAlreadyExists) {
                throw new Error("Official Document already exists");
            }

            //If any user read this document type in Leitura, not allow update 

            const leitura = await prismaClient.leitura.findFirst({
                where: {
                    id_doc_oficial: id,
                    id_user: id_user
                },
            });

            if (leitura) {
                throw new Error("Official document already read");
            }

            const updatedOfficialDocument = await prismaClient.officialDocument.update({
                where: { id_doc_oficial: id },
                data: {
                    descricao: descricao,
                    numero_documento: numero_documento,
                    tipo: tipo,
                    id_user: id_user,
                    dt_atualizado: new Date(),
                },
            });

            return updatedOfficialDocument;
        } catch (error: any) {
            throw error;
        }
    }

    //DELETE OFFICIAL DOCUMENT 
    async delete(id: number, id_user: number) {
        const officialDocument = await prismaClient.officialDocument.findUnique({
            where: {
                id_doc_oficial: id
            },
            select: {
                id_user: true,
            }

        });

        if (!officialDocument) {
            throw new Error("Official document not found");
        }

        //Check if any user read this document type in Leitura
        const leitura = await prismaClient.leitura.findFirst({
            where: {
                id_doc_oficial: id,
                id_user: id_user
            },
        });

        if (leitura) {
            throw new Error("Official document already read");
        }

        // Check permissions
        if (officialDocument.id_user !== id_user) {
            throw new Error('You are not authorized to delete this official document');
        }

        const documentDeleted = await prismaClient.officialDocument.delete({
            where: { id_doc_oficial: id },
        });

        //Delete file from S3

        await deleteFile(documentDeleted.arquivo);



        return { message: `Official document has been deleted` };
    }
}

export { OfficialDocumentService };

