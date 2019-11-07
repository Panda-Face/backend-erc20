import { config } from 'dotenv';
import express from 'express';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.development') });
import AdminRouter from './routes/admin-router';

const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure routes
app.use('/api/admin', AdminRouter);

export default app;
