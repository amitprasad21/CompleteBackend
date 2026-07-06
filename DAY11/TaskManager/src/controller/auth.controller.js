export const login = (req, res) => {
  const { username} = req.body;
  if(!username) {
    return res.status(400).json({ error: 'Username is required' } );
  }
  req.session.username = username;
  res.cookie('username', username, { httpOnly: true, maxAge: 1000 * 60 * 60*24 }); // Set cookie for 1 day

  res.json({ message: 'Login successful' , username: username});
}

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
  });
  res.clearCookie('username');
  res.json({ message: 'Logout successful' });
}