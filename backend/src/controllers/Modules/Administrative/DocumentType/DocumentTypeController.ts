import { Request, Response } from "express";
import { DocumentTypeService } from "../../../../services/Modules/Administrative/DocumentType/DocumentTypeService"

import { uploadFile } from '../../../../config/multer'

class DocumentTypeController {
    //CREATE DOCUMENT TYPE
    async create(req: Request, res: Response) {

        const { descricao, number_document, type, id_user } = req.body;
        //verify if file is empty
        if (!req.file) {
            throw new Error('File is empty');
        }


        const createDocumentTypeService = new DocumentTypeService();
        const folderName = 'document';

        const fileUrl = await uploadFile(req.file, folderName);

        const documentType = await createDocumentTypeService.create({
            descricao,
            number_document,
            type,
            file: fileUrl as string,
            id_user

        });
        res.json(documentType);
    }

    //READ DOCUMENT TYPE
    async read(req: Request, res: Response) {

        const getDocumentTypeService = new DocumentTypeService();
        const documentType = await getDocumentTypeService.read();
        res.json(documentType);
    }

    //UPDATE DOCUMENT TYPE
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { descricao, number_document, type, id_user } = req.body;
        console.log(descricao)

        const updateDocumentTypeService = new DocumentTypeService();

        const documentType = await updateDocumentTypeService.update(Number(id), {
            descricao,
            number_document,
            type,
            id_user
        });
        res.json(documentType);
    }

    //DELETE DOCUMENT TYPE
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const deleteDocumentTypeService = new DocumentTypeService();

        const documentType = await deleteDocumentTypeService.delete(Number(id));
        res.json(documentType);
    }
}
export { DocumentTypeController };

