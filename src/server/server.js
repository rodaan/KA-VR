import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from 'passport';
// import apiRoute from './routes/api';
// import connectRedis from 'connect-redis';

import { resolve } from 'path';
import indexRoute from './routes/index';
// import expressValidator from 'express-validator';

// Load environment variables
require('dotenv').config({ silent: true });
// const RedisStore = connectRedis(session);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(resolve(__dirname, '../../assets')));

// eslint-disable-next-line new-cap
const server = require('http').Server(app);

app
  .use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS'],
    allowHeaders: 'content-type, accept',
    credentials: true,
    maxAge: 10,
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.static(resolve(__dirname, '../client')))
  // .use(session({
  //   secret: 'wonky',
  //   resave: true,
  //   cookie: { maxAge: 60000 },
  //   saveUninitialized: false,
  //   store: new RedisStore(
  //     {
  //       host: '127.0.0.1',
  //       port: 6379,
  //       prefix: 'sess',
  //       pass: '',
  //     }
  //   ),
  // }))
  // .use(passport.initialize())
  // .use(passport.session())
  // .use(apiRoute)
  .use(indexRoute);

server.listen(port, host);
