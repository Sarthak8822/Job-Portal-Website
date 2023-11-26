"use client"
// Import necessary modules
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from './navbar/page';
import Link from "next/link";
import { useRouter } from "next/navigation";
import JobDetail from "./jobPage/page";
import Image from "next/image";

export default function JobsList() {
  const router = useRouter();
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const result = await axios.get('/api/jobs/allJobs');
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

  const handleJob = async (jobId) => {
    try {
      const response = await axios.get(`/api/jobs/job/${jobId}`);
      router.push(`/jobs/${jobId}`); // Redirect to jobs page with job info of job_id
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {

    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
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
          <h1 className="text-2xl font-bold mb-5">Jobs List</h1>
          <form onSubmit={handleSearchSubmit} className="mb-4 flex flex-col sm:flex-row items-center">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search for jobs..."
              className="text-black border p-2 mb-2 sm:mb-0 sm:mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
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
              <Link key={index} href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="m-4 w-full">
                <div className="bg-[#95b8d1] rounded overflow-hidden shadow-lg text-gray-800">
                  {job.employer_logo && (
                    <img src={job.employer_logo} alt="Employer Logo" className="w-full h-40 object-cover rounded-t" />
                  )}
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{job.employer_name}</div>
                    <p className="text-base">{job.job_title}</p>
                  </div>
                  {/* <button>
                    <JobDetail job={job}/>
                  </button> */}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}