const axios = require('axios')

const { app } = require('../index')
const { createServer } = require('http-server')

let server

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
        expect(res.data.name).toBe('PLS TEST')
        expect(res.status).toBe(200)
    })
    test('Get unexisting product', async () => {
        const res = await fetch(url + 'products/7e890ef776cea662344da174')
        expect(res.status).toBe(404)
    })
    test('Get product by wrong id', async () => {
        const res = await fetch(url + 'products/63f')
        expect(res.status).toBe(404)
    })
})
describe('Retrive Cart', () => {
    test('Get cart', async () => {
        const res = await axios.post(url + 'products/cart', {
            data: cart,
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
    })
    test('Get empty cart', async () => {
        const unknown_cart = [
            {
                _id: '63f1',
                quantity: 1,
            },
            {
                _id: '123',
                quantity: 1,
            },
            {
                _id: '312',
                quantity: 1,
            },
            {
                _id: '123',
                quantity: 1,
            },
        ]
        const res = await axios.post(url + 'products/cart', {
            data: unknown_cart,
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data).toStrictEqual([])
    })

    test('Request and get empty cart', async () => {
        const res = await axios.post(url + 'products/cart')
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data).toStrictEqual([])
    })

    test('Request with wrong ID and get empty cart', async () => {
        const res = await axios.post(url + 'products/cart', {
            data: [
                {
                    _id: '7e890ef776cea662344da174',
                    quantity: 1,
                },
                {
                    _id: '36e8514176a122495b2097cb',
                    quantity: 1,
                },
                {
                    _id: '830065183bbcae88c521cba9',
                    quantity: 1,
                },
                {
                    _id: '50151b9467d960c76d52e8fb',
                    quantity: 1,
                },
            ],
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data).toStrictEqual([])
    })
})
describe('Check cart', () => {
    test('Check cart', async () => {
        const res = await axios.post(url + 'products/check_cart', {
            data: cart,
        })
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data.cart[3]).toBeDefined()
        expect(res.data.cart[4]).toBeUndefined()
    })

    test('Check empty cart', async () => {
        const res = await axios.post(url + 'products/check_cart')
        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data.cart).toStrictEqual([])
        expect(res.data.quantity).toStrictEqual(0)
    })
})
