const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)

it('/ endpoint', async home =>{
  var res = await request.get('/');
  expect(res.status).toBe(200);
  expect(res.type).toBe("text/html")
  home();
});

it('/logs endpoint', async logs =>{
  var res = await request.get('/logs')
  expect(res.status).toBe(200);
  expect(res.type).toBe("text/html")
  logs();
})