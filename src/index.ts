import dotenv from 'dotenv';
dotenv.config();

import { startServer } from './infrastructure/web/server.js';
startServer();