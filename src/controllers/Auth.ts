/**
 * Endpoints for Authorization
 *
 * /register - creates a new user and returns a signed jwt token
 * /login - checks a provided username and password, returns a signed jwt token
 *
 */

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import db from '../database';
import config from '../config';
import { UserInstance } from '../models/User';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req: Request, res: Response) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // Make sure we don't already have a user with this username
  db.User.findOne({
    where: { username: req.body.username },
  })
  .then((user: UserInstance) => {
    if (user) {
      res.status(400).send('Username already exists.');
    } else {
      db.User.create({
        username : req.body.username,
        password : hashedPassword,
      })
      .then((user: UserInstance) => {
        var token = jwt.sign(
          { id: user.id },
          config.SECRET,
          { expiresIn: 86400 }, // expires in 24 hours
        );
        res.status(200).send({ token: token });
      })
      .catch(err => res.status(500).send(`Error registering the user: ${err}`));
    }
  });


});

router.post('/login', (req: Request, res: Response) => {
  db.User.findOne({
    where: { username: req.body.username },
  })
  .then((user: UserInstance) => {
    if (!user) {
      res.status(404).send(`No user found by that username: ${req.body.username}`);
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      // Check if password is valid
      res.status(401).send({ token: null });
    } else {
      const token = jwt.sign(
        { id: user.id },
        config.SECRET,
        { expiresIn: 86400 }, // expires in 24 hours
      );
      res.status(200).send({ token: token });
    }
  })
  .catch(err => res.status(500).send(err));
});

export default router;
