import { Request, Response } from 'express';
import knex from '../database/connection';

class SitesController {
  async index(request: Request, response: Response) {
    const { city, state, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const sites = await knex('sites')
      .join('site_items', 'sites.id', '=', 'site_items.site_id')
      .whereIn('site_items.item_id', parsedItems)
      .where('city', String(city))
      .where('state', String(state))
      .distinct()
      .select('sites.*');
    
    return response.json(sites);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const site = await knex('sites').where('id', id).first();

    if(!site){
      return response.status(400).json({ message: 'Site not found' })
    }

    const items = await knex('items')
      .join('site_items', 'items.id', '=', 'site_items.item_id')
      .where('site_items.site_id', id)
      .select('items.title');

    return response.json({ site, items });
  }

  async create(request: Request, response: Response) {
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
  
     const site = {
      image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      city,
      state,
      latitude,
      longitude
     };

     const insertedSiteIds = await trx('sites').insert(site);
  
     const site_id = insertedSiteIds[0];
  
     const siteItems = items.map((item_id: number) => {
       return {
        item_id,
        site_id,
       };
     });
  
    await trx('site_items').insert(siteItems);
    
    await trx.commit();
  
    return response.json({
      id: site_id,
      ...site,
    });
  }
}

export default SitesController;