import express from 'express';



const router = express.Router();


router.get('/generate-token', (req, res) => {
  // Generate a token (for demonstration purposes, we'll use a simple string)
  const token = 'my-secret-token';
  res.status(200).send({
    message: 'Token generated please save it for future use',
    token: token 
    });
  })

  router.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome to the Home route! This route is accessible to everyone.'
    });
  });

export default router;