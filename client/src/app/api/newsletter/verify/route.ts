import TursoDB from "@/turso.db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url);
 const token = searchParams.get("token");

 if (!token) {
  return NextResponse.redirect(
   new URL("/subscribe?error=missing-token", request.url)
  );
 }

 const db = TursoDB();

 try {
  const pendingSubcription = await db.execute(
   `SELECT * FROM pending_subscriptions WHERE verification_token = ?`,
   [token]
  );

  if (pendingSubcription.rows.length === 0) {
   return NextResponse.redirect(
    new URL("/subscribe?error=invalid-token", request.url)
   );
  }

  const { email, expires_at } = pendingSubcription.rows[0];

  if (!email || !expires_at) {
   return NextResponse.redirect(
    new URL("/subscribe?error=invalid-data", request.url)
   );
  }

  if (new Date(String(expires_at)) < new Date()) {
   return NextResponse.redirect(
    new URL("/subscribe?error=expired-token", request.url)
   );
  }

  await db.execute(`BEGIN TRANSACTION`);

  await db.execute(
   `
   INSERT INTO newsletter_subscribers (email) VALUES (?)
   `,
   [email]
  );

  await db.execute(`DELETE FROM pending_subscriptions WHERE email = ?`, [
   email,
  ]);

  await db.execute(`COMMIT`);

  // Send subscriber to Kit API
  try {
   const kitResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
     "X-Kit-Api-Key": process.env.KIT_API_KEY_V4!,
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     email_address: email,
    }),
   });

   if (!kitResponse.ok) {
    console.error(
     "Failed to send subscriber to Kit:",
     await kitResponse.text()
    );
   } else {
    console.log("Successfully sent subscriber to Kit");
   }
  } catch (kitError) {
   console.error("Error sending subscriber to Kit:", kitError);
  }

  // Redirect to success page
  return NextResponse.redirect(new URL("/subscribe/success", request.url));
 } catch (err) {
  await db.execute(`ROLLBACK`);
  console.error("Error verifying newsletter subscription:", err);
  return NextResponse.redirect(
   new URL("/subscribe?error=verification-failed", request.url)
  );
 } finally {
  db.close();
 }
}
