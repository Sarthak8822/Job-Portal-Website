// Import necessary modules
"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../../navbar/page";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define the interface for job data
interface JobData {
  employer_name: string;
  employer_logo: string;
  job_title: string;
  job_description: string;
  job_highlights: {
    Qualifications: string[];
  };
  job_country: string;
  job_employment_type: string;
  job_apply_link: string;
}

export default function JobPage({ params }: any) {
  const router = useRouter();
  const [jobData, setJobData] = React.useState<JobData | undefined>();
  const [loading, setLoading] = React.useState(false);

  const JobId = params.job_id;

  useEffect(() => {
    const jobId = params.job_id;

    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          setLoading(true);
          const result = await axios.get(`/api/jobs/jobDetails?job_id=${JobId}`);
          const jobsData = await result.data.result.data;
          setJobData(jobsData[0]);
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [params.jobId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="container mx-auto p-4 text-center">
          <div className="text-3xl mb-5 text-yellow-400 font-bold">Exciting Job Opportunity</div>
          {jobData && (
            <>
              <h1 className="text-5xl font-bold mb-10 text-blue-500">{jobData.employer_name}</h1>
              {jobData.employer_logo && <div className="mb-10 mx-auto flex flex-col items-center">
                <Image
                  loader={() => jobData.employer_logo}
                  src={jobData.employer_logo}
                  alt={jobData.employer_name}
                  width={400}
                  height={400}
                  className="mx-auto mb-2 rounded-full bg-gray-100 shadow-lg"
                />
                <span className="text-4xl ml-2 block">{jobData.job_title}</span>
              </div>}
              <p className="mb-10 text-justify">{jobData.job_description}</p>
              {jobData.job_highlights.Qualifications && (
                <div className="mx-auto mb-10 flex flex-col items-center">
                  <h1 className="text-2xl mb-5 text-yellow-400">Qualifications:</h1>
                  <ul className="text-justify mb-5 list-disc mx-auto">
                    {jobData.job_highlights.Qualifications.map((qualification: any, index: any) => (
                      <li className="mb-3" key={index}>
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-5 mx-auto">
                <strong className="text-yellow-400">Location:</strong> {jobData.job_country}
              </div>
              <div className="mb-5 mx-auto">
                <strong className="text-yellow-400">Employment Type:</strong> {jobData.job_employment_type}
              </div>
              <div className="mb-10 mx-auto">
                <strong className="text-yellow-400">Apply Now:</strong>{" "}
                <a
                  href={jobData.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Apply Now
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
