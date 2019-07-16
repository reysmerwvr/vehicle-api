const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
    database: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vehicle-api',
    dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./data"));

seeder
  .import(collections)
  .then(() => {
    console.log('Database seeded sucessfully');
  })
  .catch(err => {
    console.log('Database seeded unsucessfully', err);
  });