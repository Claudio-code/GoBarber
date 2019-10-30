import { Router } from 'express';
import multer from 'multer';

import Middleware from './app/middlewares/auth';
import multerConfig from "./config/multer";

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(Middleware); // o middleware só vale depois da importação
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

export default routes;