import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import TursoDB from "@/turso.db";
import { sendEmail } from "@/lib/send-mail";

export async function POST(request: NextRequest) {
 const { email } = await request.json();

 if (!email) {
  return NextResponse.json({ error: "Email is required" }, { status: 400 });
 }

 const token = crypto.randomBytes(32).toString("hex");
 const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

 const db = TursoDB();

 try {
  await db.execute(
   `
        INSERT OR REPLACE INTO pending_subscriptions 
        (email, verification_token, expires_at) 
        VALUES (?, ?, ?)
      `,
   [email, token, expiresAt]
  );

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/verify?token=${token}`;

  await sendEmail(email, verificationUrl);

  return NextResponse.json(
   { message: "Verification email sent, please check your inbox." },
   { status: 200 }
  );
 } catch (err) {
  console.error("Error subscribing to newsletter:", err);
  return NextResponse.json(
   { error: "Failed to subscribe to newsletter" },
   { status: 500 }
  );
 } finally {
  db.close();
 }
}
