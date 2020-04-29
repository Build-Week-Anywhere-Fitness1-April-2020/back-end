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
                courseDescription: 'Class Disc',
                address: 'Address',
                startDate: 'Class Start Date',
                instructor: 1,
                days: ["Monday", "Tuesday"]
                
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
                courseDescription: 'Class Disc',
                address: 'Address',
                startDate: 'Class Start Date',
                days: ["Monday", "Tuesday"]
                
            })
        expect(res.status).toBe(201);

        const inserted = await db('classes');
        expect(inserted).toHaveLength(1);
        done();
    })


describe('GET class by id', () => {
    it('200 status', async done => {
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


  
    it('200 GET to class attendees', async done => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
        
        const res = await request(server)
            .get('/classes/1/attendees')
            .set({
                Authorization: token
            })
        expect(res.status).toBe(200);
        done();
    })

    describe("DELETE to /classes/:id", function() {
        test("Returns status 400 No authorization header present", async () => {
          const res = await request(server).delete("/classes/1");
    
          expect(res.status).toBe(400);
        });


    describe('POST classes/add-attendee', () => {
        const token = generateToken({
            id: 1
        });
        expect(token).toBeDefined();
            const data = {
           
                username: 'rileye123',
                email: "riley@gmail.com",
                displayName: "Riley",
                gender: "Female"
            };
    
        it("should return success 201", async () => {
            const response = await request(server)
            .set({
              Authorization: token
          })
              .post("/classes/add-attendee")
              .send(data);
            expect(response.status).toBe(201);
          });
        });