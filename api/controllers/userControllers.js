const userService = require("../services/userService");

const userController = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = userController;
