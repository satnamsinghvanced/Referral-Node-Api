const User = require("../../models/user");

module.exports = {
  async userCreate(req, res) {
    try {
      const { email, name } = req.body;

      // Simple validation
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Create new user
      const newUser = await User.create({ email, name });

      // Send response
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  async allUser(req, res) {
    try {
        const users = await User.find().lean();;
        return res.status(200).json({users:users})
    } catch (error) {
        console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" ,error:error.meesage});
    }
  },
};
