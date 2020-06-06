import express from 'express';

import SitesController from './controllers/SitesController';
import ItemsController from './controllers/ItemsController';

const sitesController = new SitesController();
const itemsController = new ItemsController();

const routes = express.Router();

routes.get('/items', itemsController.index);

routes.get('/sites', sitesController.index);
routes.get('/sites/:id', sitesController.show);
routes.post('/sites', sitesController.create);

export default routes;