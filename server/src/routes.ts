import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';
import ProfileController from './controllers/ProfileController';
import ensureAuthentication from './middlewares/ensureAuthentication';
import AvatarUserController from './controllers/AvatarUserController';
import FavoritesController from './controllers/FavoritesControllers';

const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const sessionsController = new SessionsController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const profileController = new ProfileController();
const avatarUserController = new AvatarUserController();
const favoritesController = new FavoritesController();

const upload = multer(uploadConfig);
const routes = express.Router();

routes.post('/users', usersController.create);
routes.post('/sessions', sessionsController.create);

routes.post('/password/forgot', forgotPasswordController.create);
routes.post('/password/reset', resetPasswordController.create);

routes.get('/connections', connectionsController.index);

routes.use(ensureAuthentication);

routes.patch('/avatar', upload.single('avatar'), avatarUserController.update);

routes.put('/profile', profileController.update);
routes.get('/profile', profileController.show);

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);

routes.post('/favorites', favoritesController.create);
routes.get('/favorites', favoritesController.index);
routes.delete('/favorites', favoritesController.delete);

export default routes;
