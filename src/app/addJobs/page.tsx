// pages/jobs/add-job.tsx
"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from '../navbar/page';

export default function AddJob() {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    company: "",
    description: "",
    jobApplyLink: "",
    employerLogo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleAddJob = async () => {
    try {
      // Perform any necessary form validation here

      // Send a POST request to the server to add the job
      console.log("JOBDETAILS", jobDetails);
      await axios.post('/api/jobs/add', jobDetails);

      // Redirect to the jobs listing page after successful job addition
      // router.push('/jobsListing');
    } catch (error) {
      console.error("Error adding job:", error);
      // Handle error and display an error message to the user if needed
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Add a Job</h1>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-green-400 my-2">Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={jobDetails.jobTitle}
              onChange={handleInputChange}
              className="w-full text-black border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-400 my-2">Company:</label>
            <input
              type="text"
              name="company"
              value={jobDetails.company}
              onChange={handleInputChange}
              className="w-full text-black border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-400 my-2">Description:</label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-400 my-2">Job Apply Link:</label>
            <input
              type="text"
              name="jobApplyLink"
              value={jobDetails.jobApplyLink}
              onChange={handleInputChange}
              className="w-full text-black border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-400 my-2">Employer Logo URL:</label>
            <input
              type="text"
              name="employerLogo"
              value={jobDetails.employerLogo}
              onChange={handleInputChange}
              className="w-full text-black border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleAddJob}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
