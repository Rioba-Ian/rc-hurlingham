import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
 const { email } = await request.json();

 if (!email) {
  return NextResponse.json({ error: "Email is required" }, { status: 400 });
 }

 //  WILL FINISH THIS LATER

 return NextResponse.json({ message: "Unsubscribed" }, { status: 200 });
}
