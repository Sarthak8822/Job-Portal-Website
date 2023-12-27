import { NextRequest, NextResponse } from "next/server"

const url = `${process.env.API_URL}?query=Software%20developer&page=1&num_pages=10`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST || ''
  }
};
const url1 = 'https://jooble.org/api/';
const options1 = {
  method: 'GET',
  headers: {
    'API-Key': '9f259856-a563-4d25-9fe5-38f3bead7c0d',
  }
};


export async function GET(request: NextRequest, response: NextResponse){
  try {
    const res = await fetch(url, options);
    const res1 = await fetch(url1, options);
    const result = await res.json();
    return NextResponse.json({
      result
    });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({
      message : error
    })
  }
}
