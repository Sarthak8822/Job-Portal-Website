// Import necessary modules
import { NextRequest, NextResponse } from "next/server";

// Define API request configuration
const url = process.env.API_URL;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || ''
  }
};

// Define the GET route
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // Convert NextURL to string URL

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('search')

    // Extract the search query from the URL

    // Construct the API request URL with the search query
    const apiRequestUrl = `${url}?query=${encodeURIComponent(`${query}`)}&page=1&num_pages=10`;
    

    // Fetch data from the external API
    const res = await fetch(apiRequestUrl, options);
    const result = await res.json();

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
