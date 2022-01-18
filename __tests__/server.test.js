'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Testing my HTTP server', () => {

  it('Should be able to run properly', async () => {

    let response = await request.get('/');

    expect(response.status).toEqual(200);
  });

  it('should read from food data', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body.count).toBeDefined();
    expect(response.body.results).toBeDefined();
  });

  it('should post food', async () => {
    const response = await request.post('/food').send({
      text: 'text'  });
    expect(response.status).toEqual(201);
  });

  it('Should be able to respond to a bad route', async () => {

    let response = await request.get('/test');

    expect(response.status).toEqual(404);

});