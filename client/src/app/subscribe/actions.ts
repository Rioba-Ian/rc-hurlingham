"use server";

export async function subscribe(email: string, firstName: string) {
  const response = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": process.env.KIT_API_KEY_V4!,
    },
    body: JSON.stringify({
      email_address: email,
      first_name: firstName,
      state: "active", // Important for double opt-in
    }),
  });
  await fetch(`https://api.kit.com/v4/forms/8482588/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": process.env.KIT_API_KEY_V4!,
    },
    body: JSON.stringify({
      email_address: email,
    }),
  });

  const data = await response.json();

  console.log(data);

  return data;
}
