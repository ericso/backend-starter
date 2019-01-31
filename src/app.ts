import express from 'express';
import cors from 'cors';

import AuthController from './lib/auth/AuthController';
import { createModels } from './models';
import { sequelizeConfig } from './config';

const db = createModels(sequelizeConfig);
db.sequelize.sync();

export { db };

const app = express();
app.use(cors());

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));

app.use('/auth', AuthController);

export default app;
