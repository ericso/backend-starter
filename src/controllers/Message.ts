/**
 * Endpoints for Messages
 *
 * GET  /message - requests all messages for logged in user
 * GET  /message/:id - request message of :id if logged in user owns message
 * POST /message - creates a new message associted with logged in user
 *
 */

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { UserInstance } from '../models/User';
import { getloggedInUser } from './middleware';
import { MessageInstance } from '../models/Message';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req: Request, res: Response) => {
  getloggedInUser(req)
  .then((user: UserInstance) => {
    user.getMessages()
    .then((messages: MessageInstance[]) => res.status(200).send({ messages }))
    .catch(err => res.status(500).send(`Error creating message ${err}`));
  })
});

router.post('/', (req: Request, res: Response) => {
  getloggedInUser(req)
  .then((user: UserInstance) => {
    user.createMessage({ text: req.body.text })
    .then(() => res.status(201).send('Message created'))
    .catch(err => res.status(500).send(`Error creating message ${err}`));
  })
});

export default router;
