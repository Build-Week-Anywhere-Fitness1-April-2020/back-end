const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const generateToken = require('../utils/generateToken');

// Clear out database before each test
beforeEach(async () => {
    await db('accounts').where('id', '>', '0').del();
});

describe('200 GET to classes attending', () => {
    it('200 Status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
        const res = await request(server)
            .get('accounts/1/classesAttending')
            .set({
                Authorization: token
            })
        expect(res.status).toBe(200);
        done();
    })
});
describe('200 GET to classes instructing', () => {
    it('200 Status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
        const res = await request(server)
            .get('accounts/1/classesInstructing')
            .set({
                Authorization: token
            })
        expect(res.status).toBe(200);
        done();
    })
});





