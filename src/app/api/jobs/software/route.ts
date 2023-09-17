
import { NextRequest, NextResponse } from "next/server"

const url = 'https://jsearch.p.rapidapi.com/search?query=Software%20developer&page=1&num_pages=10';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9f6a352eb2msh1963d7849667ef9p1c9782jsn03524e908dee',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};
const url1 = 'https://jooble.org/api/';
const options1 = {
  method: 'GET',
  headers: {
    'API-Key': '"9f259856-a563-4d25-9fe5-38f3bead7c0d"',
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
