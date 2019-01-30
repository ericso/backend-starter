import AuthController from './lib/auth/AuthController';

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.use('/auth', AuthController);

export default app;
