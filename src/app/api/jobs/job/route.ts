import { NextRequest, NextResponse } from "next/server"

export default async function handler(req: NextRequest, res:NextResponse) {
  const { job_id } = req.query;

  if (!job_id) {
    return NextResponse.json({
      error: "Job Not Found",
      status: 400,
  })
  }

  const apiUrl = `https://jsearch.p.rapidapi.com/job-details?job_id=${job_id}&extended_publisher_details=false`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9f6a352eb2msh1963d7849667ef9p1c9782jsn03524e908dee',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    return NextResponse.json({
      result
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message : error
    })
  }
}
