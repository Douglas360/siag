import { Router } from 'express';
import { HealthCheck } from './config/healthCheck';
import { CreateUserController } from './controllers/User/CreateUserController';
import { AuthUserController } from './controllers/User/AuthUserController';
import { SendEmailConfirmationController } from './controllers/User/SendEmailConfirmationController';
import { CompanyController } from './controllers/Modules/Registration/Company/CompanyController';
import { DocumentTypeController } from './controllers/Modules/Administrative/DocumentTypeController';
import { UserProfileController } from './controllers/Modules/Registration/UserProfile/UserProfileController';

import { upload } from './config/multer';


const router = Router();


router.get('/health-check', new HealthCheck().healthCheck);

//Routes User
router.post('/create/user', new CreateUserController().handle);
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

//Routes Registration/UserProfile
router.post('/create/user/profile', new UserProfileController().create);
router.get('/list/permissions', new UserProfileController().listPermissions);
router.get('/list/user/profile', new UserProfileController().list);
router.put('/update/user/profile/:id', new UserProfileController().update);
router.delete('/delete/user/profile/:id', new UserProfileController().delete);


export { router };