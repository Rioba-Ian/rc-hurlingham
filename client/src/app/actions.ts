"use server";

const strapiUrl = process.env.STRAPI_CMS_URI;

export async function getBlogPosts() {
 const response = await fetch(`${strapiUrl}/api/articles?populate=*`, {
  headers: {
   Authorization: `Bearer ${process.env.STRAPI_CMS_API_KEY}`,
  },
 });
 const data = await response.json();
 return data;
}
