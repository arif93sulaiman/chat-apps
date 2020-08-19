import express from 'express';
// controllers
//import users from '../controllers/users';
// middlewares
import { encode } from '../middlewares/jwt.mjs';

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => { });

export default router;