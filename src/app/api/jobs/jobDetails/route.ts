// Import necessary modules
import { NextRequest, NextResponse } from "next/server";

// Define API request configuration
const url = 'https://jsearch.p.rapidapi.com/job-details';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9f6a352eb2msh1963d7849667ef9p1c9782jsn03524e908dee',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

// Define the GET route
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // Convert NextURL to string URL

    const { searchParams } = new URL(request.url)

    console.log("searchParams", searchParams)
    const query = searchParams.get('job_id')

    console.log("query:  ", query)

    // Extract the search query from the URL

    // Construct the API request URL with the search query
    const apiRequestUrl = `${url}?job_id=${encodeURIComponent(`${query}`)}&extended_publisher_details=false`;


    // Fetch data from the external API
    const res = await fetch(apiRequestUrl, options);
    console.log("Res Response: ", res)
    const result = await res.json();
    console.log("Res Result: ", result)

    // Return the result to the client
    return NextResponse.json({
      result,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: error,
    });
  }
}
