import express from 'express';
import cors from 'cors';

import AuthController from './controllers/Auth';
import MessageController from './controllers/Message';

const app = express();
app.use(cors());

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.use('/auth', AuthController);
app.use('/message', MessageController);

export default app;
