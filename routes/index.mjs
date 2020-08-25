import express from 'express';
// controllers
//import users from '../controllers/users';
// middlewares
import { encode } from '../middlewares/jwt.mjs';

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => {
    return res.status(200).json({
      success: true,
      authorization: req.authToken
    })
  });

export default router;