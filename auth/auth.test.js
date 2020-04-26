const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

// Clear out database before each test
beforeEach(async () => {
    await db('accountRoles').truncate();
    await db('accounts').where('id', '>', '0').del();
});

describe('201 Post to register', () => {
    it('201 Status', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);
        done();
    })
    it('Data gets stored in accounts table', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);

        const inserted = await db('accounts');
        expect(inserted).toHaveLength(1);
        done();
    })
    it('Data has roleId 1', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);

        const inserted = await db('accountRoles', 'id');
        expect(inserted[0].roleId).toBe(1);
        done();
    })
    it('Data has roleId 2', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['client']
            })
        expect(res.status).toBe(201);

        const inserted = await db('accountRoles', 'id');
        expect(inserted[0].roleId).toBe(2);
        done();
    })
    it('Account has two roles', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor', 'client']
            })
        expect(res.status).toBe(201);

        const inserted = await db('accountRoles');
        expect(inserted).toHaveLength(2);
        done();
    })
})

describe('Errors POST to register', () => {
    it('Invalid body', async done => {
        const res = await request(server)
            .post('/auth/register')
            .send({
                username: '',
                email: '',
                password: '',
                roles: []
            })
        expect(res.status).toBe(401);
        done();
    })
})

describe('201 POST to login', () => {
    it('201 Status', async done => {
        let res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);

        res = await request(server)
            .post('/auth/login')
            .send({
                username: 'josiahroa18',
                password: 'josiahroa',
                role: 'instructor'
            });
        expect(res.status).toBe(201);
        done();
    })
    it('User does not exist', async done => {
        res = await request(server)
            .post('/auth/login')
            .send({
                username: 'josiahroa18',
                password: 'josiahroa',
                role: 'instructor'
            });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('User does not exist');
        done();
    })
    it('Invalid credentials', async done => {
        let res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);

        res = await request(server)
            .post('/auth/login')
            .send({
                username: 'josiahroa18',
                password: 'josiah',
                role: 'instructor'
            });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
        done();
    })
    it('Correct role is returned', async done => {
        let res = await request(server)
            .post('/auth/register')
            .send({
                username: 'josiahroa18',
                email: 'josiahroa18@gmail.com',
                password: 'josiahroa',
                roles: ['instructor']
            })
        expect(res.status).toBe(201);

        res = await request(server)
            .post('/auth/login')
            .send({
                username: 'josiahroa18',
                password: 'josiahroa',
                role: 'instructor'
            });
        expect(res.body.role).toBe('instructor');
        done();
    })
})

describe('Errors POST to login', () => {
    it('Missing fields', async done => {
        const res = await request(server)
            .post('/auth/login')
            .send({
                username: '',
                password: '',
                role: ''
            });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('A field is missing');
        done();
    })
})