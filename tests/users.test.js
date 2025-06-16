const request = require('supertest');
const app = require('../app');

beforeEach(() => {
    app.resetUsers(); // Reset the users to initial state before each test
});

describe('GET /users', () => {
    it('should return a list of users', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toEqual(200);

        expect(Array.isArray(res.body)).toBe(true);

        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Alice' }),
            ])
        );
    });
});



describe('POST /users', () => {
    it('should create a new user', async () => {
        const newUser = { id: 3, name: 'Charlie' };

        const res = await request(app)
            .post('/users')
            .send(newUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(newUser);
    });
});

describe('POST /users - invalid input', () => {
    it('should return 400 if name is missing', async () => {
        const invalidUser = { id: 99 };

        const res = await request(app)
            .post('/users')
            .send(invalidUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: 'Name is required' });
    });
});