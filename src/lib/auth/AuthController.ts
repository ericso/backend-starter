/**
 * Endpoints for Authorization
 *
 * /register - creates a new user and returns a signed jwt token
 * /login - checks a provided username and password, returns a signed jwt token
 *
 */

import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../../config';
import models from '../models';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // Make sure we don't already have a user with this username
  models.User.findByLogin(
    {
      login: req.body.username
    },
    (err, user) => {
      if (err) {
        console.log(`Error occured during lookup of user: ${err}`);
      }
      if (user) {
        return res.status(400).send('Username already exists.')
      }
    }
  );

  models.User.create({
    username : req.body.username,
    password : hashedPassword,
  },
  (err, user) => {
    if (err) {
      return res.status(500).send('There was a problem registering the user.');
    }

    // create a token
    var token = jwt.sign(
      { id: user._id },
      config.SECRET,
      { expiresIn: 86400 }, // expires in 24 hours
    );
    res.status(200).send({ auth: true, token: token });
  });
});

router.post('/login', (req, res) =>  {
  models.User.findByLogin(
    {
      login: req.body.username
    },
    (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('No user found.');
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      var token = jwt.sign(
        { id: user._id },
        config.SECRET,
        { expiresIn: 86400 }, // expires in 24 hours
      );
      res.status(200).send({ auth: true, token: token });
    }
  );
});

export default router;
