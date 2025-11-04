import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
 firstName: string;
 lastName: string;
 email: string;
 subject: string;
 message: string;
}

export async function POST(request: NextRequest) {
 try {
  const body: ContactFormData = await request.json();

  // Validate required fields
  if (
   !body.firstName ||
   !body.lastName ||
   !body.email ||
   !body.subject ||
   !body.message
  ) {
   return NextResponse.json(
    { error: "Missing required fields" },
    { status: 400 }
   );
  }

  // TODO: Implement email sending logic here
  // Options:
  // 1. Use Resend, SendGrid, Mailgun, or similar service
  // 2. Use nodemailer with your email provider
  // 3. Store in database and handle manually
  // 4. Send to Strapi CMS API

  // For now, just log the contact form data
  console.log("Contact form submission:", {
   timestamp: new Date().toISOString(),
   ...body,
  });

  // Return success response
  return NextResponse.json(
   { message: "Contact form submitted successfully" },
   { status: 200 }
  );
 } catch (error) {
  console.error("Contact form error:", error);
  return NextResponse.json(
   { error: "Failed to process contact form" },
   { status: 500 }
  );
 }
}
