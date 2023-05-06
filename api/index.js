import express from 'express';
import {crossOriginResourcePolicy} from 'helmet';
import {config} from 'dotenv';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {connect} from './db/init.js';
import {products} from './routes/products.routes.js';
import {error_handler} from './middlewares/error_handler';
import {auth} from './routes/auth.routes.js';
import {payment} from './routes/payment.routes.js';
import {reviews} from './routes/reviews.routes.js';
import {admin} from './routes/admin.routes.js';
import {auth_middleware} from './middlewares/auth_handler';
import {user_router} from './routes/user.routes.js';
import expressAsyncHandler from 'express-async-handler';
import {Users} from './db/users.js';

// SETUP
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs with Swagger',
      version: '0.1.0',
      description:
        'E-COM (Shops, Sites, Commerce & etc.) CRUD API application made',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Plenty',
        url: 'https://logrocket.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
      {
        url: 'http://159.89.108.59',
      },
    ],
  },
  apis: ['./controllers/*.js', './routes/*.js'],
};

config({path: '../.env'});

if (process.env.NODE_ENV !== 'production') {
  process.env.API_PORT = 4000;
  process.env.API_URL = 'http://localhost:4000/api';
  process.env.PUBLIC_URL = 'http://localhost:3000';
  process.env.NODE_ENV = 'development';
}

connect();
const specs = swaggerJsdoc(options);

export const app = express()
  .disable('x-powered-by')
  .use(crossOriginResourcePolicy({policy: 'cross-origin'}))
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({extended: false}))
  // ROUTES

  .use('/api/img', express.static('./public/img'))
  .use('/api', products)
  .use('/api/reviews', reviews)
  .use('/api/auth', auth)
  .use('/api/payment', payment)
  .use(
    '/api/admin',
    auth_middleware,
    expressAsyncHandler(async (req, res, next) => {
      const admin = await Users.findOne({_id: req.user});
      if (admin.email !== process.env.ADMIN_EMAIL) {
        res.status(401);
        throw new Error({message: 'Wrong token'});
      } else {
        next();
      }
    }),
    admin
  )
  .use('/api/user', auth_middleware, user_router)
  .use(error_handler)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.listen(process.env.API_PORT, () => {
  console.log(`app is listening to port ${process.env.API_PORT}`);
});
