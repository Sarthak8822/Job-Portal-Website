"use client"
import React, {useEffect} from "react"
import axios from "axios"
import { toast } from "react-hot-toast";
import Navbar from './navbar/page';
import Link from "next/link";
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function JobsList() {
  const router=useRouter()
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [jobId, setJobId] = React.useState("");
  const [filter, setFilter] = React.useState();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const result = await axios.get('/api/jobs/software');
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

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await axios.get(`/api/jobs/software?filter=${filter}`);
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
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-2xl font-bold mb-5">Jobs List</h1>
      <form onSubmit={handleFilterSubmit}>
        <input type="text" value={filter} onChange={handleFilterChange} placeholder="Enter job filter" />
        <button type="submit">Filter</button>
      </form>
      {loading ?
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
        :
        <div className="grid grid-cols-4 gap-4">
          {jobs.map((job, index) => (
            <Link key={index} href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="m-4 w-64 rounded overflow-hidden shadow-lg" >
              <div className="px-6 py-4">
                {job.employer_logo && <Image src={job.employer_logo} alt="Employer Logo" />}
                <div className="font-bold text-xl mb-2">{job.employer_name}</div>
                <p className="text-base text-white">{job.job_title}</p>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
}

