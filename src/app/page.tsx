// Import necessary modules
"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "./navbar/page";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define the interface for job data
interface JobData {
  employer_logo: string;
  employer_name: string;
  job_title: string;
  job_id: string; // Assuming job_id is a string, adjust it accordingly
}

export default function JobsList() {
  const router = useRouter();
  const [jobs, setJobs] = React.useState<JobData[]>([]); // Specify the type of jobs array
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const result = await axios.get("/api/jobs/allJobs");
        const jobsData = result.data.result.data;
        setJobs(jobsData);
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openJob = async (job_id: string) => {
    try {
      router.push(`/jobPage/${job_id}`); // Redirect to job details page with job info of job_id
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await axios.get(`/api/jobs/software?search=${filter}`);
      const jobsData = result.data.result.data;
      setJobs(jobsData);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-5 text-center">Jobs List</h1>
        <form
          onSubmit={handleSearchSubmit}
          className="mb-4 flex flex-col sm:flex-row items-center"
        >
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search for jobs..."
            className="text-black border p-2 mb-2 sm:mb-0 sm:mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Search
          </button>
        </form>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 rounded-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {jobs.map((job, index) => (
              <div key={index} className="m-4 w-full">
                <div className="bg-[#95b8d1] w-64 bg-gray-500 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                  {job.employer_logo && (
                    <Image
                      loader={() => job.employer_logo}
                      src={job.employer_logo}
                      alt="Employer Logo"
                      width={100}
                      height={100}
                      className="w-full h-24 object-contain mb-4"
                    />
                  )}
                  <div className="px-6 py-4 flex-grow">
                    <div className="font-bold text-xl mb-2">
                      {job.employer_name}
                    </div>
                    <p className="text-base">{job.job_title}</p>
                  </div>
                  <div className="p-4 flex justify-center">
                    <button
                      onClick={() => openJob(job.job_id)}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
