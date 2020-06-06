import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  });

  return response.json(serializedItems);
});

routes.post('/sites', async (request, response) => {
  const { 
    name,
    email,
    whatsapp,
    city,
    state,
    latitude,
    longitude,
    items
   } = request.body;

   const trx = await knex.transaction();

   const insertedSiteIds = await trx('sites').insert({
    image: 'image_fake',
    name,
    email,
    whatsapp,
    city,
    state,
    latitude,
    longitude
   });

   const site_id = insertedSiteIds[0];

   const siteItems = items.map((item_id: number) => {
     return {
      item_id,
      site_id,
     };
   });

   await trx('site_items').insert(siteItems);

   return response.json({ success: true });
});

export default routes;