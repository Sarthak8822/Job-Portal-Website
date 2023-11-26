// pages/jobs/[jobId].tsx
"use client"
import React from 'react';
import Navbar from '../navbar/page';
import Image from 'next/image';

const JobDetail = ({ job }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {job.employer_logo && (
            <div className="relative h-40">
              <img
                src={job.employer_logo}
                alt="Employer Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-t"
              />
            </div>
          )}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{job.job_title}</h1>
              <span className="text-gray-500">{job.job_employment_type}</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-bold mb-2">Company Information</h2>
                <p>
                  <span className="font-bold">Name:</span> {job.employer_name}
                </p>
                <p>
                  <span className="font-bold">Type:</span> {job.employer_company_type}
                </p>
                <p>
                  <span className="font-bold">Website:</span> {job.employer_website}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">Job Details</h2>
                <p>
                  <span className="font-bold">Education:</span> {job.job_required_education}
                </p>
                <p>
                  <span className="font-bold">Apply Link:</span>{' '}
                  <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Apply Now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
