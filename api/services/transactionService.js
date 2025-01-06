const transactionModel = require("../../models/transaction");
const mongoose = require("mongoose");

const getTransactionsByUserId = async (userId, filters) => {
  try {
    const { status, type, from, to, page = 1, limit = 10 } = filters;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const skip = (pageNum - 1) * limitNum;

    const pipeline = [
      {
        $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) },
      },
    ];

    if (status) {
      const statusArray = Array.isArray(status) ? status : status.split(",");
      pipeline.push({
        $match: { status: { $in: statusArray } },
      });
    }

    if (type) {
      pipeline.push({
        $match: { type: type },
      });
    }

    if (from || to) {
      const dateFilter = {};
      if (from) dateFilter.$gte = new Date(from);
      if (to) dateFilter.$lte = new Date(to);

      pipeline.push({
        $match: { transactionDate: dateFilter },
      });
    }

    pipeline.push({ $skip: skip }, { $limit: limitNum });

    const transactions = await transactionModel.aggregate(pipeline);
    return {
      page: pageNum,
      limit: limitNum,
      data: transactions,
    };
  } catch (error) {
    return error.message;
  }
};

const getTransactionsWithUserDetails = async (filters) => {
  try {
    const { status, type, from, to, page = 1, limit = 10 } = filters;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const pipeline = [];

    const matchStage = {};

    if (status) {
      const statusArray = Array.isArray(status) ? status : status.split(",");
      matchStage.status = { $in: statusArray };
    }

    if (type) {
      matchStage.type = type;
    }

    if (from || to) {
      const dateFilter = {};
      if (from) dateFilter.$gte = new Date(from);
      if (to) dateFilter.$lte = new Date(to);

      matchStage.transactionDate = dateFilter;
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    });

    pipeline.push({
      $unwind: "$user",
    });

    pipeline.push({ $skip: skip }, { $limit: limitNum });

    const transactions = await transactionModel.aggregate(pipeline);

    return {
      page: pageNum,
      limit: limitNum,
      data: transactions,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = { getTransactionsByUserId, getTransactionsWithUserDetails };
