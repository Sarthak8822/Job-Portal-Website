// Import necessary modules
"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from '../../navbar/page';
import { useRouter } from "next/navigation";

export default function JobPage({params}: any) {
    const router = useRouter();
    const [jobData, setJobData] = React.useState()
    console.log("Job Details second page: ", params.job_id)

    const JobId = params.job_id
    
  
    // const parsedJob = JSON.parse(params.jobId);

  useEffect(() => {
    const jobId = params.job_id; // Get the job ID from the URL query parameter

    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          // setLoading(true);
          const result = await axios.get(`/api/jobs/jobDetails?job_id=${JobId}`);
          const jobsData = await result.data.result.data;
          setJobData(jobsData[0])
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        } finally {
          // setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [params.jobId]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto p-4 text-center">
        <div className="mb-5">Job Details</div>
        {jobData && (
          <>
            <h1 className="text-5xl font-bold mb-10">{jobData.employer_name}</h1>
            <div className="mb-10">
              <img src={jobData.employer_logo} alt={jobData.employer_name} className="w-100 h-100 mx-auto mb-10" />
              <span className="text-4xl ml-2 block">{jobData.job_title}</span>
            </div>
            <p className="mb-10 text-justify">{jobData.job_description}</p>
            
            <div className="mb-10">
              <strong>Location:</strong> {jobData.job_city}, {jobData.job_country}
            </div>
            <div className="mb-5">
              <strong>Employment Type:</strong> {jobData.job_employment_type}
            </div>
            <div className="mb-5">
              <strong>Apply Link:</strong>{" "}
              <a href={jobData.job_apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Apply Now
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
