// api/jobs/add.ts
import { NextRequest, NextResponse } from "next/server"
import {connect} from "@/dbConfig/dbConfig"
import Job from '@/models/jobModel';

// Connect to the MongoDB database
connect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      // Assuming req.body contains the job details
      const reqBody = await req.json();
      const { jobTitle, company, description, jobApplyLink, employerLogo } = reqBody;
      
      const newJob = new Job({
        jobTitle,
        company,
        description,
        jobApplyLink,
        employerLogo,
      });

      const savedJob = await newJob.save()

      return NextResponse.json({
          message: "Job created successfully",
          success: true,
          savedJob,
      })
    } catch (error: any) {
      console.error('Error adding job:', error);
      return NextResponse.json({error: error.message})
        {status: 500}
    }
}
