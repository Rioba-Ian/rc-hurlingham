import { Contact2 } from "@/components/molecules/Contact";

const contactDescription =
 "Get in touch with the Rotaract Club of Hurlingham. We'd love to hear from you about questions, feedback, or collaboration opportunities.";

export const metadata = {
 title: "Contact Us",
 description: contactDescription,
 openGraph: { title: "Contact Us", description: contactDescription },
};

export default function Contact() {
 return (
  <main>
   <Contact2
    title="Contact Us"
    description="We're here to help! Get in touch with the Rotaract Club of Hurlingham for any inquiries, feedback, or collaboration opportunities."
    email="hello@rotaracthurlingham.co.ke"
   />
  </main>
 );
}
