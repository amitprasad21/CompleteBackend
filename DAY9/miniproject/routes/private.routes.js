import express from 'express';
import authmiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// /dashboard
router.get('/dashboard', authmiddleware, (req, res) => {
  res.status(200).send({
    message: `Welcome to the Dashboard! ${req.user.name}, you have access to this private route.`,
  });
});

export default router;