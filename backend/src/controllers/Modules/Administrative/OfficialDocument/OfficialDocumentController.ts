import { Request, Response } from "express";
import { OfficialDocumentService } from "../../../../services/Modules/Administrative/OfficialDocument/OfficialDocumentService"

class OfficialDocumentController {
    //CREATE OFFICIAL DOCUMENT
    async create(req: Request, res: Response) {
        const folderName = 'documentos_oficiais';
        const { descricao, numero_documento, tipo, id_user } = req.body;
        const { file } = req;
        //verify if file is empty
        if (!req.file) {
            throw new Error('File is empty');
        }

        const createOfficialDocumentService = new OfficialDocumentService();
        //const folderName = 'documentos_oficiais';

        //const fileUrl = await uploadFile(req.file, folderName);

        const documentOfficial = await createOfficialDocumentService.create({
            descricao,
            numero_documento,
            tipo,
            folderName,
            id_user,
            file


        });
        res.json(documentOfficial);
    }

    //LIST OFFICIAL DOCUMENT 
    async list(req: Request, res: Response) {

        const getOfficialDocumentService = new OfficialDocumentService();
        const documentType = await getOfficialDocumentService.list();
        res.json(documentType);
    }

    //LIST OFFICIAL DOCUMENT BY USER
    async listByUser(req: Request, res: Response) {
        const { id_user } = req.params;

        const getOfficialDocumentService = new OfficialDocumentService();
        const documentType = await getOfficialDocumentService.listByUser(Number(id_user));
        res.json(documentType);
    }

    //LIST HOW MANY USERS READ THE DOCUMENT
    async listRead(req: Request, res: Response) {
        const { id } = req.params;

        const getOfficialDocumentService = new OfficialDocumentService();
        const documentType = await getOfficialDocumentService.listRead(Number(id));
        res.json(documentType);
    }

    //READ OFFICIAL DOCUMENT
    async read(req: Request, res: Response) {
        const { id } = req.params;
        const { id_user } = req.body;


        const readOfficialDocumentService = new OfficialDocumentService();

        const documentType = await readOfficialDocumentService.read(Number(id), Number(id_user));
        res.json(documentType);
    }

    //UPDATE OFFICIAL DOCUMENT
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { descricao, numero_documento, tipo, id_user } = req.body;

        const updateOfficialDocumentService = new OfficialDocumentService();

        const documentType = await updateOfficialDocumentService.update(Number(id), {
            descricao,
            numero_documento,
            tipo,
            id_user
        });
        res.json(documentType);
    }

    //DELETE DOCUMENT TYPE
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { id_user } = req.body;

        const deleteOfficialDocumentService = new OfficialDocumentService();

        const documentType = await deleteOfficialDocumentService.delete(Number(id), Number(id_user));


        res.json(documentType);
    }
}
export { OfficialDocumentController };

