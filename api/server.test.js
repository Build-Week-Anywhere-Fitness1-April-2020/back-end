const request = require('supertest');
const server = require('./server');


describe('Server', () => {
    it('Testing enviornment', () => {
        expect(process.env.DB_ENV).toBe('test');
    })
    it('Server running', async done => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200);
        done();
    })
    it('Testing DB path', () => {
        expect(process.env.TEST_DB).toBe('postgres://localhost/af_test');
    })
});

describe('Validate Auth Route', () => {
    it('GET /auth/register', async done => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200);
        done();
    })
})

