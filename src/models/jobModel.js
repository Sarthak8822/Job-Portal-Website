// models/JobModel.ts
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  jobApplyLink: { type: String, required: true },
  employerLogo: { type: String, required: true },
});

const Job = mongoose.models.job || mongoose.model
("jobs", jobSchema)

export default Job;
