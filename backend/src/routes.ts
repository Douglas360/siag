import { Router } from 'express';
import { HealthCheck } from './config/healthCheck';
import { CreateUserController } from './controllers/User/CreateUserController';
import { AuthUserController } from './controllers/User/AuthUserController';
import { SendEmailConfirmationController } from './controllers/User/SendEmailConfirmationController';
import { CompanyController } from './controllers/Modules/Registration/Company/CompanyController';
import { DocumentTypeController } from './controllers/Modules/Administrative/DocumentTypeController';
import { UserProfileController } from './controllers/Modules/Registration/UserProfile/UserProfileController';
import { UserGroupController } from './controllers/Modules/Registration/UserGroup/UserGroupController';
import { OfficialDocumentController } from './controllers/Modules/Administrative/OfficialDocumentController';

import { upload } from './config/multer';


const router = Router();


router.get('/health-check', new HealthCheck().healthCheck);

//Routes User
router.post('/create/user',  upload.single('file'), new CreateUserController().handle);
router.post('/check/login', new CreateUserController().checkLogin);
router.post('/list/users', new CreateUserController().listUsers);
router.post('/auth/user', new AuthUserController().handle);
router.post('/send/email/confirmation', new SendEmailConfirmationController().handle);

//Routes Company
router.post('/create/company', new CompanyController().create);
router.put('/update/company', new CompanyController().update);

//Routes Administrative/DocumentType
router.post('/create/document/type', upload.single('file'), new DocumentTypeController().create);
router.get('/read/document/type', new DocumentTypeController().read);
router.put('/update/document/type/:id', new DocumentTypeController().update);
router.delete('/delete/document/type/:id', new DocumentTypeController().delete);

//Routes Administrative/OfficialDocument
router.post('/create/official/document', upload.single('file'), new OfficialDocumentController().create);
router.get('/list/official/document', new OfficialDocumentController().list);
router.get('/read/official/document/:id', new OfficialDocumentController().read);
router.put('/update/official/document/:id', new OfficialDocumentController().update);
router.delete('/delete/official/document/:id', new OfficialDocumentController().delete);


//Routes Registration/UserProfile
router.post('/create/user/profile', new UserProfileController().create);
router.get('/list/permissions', new UserProfileController().listPermissions);
router.get('/list/user/profile', new UserProfileController().list);
router.put('/update/user/profile/:id', new UserProfileController().update);
router.delete('/delete/user/profile/:id', new UserProfileController().delete);

//Routes Registration/UserGroup
router.post('/create/user/group', new UserGroupController().create);
router.get('/list/user/group', new UserGroupController().list);
router.put('/update/user/group/:id', new UserGroupController().update);
router.delete('/delete/user/group/:id', new UserGroupController().delete);



export { router };