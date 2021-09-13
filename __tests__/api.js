const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)

it('/count endpoint', async count => {
  // Sends GET Request to /test endpoint
  var res = await request.get('/api/count?id=6VjYRSvQiPRMiWxE');
  expect(res.status).toBe(200);
  expect(res.body).toBe(1);
  count();
})

it('/api/status endpoint', async status =>{
  var res = await request.get('/api/status');
  expect(res.body.uptime).toBeGreaterThan(0);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Ok');
  expect(res.body.date >= 0).toBeTruthy();
  expect(res.body.date).toBeLessThan(
    new Date().getTime() / 1000
  )
  status()
})