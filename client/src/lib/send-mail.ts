// lib/email.js
import { Resend } from "resend";
import { VerifySubscriptionEmail } from "@/emails/VerifySubscription";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email: string, token: string) {
 const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/verify?token=${token}`;

 await resend.emails.send({
  from: "newsletter@yourdomain.com",
  to: email,
  subject: "Confirm your newsletter subscription",
  react: VerifySubscriptionEmail({
   email,
   verificationUrl,
  }),
 });
}
