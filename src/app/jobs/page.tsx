import React, { useEffect } from "react";
import Navbar from '../navbar/page';
import axios from "axios";
import Image from "next/image";

const JobDetails = ({ job: job_id }) => {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-2xl font-bold mb-5">{job.job_title}</h1>
      <div className="m-4 w-64 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          {job.employer_logo && <Image src={job.employer_logo} alt="Employer Logo" />}
          <div className="font-bold text-xl mb-2">{job.employer_name}</div>
          <p className="text-base text-white">{job.job_description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
