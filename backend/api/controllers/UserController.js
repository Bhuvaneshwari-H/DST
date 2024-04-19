const bcrypt = require('bcryptjs'); // Import bcryptjs library for password hashing

module.exports = {
  async user(req, res) {
    try {
      const { username, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
        
      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        or: [
          { username },
          { email }
        ]
      });

      // If a user with the same username or email exists, return an error response
      if (existingUser) {
        return res.status(400).send({ error: 'Username or email already exists' });
      }

      // If the username and email are unique, create the new user with hashed password
      const newUser = await User.create({
        username,
        email,
        password // Store the hashed password
      }).fetch();

      // Trigger the user created event
      sails.emit('userCreated', newUser);
      // Send welcome email
      
      console.log('Email Sent');

      // Return the newly created user object
      return res.ok(newUser);
    } catch (error) {
      // Return server error if any
      return res.serverError(error.message);
    }
  }
};
