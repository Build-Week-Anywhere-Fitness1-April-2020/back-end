const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const generateToken = require('../utils/generateToken');

// Clear out database before each test
beforeEach(async () => {
    await db('classes').where('id', '>', '0').del();
});

describe('201 GET to classes', () => {
    it('201 Status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
        const res = await request(server)
            .get('/classes')
            .set({
                Authorization: token
            })
        expect(res.status).toBe(201);
        done();
    })
})

describe('Add class', () => {
    it('Invalid class', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();

        const res = await request(server)
            .post('/classes')
            .set({
                Authorization: token
            })
            .send({
                name: '',
                dateTime: '',
                duration: '',
                intensity: '',
                location: '',
                maxSize: null,
                classType: null,
                imgUrl: null
            })
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Missing field');
        done();
    })
    it('Successfully add a class', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();

        const res = await request(server)
            .post('/classes')
            .set({
                Authorization: token
            })
            .send({
                name: 'Class name',
                dateTime: 'Class time',
                duration: 'Class duration',
                intensity: 'Class intensity',
                location: 'Class location',
                maxSize: 10,
                classType: 1,
                imgUrl: 1
            })
        expect(res.status).toBe(201);
        done();
    })
    it('Data is stored in table', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();

        const res = await request(server)
            .post('/classes')
            .set({
                Authorization: token
            })
            .send({
                name: 'Class name',
                dateTime: 'Class time',
                duration: 'Class duration',
                intensity: 'Class intensity',
                location: 'Class location',
                maxSize: 10,
                classType: 1,
                imgUrl: 1
            })
        expect(res.status).toBe(201);

        const inserted = await db('classes');
        expect(inserted).toHaveLength(1);
        done();
    })
})

describe('GET class by id', () => {
    it('201 status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();

        let res = await request(server)
            .post('/classes')
            .set({
                Authorization: token
            })
            .send({
                name: 'Class name',
                dateTime: 'Class time',
                duration: 'Class duration',
                intensity: 'Class intensity',
                location: 'Class location',
                maxSize: 10,
                classType: 1,
                imgUrl: 1
            })
        expect(res.status).toBe(201);

        res = await request(server)
            .get(`/classes/${res.body[0].id}`)
            .set({
                Authorization: token
            })
        expect(res.status).toBe(201);

        done();
    })
})

