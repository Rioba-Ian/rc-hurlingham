"use server";

export async function subscribe(email: string) {
 const response = await fetch("https://api.kit.com/v4/subscribers", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
   "X-Kit-Api-Key": process.env.KIT_API_KEY_V4!,
  },
  body: JSON.stringify({
   email_address: email,
   state: "inactive", // Important for double opt-in
  }),
 });

 return response.json();
}
