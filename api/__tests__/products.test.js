const axios = require('axios')

const { app } = require('../index')
const { createServer } = require('http-server')

let server, agent

beforeAll((done) => {
    server = createServer(app)
    return done()
})

afterAll((done) => {
    server.close()
    return done()
})

const url = 'http://localhost:4000/api/'

const cart = [
    {
        _id: '63f535d176df1c158b437d87',
        quantity: 1,
    },
    {
        _id: '63fa3ce363bc25846fc95f5d',
        quantity: 1,
    },
    {
        _id: '63fa3ddfca9028ad28d7fdd6',
        quantity: 1,
    },
    {
        _id: '63fa4b952afe231cc7f506ef',
        quantity: 1,
    },
]

describe('Products', () => {
    test('Get the products', async () => {
        const res = await axios.get(url)
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
    })

    test('Get product', async () => {
        const res = await axios.get(url + 'products/63f535d176df1c158b437d87')

        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
    })

    test('Get cart', async () => {
        const res = await axios.post(url + 'products/cart', {
            data: cart,
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
    })
    test('Check cart', async () => {
        const res = await axios.post(url + 'products/check_cart', {
            data: cart,
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data.cart[3]).toBeDefined()
        expect(res.data.cart[4]).toBeUndefined()
    })
})
