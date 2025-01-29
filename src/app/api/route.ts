import { NextRequest, NextResponse } from "next/server";

//req is short for request
export async function GET(req: NextRequest) {
  const response = NextResponse.json(
    { time: new Date().toLocaleTimeString() },
    { status: 200 }
  );
  response.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate");
  return response;
}

export async function POST(req: NextRequest) {
  const response = NextResponse.json(
    { time: new Date().toLocaleTimeString() },
    { status: 200 }
  );
  response.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate");
  return response;
}
