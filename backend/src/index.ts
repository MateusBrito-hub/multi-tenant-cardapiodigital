import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes';

const server = express();

server.use(cors({
    exposedHeaders: ['x-total-count', 'Content-Type'], 
    origin: 'http://localhost:4200',
    credentials: true
}));
server.use(express.json());
server.use(router);

export { server };