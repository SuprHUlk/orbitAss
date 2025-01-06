const {
  getTransactionsByUserId,
  getTransactionsWithUserDetails,
} = require("../services/transactionService");

const transactionController = {
  getTransactionByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const { status, type, from, to, page, limit } = req.query;
      const filters = { status, type, from, to, page, limit };
      const transactions = await getTransactionsByUserId(userId, filters);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getTransactionsWithUserDetails: async (req, res) => {
    try {
      const { status, type, from, to, page, limit } = req.query;
      const filters = { status, type, from, to, page, limit };
      const transactions = await getTransactionsWithUserDetails(filters);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = transactionController;
