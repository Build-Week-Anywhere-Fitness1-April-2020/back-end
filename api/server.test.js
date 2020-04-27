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
        expect(process.env.TEST_DB).toBe('af_test');
    })
});

describe('Validate Auth Route', () => {
    it('GET /auth/register', async done => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200);
        done();
    })
})

describe('Token required for classes route', () => {
    it('GET /classes without token', async done => {
        const res = await request(server).get('/classes');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('No authorization header present');
        done();
    })

    it('GET /classes with invalid token', async done => {
        const res = await request(server).get('/classes')
            .set({ Authorization: 'invalid-token' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid Token');
        done();
    })
})

