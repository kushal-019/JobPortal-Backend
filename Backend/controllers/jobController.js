import mongoose from "mongoose";
import jobSchema from "../models/jobSchema.js";
import moment from "moment/moment.js";

export const createJobController = async (req, res, next) => {
  const { position, company } = req.body;

  if (!company || !position) {
    next("please provide complete details");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobSchema.create(req.body);
  res.status(201).json({ job });
};

export const getAllJobController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  //conditons for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //jobs count
  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};


export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) next("Please provide complete details");

  const job = await jobSchema.findOne({ _id: id });

  if (!job) {
    next(`No job with ${id}`);
    return;
  }

  if (req.user.userId !== job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }

  const updateJob = await jobSchema.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({ updateJob });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  const job = await jobSchema.findOne({ _id: id });

  if (!job) {
    next(`No job with ${id}`);
    return;
  }

  if (req.user.userId !== job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }

  const deletejob = await jobSchema.deleteOne({ _id: id }, req.body, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({ deletejob });
};

export const jobStatsController = async (req, res) => {
  const stats = await jobSchema.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  let monthlyApplication = await jobSchema.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();

  res
    .status(200)
    .json({ totalJob: stats.length, defaultStats, monthlyApplication });
};
