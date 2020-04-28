const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const generateToken = require('../utils/generateToken');

// Clear out database before each test
beforeEach(async () => {
    await db('classes').where('id', '>', '0').del();
});

describe('200 GET to classes', () => {
    it('200 Status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
        const res = await request(server)
            .get('/classes')
            .set({
                Authorization: token
            })
        expect(res.status).toBe(200);
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
                imgUrl: null,
                equiptmentRequired: '',
                arrivalDescription: '',
                additionalInfo: null,
                cost: 23.56,
                description: '',
                address: '',
                startDate: ''
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
                time: 'Class time',
                duration: 1.5,
                intensity: 'Class intensity',
                location: 'Class location',
                maxSize: 10,
                classType: 1,
                imgUrl: 1,
                equiptmentRequired: 'Class Equip',
                arrivalDescription: 'Arival Time',
                additionalInfo: null,
                cost: 23.56,
                description: 'Class Disc',
                address: 'Address',
                startDate: 'Class Start Date'
                
            })
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Post Sucessful');
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
                id: 1,
                name: 'Class name',
                time: 'Class time',
                duration: 1.5,
                intensity: 'Class intensity',
                location: 'Class location',
                maxSize: 10,
                classType: 1,
                imgUrl: 1,
                equiptmentRequired: 'Class Equip',
                arrivalDescription: 'Arival Time',
                additionalInfo: null,
                cost: 23.56,
                description: 'Class Disc',
                address: 'Address',
                startDate: 'Class Start Date'
                
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
            .get('/classes/1')
            .set({
                Authorization: token
            })

        expect(res.status).toBe(200);
        done();
        
    })
})

describe("PUT to classes/:id", function() {
    it('200 status', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();

        let res = await request(server)
            .put('/classes/1')
            .set({
                Authorization: token
            })
            .send({
                name: "Hot YoYo"
            })

        expect(res.status).toBe(200);
        done();
    });
  });

  


