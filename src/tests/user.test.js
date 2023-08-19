const request = require("supertest")
const app = require("../app")
require('../models')

const URL_BASE = '/api/v1/users'
let TOKEN
let userId

beforeAll(async () => {
    const user = {
        email: "jorge@gmail.com",
        password: "J123456789"
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

        TOKEN = res.body.token
        
})

test("GET -> 'URL_BASE', should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

test("POST -> 'URL_BASE', should return status code 201, and res.body.firstName === user.firstName",async () => {
    const user = {
        firstName: "Jorge",
        lastName: "Uceta",
        email: "jorge@gmail.com",
        password: "J123456789",
        phone: "532147"        
    }

    const res = await request(app)
    .post(URL_BASE)
    .send(user)

    userId = res.body.id
    
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
})

test("PUT -> 'URL_BASE/:id', should return status code 200 and res.body.firstName === user.firstName",async () => {
    const user = {
        firstName: "Luis"       
    }
    
    const res = await request(app)
        .put(`${URL_BASE}/${userId}`)
        .send(user)
        .set(`Authorization`, `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})


test("POST -> 'URL_BASE/login', should return status code 200, res.body.email === user.email, and res.body.token to be defined",async () => {
    const user = {
        email: "jorge@gmail.com",
        password: "J123456789"
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

    expect(res.status).tobe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).tobe(user.email)
    expect(res.body.toke).toBeDefined()

})


test("POST -> 'URL_BASE/login', should return status code 401",async () => {
    const user = {
        email: "jorge@gmail.com",
        password: "invalid password"
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

    expect(res.status).tobe(401)
})


test("DELETE -> 'URL_BASE/:id', should return status code 204",async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${userId}`)
        .set(`Authorization`, `Bearer ${TOKEN}`)

    expect(res.status).tobe(204)
})