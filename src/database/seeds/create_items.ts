import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Light bulbs', image: 'lampadas.svg' },
    { title: 'Batteries', image: 'baterias.svg' },
    { title: 'Paper and Cardboard', image: 'papeis-papelao.svg' },
    { title: 'Electronics', image: 'eletronicos.svg' },
    { title: 'Organic waste', image: 'organicos.svg' },
    { title: 'Kitchen oil', image: 'oleo.svg' },
  ]);
}