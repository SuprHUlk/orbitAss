const userModel = require("../../models/user");

const getUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { getUserById };
