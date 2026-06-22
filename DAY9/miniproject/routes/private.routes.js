import express from 'express';

const router = express.Router();

// /dashboard
router.get('/dashboard', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Dashboard! This route is protected and requires authentication.'
  });
});

export default router;