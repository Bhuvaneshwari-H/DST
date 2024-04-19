/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// AuthController.js


// api/controllers/AuthController.js

// api/controllers/AuthController.js

// api/controllers/AuthController.js

module.exports = {
  login: async function(req, res) {
    try {
      const { email, password } = req.body;

      // Perform validation checks on email and password
      if (!email || !password) {
        return res.badRequest({ message: "Email and password are required." });
      }

      // Query the database to find the user by email and password
      const user = await User.findOne({ email: email, password: password });
      
      // Check if a user with the given credentials was found
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password." });
      }

      // If the user is found and the password is correct, create a session or JWT token
      // Example: req.session.user = user;
      // Example: const token = jwt.sign({ userId: user.id }, 'secret');
      
      // Return a success response indicating successful login
      return res.ok({ message: "Login successful." });
    } catch (error) {
      console.error("Error:", error.message);
      return res.serverError("An error occurred while logging in. Please try again later.");
    }
  }
};
