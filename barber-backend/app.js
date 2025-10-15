import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import container, { default as containerExport } from './container.js';
import { scopePerRequest } from 'awilix-express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// attach DI container per request
app.use(scopePerRequest(containerExport));

// routes
app.use('/api', routes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

//so its not "Cannot Get"
app.get('/', (req, res) => res.send('Barber backend running...'));

export default app;
